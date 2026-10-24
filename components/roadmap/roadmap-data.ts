export interface RoadmapItem {
  id: string;
  step: string;
  title: string;
  stage: "beginner" | "frontend" | "backend" | "devops";
  stageLabel: string;
  description: string;
  icon:
    | "html"
    | "css"
    | "bootstrap"
    | "tailwind"
    | "git"
    | "javascript"
    | "typescript"
    | "react"
    | "nextjs"
    | "sql"
    | "nodejs"
    | "security"
    | "laravel"
    | "golang"
    | "docker"
    | "redis"
    | "linux"
    | "cicd";
  language: "ID" | "EN";
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: string;
  instructor: string;
  playlistUrl: string;
  docsUrl: string;
  topics: string[];
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  // STAGE 1: BEGINNER FOUNDATIONS
  {
    id: "html5-fundamentals",
    step: "01",
    title: "HTML5 & Semantic Markup",
    stage: "beginner",
    stageLabel: "1. Foundations (Beginner)",
    description:
      "The bedrock of web development. Learn semantic tags, page structure, modern forms, tables, and core web accessibility principles.",
    icon: "html",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~8 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIVuONHysfOK0Z34qwuU4SiX",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    topics: ["HTML Tags", "Semantic Elements", "Forms & Inputs", "Accessibility"],
  },
  {
    id: "css-essentials",
    step: "02",
    title: "CSS3 Essentials & Box Model",
    stage: "beginner",
    stageLabel: "1. Foundations (Beginner)",
    description:
      "Style HTML elements with precision. Master selectors, specificity, typography, color systems, and the CSS box model.",
    icon: "css",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~10 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIUBrbm6Gdh6k7ZUvPIAZm7p",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    topics: ["Box Model", "Selectors", "Specificity", "Typography"],
  },
  {
    id: "css-layouting-flexbox",
    step: "03",
    title: "CSS Layouts & Modern Flexbox",
    stage: "beginner",
    stageLabel: "1. Foundations (Beginner)",
    description:
      "Build real-world layouts without hacks. Understand display rules, CSS positioning, and one-dimensional alignment with Flexbox.",
    icon: "css",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~8 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIVCmrSWbZPKQCccCkfQKw-e",
    docsUrl: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    topics: ["Flexbox", "Positioning", "Display", "Align & Justify"],
  },
  {
    id: "css-grid-responsive",
    step: "04",
    title: "CSS Grid & Responsive Design",
    stage: "beginner",
    stageLabel: "1. Foundations (Beginner)",
    description:
      "Build two-dimensional layouts that work across mobile phones, tablets, and wide desktop screens using CSS Grid and media queries.",
    icon: "css",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~6 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIUqYp_jXF_HhI_V0n4_3fV_",
    docsUrl: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    topics: ["CSS Grid", "Media Queries", "Mobile-First", "Fluid Layouts"],
  },
  {
    id: "git-github-version-control",
    step: "05",
    title: "Git & GitHub Version Control",
    stage: "beginner",
    stageLabel: "1. Foundations (Beginner)",
    description:
      "The industry standard for tracking code changes and collaborating in software teams. Master commits, branches, merges, and pull requests.",
    icon: "git",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~6 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIVknX6HKukQU77mT75749oN",
    docsUrl: "https://git-scm.com/doc",
    topics: ["Git Init & Commit", "Branching & Merge", "GitHub Remotes", "Pull Requests"],
  },
  {
    id: "tailwind-css",
    step: "06",
    title: "Tailwind CSS Utility-First",
    stage: "beginner",
    stageLabel: "1. Foundations (Beginner)",
    description:
      "Speed up your styling workflow without context-switching between HTML and CSS files. Covers responsive modifiers, dark mode, and custom themes.",
    icon: "tailwind",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~10 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIUHFRMzPJ0wGjx9_NlC5dQB",
    docsUrl: "https://tailwindcss.com/docs",
    topics: ["Utility Classes", "Responsive Modifiers", "Dark Mode", "Config & Plugins"],
  },

  // STAGE 2: MODERN JAVASCRIPT & FRONTEND
  {
    id: "javascript-fundamentals",
    step: "07",
    title: "JavaScript Fundamentals & Logic",
    stage: "frontend",
    stageLabel: "2. Modern Frontend",
    description:
      "The programming language of the web. Learn variables, data types, logic conditions, array methods, loops, and pure functions.",
    icon: "javascript",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~15 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIWXagluzROrA-iBY9eeUt4w",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    topics: ["Variables & Scopes", "Data Types", "Conditionals & Loops", "Functions"],
  },
  {
    id: "javascript-dom",
    step: "08",
    title: "JavaScript DOM & Event Handling",
    stage: "frontend",
    stageLabel: "2. Modern Frontend",
    description:
      "Wire up JavaScript logic with HTML elements. Covers query selectors, class and style toggles, event listeners, and interactive UI components.",
    icon: "javascript",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~8 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIWB33G4QvUHM487m442uK51",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    topics: ["DOM Selection", "DOM Manipulation", "Event Bubbling", "Interactive UI"],
  },
  {
    id: "javascript-es6-async",
    step: "09",
    title: "Modern ES6+ & Asynchronous JavaScript",
    stage: "frontend",
    stageLabel: "2. Modern Frontend",
    description:
      "Modern JavaScript standards. Learn arrow functions, destructuring, modules, promises, async/await, and the Fetch API to talk to REST backends.",
    icon: "javascript",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~12 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIUGpY8wmU41keYKBHN771N-",
    docsUrl: "https://javascript.info/async",
    topics: ["Arrow & Destructure", "Modules", "Promises & Async/Await", "Fetch API"],
  },
  {
    id: "typescript-fundamentals",
    step: "10",
    title: "TypeScript Fundamentals & Type Safety",
    stage: "frontend",
    stageLabel: "2. Modern Frontend",
    description:
      "Catch bugs during development rather than in production. Learn static type annotations, interfaces, generics, and union types.",
    icon: "typescript",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~10 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFXUqi0I_bF3mzbfaGwhzP3_",
    docsUrl: "https://www.typescriptlang.org/docs/",
    topics: ["Static Types", "Interfaces", "Generics", "Type Inference"],
  },
  {
    id: "react-19-architecture",
    step: "11",
    title: "React 19 & Component Architecture",
    stage: "frontend",
    stageLabel: "2. Modern Frontend",
    description:
      "The dominant UI library for web applications. Understand the Virtual DOM, JSX, props, state, custom hooks, and component lifecycle.",
    icon: "react",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~18 Hours",
    instructor: "Dea Afrizal / WPU",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIVL7vV_Q9Gk9P_NlXzWb4zL",
    docsUrl: "https://react.dev/",
    topics: ["Components & Props", "React Hooks", "Custom Hooks", "Client State"],
  },
  {
    id: "nextjs-16-fullstack",
    step: "12",
    title: "Next.js 16 App Router & Fullstack Web",
    stage: "frontend",
    stageLabel: "2. Modern Frontend",
    description:
      "Production-ready React. Master React Server Components, client boundaries, route handlers, server actions, SSR, ISR, and metadata.",
    icon: "nextjs",
    language: "ID",
    level: "Advanced",
    estimatedHours: "~16 Hours",
    instructor: "Programmer Zaman Now / WPU",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFUEq40X9Z2nI-a9wYl7V011",
    docsUrl: "https://nextjs.org/docs",
    topics: ["App Router", "Server Components", "Server Actions", "SSR & ISR"],
  },

  // STAGE 3: BACKEND & DATABASE ARCHITECTURE
  {
    id: "sql-relational-databases",
    step: "13",
    title: "SQL & Relational Databases (PostgreSQL)",
    stage: "backend",
    stageLabel: "3. Backend & API Architecture",
    description:
      "Store and query application data reliably. Learn relational modeling, foreign keys, table joins, indexing, and ACID transactions.",
    icon: "sql",
    language: "ID",
    level: "Beginner",
    estimatedHours: "~14 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFUNZ_tNq9dD-t52wH2f_N41",
    docsUrl: "https://www.postgresql.org/docs/",
    topics: ["Table Relations", "JOIN Queries", "ACID Transactions", "Database Indexing"],
  },
  {
    id: "nodejs-express-apis",
    step: "14",
    title: "Node.js & Express REST APIs",
    stage: "backend",
    stageLabel: "3. Backend & API Architecture",
    description:
      "Build HTTP APIs using the Node.js runtime. Learn Express middleware pipelines, route handling, input validation with Zod, and Prisma ORM.",
    icon: "nodejs",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~16 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFX7T4lU_fB3bXh2C9dYwP_O",
    docsUrl: "https://expressjs.com/",
    topics: ["REST Architecture", "Express Middleware", "Prisma ORM", "Input Validation"],
  },
  {
    id: "backend-auth-security",
    step: "15",
    title: "Backend Auth, JWT & Web Security",
    stage: "backend",
    stageLabel: "3. Backend & API Architecture",
    description:
      "Protect your application against common web vulnerabilities. Covers bcrypt password hashing, JWT tokens, secure HTTP-only cookies, CORS, and rate limiting.",
    icon: "security",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~10 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFW7N5Jc6_i_9J8bKx2E7U0_",
    docsUrl: "https://jwt.io/introduction",
    topics: ["JWT Tokens", "Bcrypt Hashing", "CORS & CSRF", "Rate Limiting"],
  },
  {
    id: "laravel-11-architecture",
    step: "16",
    title: "Laravel 11 Backend & Eloquent ORM",
    stage: "backend",
    stageLabel: "3. Backend & API Architecture",
    description:
      "Build web backends with PHP. Learn database migrations, Eloquent models and relationships, API resources, and background queues.",
    icon: "laravel",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~18 Hours",
    instructor: "Web Programming UNPAS",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIVWf_m5G3fK_jG6K_Z8Z6X9",
    docsUrl: "https://laravel.com/docs/11.x",
    topics: ["Eloquent ORM", "API Resources", "Service Layer", "Queues & Jobs"],
  },
  {
    id: "golang-backend-concurrency",
    step: "17",
    title: "Go (Golang) REST API & Concurrency",
    stage: "backend",
    stageLabel: "3. Backend & API Architecture",
    description:
      "Fast, low-latency backend services. Learn Go structs, pointers, goroutines, channels, the Fiber framework, and clean layered architecture.",
    icon: "golang",
    language: "ID",
    level: "Advanced",
    estimatedHours: "~20 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFV_h4i_4V2_P2g0x7Z_8L_1",
    docsUrl: "https://go.dev/doc/",
    topics: ["Goroutines & Channels", "Fiber Framework", "Clean Architecture", "Low Latency"],
  },

  // STAGE 4: DEVOPS, CLOUD & PRODUCTION
  {
    id: "docker-containerization",
    step: "18",
    title: "Docker Containers & Local Environments",
    stage: "devops",
    stageLabel: "4. DevOps & Cloud",
    description:
      "Package your software to run reliably anywhere. Learn Docker images, container lifecycles, multi-stage Dockerfiles, and Docker Compose.",
    icon: "docker",
    language: "ID",
    level: "Intermediate",
    estimatedHours: "~12 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFUTb_X_Q6N3oF9Fw7pZz8_",
    docsUrl: "https://docs.docker.com/",
    topics: ["Dockerfile", "Docker Compose", "Multi-Stage Builds", "Networking"],
  },
  {
    id: "redis-caching-broker",
    step: "19",
    title: "Redis In-Memory Caching & Message Broker",
    stage: "devops",
    stageLabel: "4. DevOps & Cloud",
    description:
      "Speed up response times and reduce database load. Master key-value caching, expiration TTLs, pub/sub messaging, and rate limit counters.",
    icon: "redis",
    language: "ID",
    level: "Advanced",
    estimatedHours: "~8 Hours",
    instructor: "Programmer Zaman Now",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFW7N5Jc6_i_9J8bKx2E7U0_",
    docsUrl: "https://redis.io/docs/latest/",
    topics: ["Key-Value Caching", "TTL & Expiration", "Pub/Sub", "Rate Limiting"],
  },
  {
    id: "linux-vps-deployment",
    step: "20",
    title: "Linux Servers & Nginx VPS Deployment",
    stage: "devops",
    stageLabel: "4. DevOps & Cloud",
    description:
      "Deploy your web apps onto bare Linux servers. Learn SSH hardening, UFW firewall, Nginx reverse proxy, free SSL certs, and PM2 process management.",
    icon: "linux",
    language: "ID",
    level: "Advanced",
    estimatedHours: "~10 Hours",
    instructor: "Dea Afrizal",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL-CtdCApeRFW7N5Jc6_i_9J8bKx2E7U0_",
    docsUrl: "https://ubuntu.com/server/docs",
    topics: ["Ubuntu Server", "Nginx Reverse Proxy", "SSL / Let's Encrypt", "PM2 & Systemd"],
  },
  {
    id: "cicd-cloud-pipeline",
    step: "21",
    title: "CI/CD Automation & Production Cloud",
    stage: "devops",
    stageLabel: "4. DevOps & Cloud",
    description:
      "Automate code testing and deployments on git push. Learn GitHub Actions workflows, test automation, cloud hosting on Vercel, and health monitoring.",
    icon: "cicd",
    language: "EN",
    level: "Advanced",
    estimatedHours: "~12 Hours",
    instructor: "freeCodeCamp / Official",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLFIM0718LjIVL7vV_Q9Gk9P_NlXzWb4zL",
    docsUrl: "https://docs.github.com/en/actions",
    topics: ["GitHub Actions", "Automated Testing", "Cloud Deployment", "Health Checks"],
  },
];
