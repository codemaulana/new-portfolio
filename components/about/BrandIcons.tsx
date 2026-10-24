import React from "react";

// 1. Next.js (Official)
export function NextjsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="currentColor" />
      <path
        d="M149.508 157.438L69.1415 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
        fill="white"
      />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </svg>
  );
}

// 2. React (Official)
export function ReactIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// 3. TypeScript (Official)
export function TypeScriptIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128">
      <rect width="128" height="128" rx="16" fill="#3178c6" />
      <path
        d="M74.8 77.2c2.4 3.9 6.2 6.7 11.7 6.7 5.1 0 8.4-2.5 8.4-6.1 0-4.2-3.4-5.8-9.4-8.4-8.5-3.6-13.8-7.7-13.8-15.6 0-8.2 6.4-14.7 16.5-14.7 7.4 0 12.8 2.6 16.5 8.3l-6.8 4.4c-2.3-3.7-5-5-9.7-5-4.2 0-7 2.4-7 5.4 0 3.7 3 5.1 8.8 7.5 9.3 4 14.5 8.1 14.5 16.5 0 9.5-7.4 15.6-18.4 15.6-10.3 0-16.7-5.1-19.8-11.8l8.5-4.4zM24 40.5h33.6v9.4H42.7v48.6H31V49.9H24v-9.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

// 4. JavaScript (Official)
export function JavaScriptIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128">
      <rect width="128" height="128" rx="16" fill="#f7df1e" />
      <path
        d="M73.5 102.5c2.9 4.8 7.7 8.1 14.5 8.1 6.3 0 10.4-3.1 10.4-7.5 0-5.2-4.2-7.2-11.6-10.4-10.6-4.5-17.1-9.6-17.1-19.4 0-10.2 8-18.2 20.5-18.2 9.2 0 15.9 3.2 20.5 10.3l-8.5 5.5c-2.9-4.6-6.2-6.2-12-6.2-5.2 0-8.7 3-8.7 6.7 0 4.6 3.7 6.3 10.9 9.3 11.6 5 18 10.1 18 20.5 0 11.8-9.2 19.4-22.9 19.4-12.8 0-20.7-6.3-24.6-14.6l10.6-5.4zM22.5 102.2l9.1-5.6c2.4 4 4.5 7.4 9.1 7.4 4.6 0 7.5-1.9 7.5-9.1V56.6h11.9v38.5c0 13.9-8.1 20.3-19.5 20.3-10.5 0-16.6-5.6-18.1-13.2z"
        fill="#000000"
      />
    </svg>
  );
}

// 5. TailwindCSS (Official)
export function TailwindIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 54 33" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        fill="#38bdf8"
      />
    </svg>
  );
}

// 6. HTML5 (Official)
export function HTMLIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path fill="#e34f26" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#ef652a" d="M256 472l149-41 35-391H256z" />
      <path fill="#ebebeb" d="M256 208h-74l-5-57h79V95H119l15 170h122zM256 356l-67-18-4-50h-56l7 89 120 33z" />
      <path fill="#ffffff" d="M256 208v-56h74l-7-73H256V95h137l-18 205H256v56l67-18 7-76h56l-14 153z" />
    </svg>
  );
}

// 7. CSS3 (Official)
export function CSSIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path fill="#1572b6" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#33a9dc" d="M256 472l149-41 35-391H256z" />
      <path fill="#ebebeb" d="M256 208h-74l-5-57h79V95H119l15 170h122zM256 356l-67-18-4-50h-56l7 89 120 33z" />
      <path fill="#ffffff" d="M256 208v-56h74l-7-73H256V95h137l-18 205H256v56l67-18 7-76h56l-14 153z" />
    </svg>
  );
}

// 8. Vite & Vitest (Official)
export function ViteIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 410 404">
      <path
        d="M399.6 59.8L215.7 396.4c-3.6 6.5-12.9 6.6-16.6.2L4.6 60.1C.4 52.8 6.3 44 14.6 44.8l184.4 18.5a10 10 0 002 0l183.9-18.5c8.3-.8 14.2 8 10.1 15z"
        fill="url(#vite-a)"
      />
      <path
        d="M285.4 7L138.8 80.6a4 4 0 00-1.7 5l48 111.4a4 4 0 006.7.7L224 160l42.3 84a4 4 0 007.4-.5l49.8-193.3c.7-2.6-1.5-5.1-4.2-4.8L285.4 7z"
        fill="url(#vite-b)"
      />
      <defs>
        <linearGradient id="vite-a" x1="20" y1="40" x2="390" y2="390" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="vite-b" x1="140" y1="10" x2="280" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEA83" />
          <stop offset=".08" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 9. Laravel 11 (Official Latest 3D Geometric Mark)
export function LaravelIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 66 70" fill="none">
      <path
        d="M34.5 0.5L64.5 17.5V52.5L34.5 69.5L4.5 52.5V17.5L34.5 0.5Z"
        fill="#FF2D20"
      />
      <path
        d="M34.5 12L54 23V46.5L34.5 57.5L15 46.5V23L34.5 12Z"
        fill="#E02619"
      />
      <path
        d="M34.5 24L44 29.5V41L34.5 46.5L25 41V29.5L34.5 24Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 10. Node.js (Official Latest Hexagon Mark)
export function NodeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 289" fill="none">
      <path
        d="M128 0L256 74v141l-128 74L0 215V74L128 0z"
        fill="#5FA04E"
      />
      <path
        d="M128 32l104 60v105l-104 60-104-60V92l104-60z"
        fill="#333333"
      />
      <path
        d="M128 70l65 37v75l-65 37-65-37v-75l65-37z"
        fill="#5FA04E"
      />
    </svg>
  );
}

// 11. Express.js (Official Minimalist Wordmark)
export function ExpressIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="currentColor" />
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="var(--background)"
        letterSpacing="-1"
      >
        ex
      </text>
    </svg>
  );
}

// 12. PostgreSQL (Official "Slonik" Elephant Head)
export function PostgresIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 440 450" fill="none">
      <path
        d="M219.7 0C98.4 0 0 98.4 0 219.7c0 102.7 70.8 188.8 166.5 212.1v-60.6c-48.4-13.6-76.3-51.5-76.3-95.2 0-59.8 48.7-108.5 108.5-108.5 28.5 0 55.4 11.1 75.3 31.1 19.9 19.9 31.1 46.8 31.1 75.3 0 43.7-27.9 81.6-76.3 95.2v60.6C324.5 406.4 395.3 320.3 395.3 219.7 395.3 98.4 316.9 0 219.7 0z"
        fill="#336791"
      />
      <circle cx="270" cy="180" r="14" fill="#ffffff" />
      <path
        d="M270 210c-35 0-60 25-60 60s25 60 60 60 60-25 60-60-25-60-60-60z"
        fill="#ffffff"
        opacity="0.9"
      />
    </svg>
  );
}

// 13. Prisma ORM (Official Latest Isometric Triangular Prism)
export function PrismaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      <path
        d="M366.4 466.8L124.6 386.9 229.5 45.2c5.9-19 32.7-19 38.6 0l169.5 352.7c7.8 16.2-4.1 35.1-22.1 35.1l-49.1 33.8z"
        fill="#2D3748"
      />
      <path
        d="M229.5 45.2L124.6 386.9l241.8 79.9-136.9-421.6z"
        fill="#16A394"
      />
      <path
        d="M229.5 45.2l136.9 421.6 49.1-33.8L245.8 45.2h-16.3z"
        fill="#5A67D8"
      />
    </svg>
  );
}

// 14. MySQL (Official Sakila Dolphin Logo)
export function MySQLIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <circle cx="64" cy="64" r="64" fill="#00758F" />
      <path
        d="M87.5 44c-3.5-3-9.5-4-15.5-1.5-6.5 2.5-11 8-13.5 14.5-1.5 4-2.5 8.5-4 12.5-2 5.5-5.5 10-10 13.5-3 2.5-7 4-10.5 4.5 4 .5 8-.5 11.5-2.5 5-3 8.5-7.5 11-12.5 2.5-5 4-10.5 6.5-15.5 2.5-5 6.5-9 11.5-10.5 4.5-1.5 9-.5 13 1.5z"
        fill="#F29111"
      />
      <path
        d="M44 87c6-1 12-4 16.5-8.5 6-6 9.5-14 12-22 2.5-8 5-16 10-22.5 3.5-4.5 8.5-7.5 14-8-4 .5-8 2.5-11 5.5-5 5-8 11.5-10.5 18-3 8-6.5 16-12.5 22.5C57.5 83 51 86 44 87z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 15. Redis (Official Layered Red Cube)
export function RedisIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        fill="#DC382D"
      />
      <path
        d="M2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="#DC382D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

// 16. Firebase (Official Latest 3-Fold Flame)
export function FirebaseIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <path
        d="M23.5 97.5L44.8 17.2c.6-2.2 3.6-2.6 4.8-.7l15.9 25.1-42 55.9z"
        fill="#FFA000"
      />
      <path
        d="M69.8 44.5L81.2 23c.9-1.8 3.5-1.8 4.4 0L104.5 97.5 69.8 44.5z"
        fill="#F57C00"
      />
      <path
        d="M23.5 97.5l40.5 22.8c1.8 1 4 1 5.8 0L104.5 97.5 64 123.5 23.5 97.5z"
        fill="#FFCA28"
      />
    </svg>
  );
}

// 17. Golang (Official Latest Cyan "GO" Wordmark)
export function GolangIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="28" fill="#00ADD8" />
      <path
        d="M62 49c-3.5-5.2-9-8-16.5-8-12.7 0-21.5 9.8-21.5 23s8.8 23 21.5 23c10.5 0 17.5-5.5 19.8-14.5H45.5v-9.5H73v2.5c0 15.5-11.5 29.5-27.5 29.5-18.5 0-31.5-14-31.5-31s13-31 31.5-31c11 0 19 4.8 24.5 12.5L62 49zm46 15c0 17-13 31-31.5 31-18.5 0-31.5-14-31.5-31s13-31 31.5-31c18.5 0 31.5 14 31.5 31zm-10.5 0c0-13.2-8.8-23-21-23s-21 9.8-21 23 8.8 23 21 23 21-9.8 21-23z"
        fill="#ffffff"
      />
    </svg>
  );
}

// 18. Flutter (Official Dual-Wing Mark)
export function FlutterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm0 14.314L8.7 19.929l3.686 3.7 9.3-9.315h-7.372z" fill="#02569b" />
      <path d="M12.386 16.271l2.428-2.443 6.872 6.886-3.686 3.686-5.614-5.629z" fill="#0175c2" />
    </svg>
  );
}

// 19. Docker (Official Whale Mark)
export function DockerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ed">
      <path d="M13 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm12 0h2v2h-2zm-3 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm15.7 1.5c-.4-.3-1.4-.4-2-.2-.2-.7-.7-1.3-1.4-1.7l-.5-.3-.3.5c-.3.6-.3 1.4-.1 2.1-.3.2-.8.5-1.4.5H2c-.6 0-1 .4-1 1 0 4.4 3.6 8 8 8 5.7 0 10.5-4 11.8-9.4.5-.1 1.2-.2 1.5-.7l.3-.4-.9-.6z" />
    </svg>
  );
}

// 20. Figma (Official 5-Color Mark)
export function FigmaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
  );
}

// 21. GitHub (Official Octocat Mark)
export function GithubBrandIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// 22. Sass (Official Magenta Mark)
export function SassIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#CF649A">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.8 13.6c-2 .5-3.8.3-4.5-.4-.6-.7-.5-1.7.3-2.4 1.2-1.1 3.5-1.1 5.3-.2l-.6 1.4c-1.3-.6-2.8-.5-3.5.1-.3.2-.3.6-.1.8.3.3 1.2.4 2.6 0l.5.7zm2.4-3.4c-1.5.3-3.2.1-4-.6-.8-.7-.8-1.8.2-2.7 1.4-1.3 4.1-1.3 6.1-.2l-.7 1.5c-1.4-.7-3.1-.7-3.9 0-.3.3-.4.7-.1 1 .4.4 1.5.5 3 .1l-.6.9z" />
    </svg>
  );
}

// 23. Redux (Official Purple Mark)
export function ReduxIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#764ABC">
      <path d="M15.5 3.5c-1.4 0-2.6.7-3.5 1.7-.9-1-2.1-1.7-3.5-1.7C6 3.5 4 5.5 4 8c0 3.3 4.8 7.3 8 10.2 3.2-2.9 8-6.9 8-10.2 0-2.5-2-4.5-4.5-4.5z" />
    </svg>
  );
}

// 24. Clean Architecture & System
export function ArchitectureIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// 26. Bootstrap (Official Purple Mark)
export function BootstrapIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="28" fill="#7952B3" />
      <path
        d="M48 36h21.4c10.4 0 16.8 4.7 16.8 12.8 0 6.1-4.2 10.4-10.4 11.5v.4c7.6.9 12.6 5.8 12.6 13.1 0 9.7-7.6 15.2-19.4 15.2H48V36zm14.4 20.3h6.4c5.1 0 8.3-2.4 8.3-6.5 0-4-3.1-6.2-8.3-6.2h-6.4v12.7zm0 24.9h7.4c5.9 0 9.4-2.6 9.4-7.1 0-4.6-3.7-7.2-9.4-7.2h-7.4v14.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 27. Linux (Official Tux Mascot)
export function LinuxIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 2c-2.4 0-4 1.8-4 4.5v3.2c-.8.8-1.5 2-1.5 3.8 0 1.9.9 3.4 2 4.1-.1.4-.2.8-.2 1.4 0 1.7 1.7 3 3.7 3s3.7-1.3 3.7-3c0-.6-.1-1-.2-1.4 1.1-.7 2-2.2 2-4.1 0-1.8-.7-3-1.5-3.8V6.5c0-2.7-1.6-4.5-4-4.5zm-1.8 4.8c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9zm3.6 0c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9z" />
    </svg>
  );
}

// 28. Agile / Scrum
export function AgileIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );
}

