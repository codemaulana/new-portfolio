import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache 1 hour

interface GitHubDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubWeek {
  days: GitHubDay[];
}

interface MonthMarker {
  name: string;
  weekIndex: number;
}

interface GitHubDashboardData {
  username: string;
  total: number;
  thisWeek: number;
  bestDay: number;
  average: number;
  weeks: GitHubWeek[];
  months: MonthMarker[];
  isLive: boolean;
}

// Generate deterministic calendar matching Muhammad Nur Maulana's 143 contributions
function generateMockGitHubCalendar(username: string): GitHubDashboardData {
  const weeks: GitHubWeek[] = [];
  const months: MonthMarker[] = [];
  let total = 0;
  let bestDay = 0;
  let thisWeekCount = 0;

  const today = new Date();
  // Find current day of week (0 = Sunday, ..., 6 = Saturday)
  const currentDayOfWeek = today.getDay();
  // 52 weeks * 7 days + current day
  const totalDays = 52 * 7 + currentDayOfWeek;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays);

  let currentDate = new Date(startDate);
  let lastMonth = -1;

  // Active weeks configuration to match the user's real GitHub screenshot
  // (Jan, Mar cluster, Apr, Jun, Jul, Aug, Sep, Oct)
  const targetTotal = 143;
  let accumulated = 0;

  for (let w = 0; w < 53; w++) {
    const days: GitHubDay[] = [];

    for (let d = 0; d < 7; d++) {
      const monthNum = currentDate.getMonth();

      // Check for month transition on first day of week
      if (d === 0 && monthNum !== lastMonth) {
        months.push({
          name: currentDate.toLocaleString("en-US", { month: "short" }),
          weekIndex: w,
        });
        lastMonth = monthNum;
      }

      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      // Realistic distribution matching the 143 contributions screenshot:
      // Spanning March cluster, September, October, and occasional commits
      const isWeekend = d === 0 || d === 6;
      const seed = Math.sin(w * 17 + d * 5 + 3) * 10000;
      const rand = seed - Math.floor(seed);

      // October recent commits
      if (w >= 48) {
        if (!isWeekend && rand > 0.3) {
          count = Math.floor(rand * 4) + 1;
          level = count >= 3 ? 3 : 2;
        }
      }
      // March cluster
      else if (w >= 20 && w <= 24) {
        if (!isWeekend && rand > 0.4) {
          count = Math.floor(rand * 5) + 1;
          level = count >= 4 ? 4 : count >= 2 ? 3 : 2;
        }
      }
      // Occasional commits in other months
      else if (rand > 0.78) {
        count = Math.floor(rand * 3) + 1;
        level = count >= 3 ? 2 : 1;
      }

      accumulated += count;
      if (count > bestDay) bestDay = count;
      if (w >= 51) thisWeekCount += count;

      days.push({
        date: currentDate.toISOString().split("T")[0]!,
        count,
        level,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push({ days });
  }

  // Adjust total to exactly 143 if mock
  total = targetTotal;
  bestDay = Math.max(bestDay, 7);
  thisWeekCount = Math.max(thisWeekCount, 4);
  const average = Number((total / 365).toFixed(1));

  return {
    username,
    total,
    thisWeek: thisWeekCount,
    bestDay,
    average,
    weeks,
    months,
    isLive: false,
  };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "codemaulana";

  if (!token) {
    return NextResponse.json(generateMockGitHubCalendar(username));
  }

  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(generateMockGitHubCalendar(username));
    }

    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(generateMockGitHubCalendar(username));
    }

    let bestDay = 0;
    let thisWeekCount = 0;
    const months: MonthMarker[] = [];
    let lastMonth = -1;

    const weeks: GitHubWeek[] = calendar.weeks.map(
      (w: { contributionDays: Array<{ date: string; contributionCount: number }> }, wIdx: number) => {
        const isLastWeek = wIdx === calendar.weeks.length - 1;

        if (w.contributionDays.length > 0) {
          const firstDate = new Date(w.contributionDays[0]!.date);
          const monthNum = firstDate.getMonth();
          if (monthNum !== lastMonth) {
            months.push({
              name: firstDate.toLocaleString("en-US", { month: "short" }),
              weekIndex: wIdx,
            });
            lastMonth = monthNum;
          }
        }

        const days: GitHubDay[] = w.contributionDays.map((d) => {
          const count = d.contributionCount;
          if (count > bestDay) bestDay = count;
          if (isLastWeek) thisWeekCount += count;

          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count >= 8) level = 4;
          else if (count >= 5) level = 3;
          else if (count >= 3) level = 2;
          else if (count >= 1) level = 1;

          return { date: d.date, count, level };
        });

        return { days };
      }
    );

    const total = calendar.totalContributions || 0;
    const average = Number((total / 365).toFixed(1));

    return NextResponse.json({
      username,
      total,
      thisWeek: thisWeekCount,
      bestDay,
      average,
      weeks,
      months,
      isLive: true,
    });
  } catch (err) {
    console.error("Failed to fetch live GitHub contributions:", err);
    return NextResponse.json(generateMockGitHubCalendar(username));
  }
}
