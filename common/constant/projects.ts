import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

export const projects = [
  {
    slug: "portfolio-website",
    title: "Maulana",
    tags: [SiNextdotjs, SiTailwindcss, SiTypescript],
    summary:
      "A personal portfolio website built with Next.js and Tailwind CSS. It features a responsive layout, dynamic content, and a contact form for easy communication with the developer.",
    link: {
      srccode: "https://github.com/mhmdnrmaulana/latest-portfolio",
      website: "https://maulana-v1.vercel.app/",
    },
    image: "/images/projects/project1.png",
    content: [
      {
        type: "image",
        data: [
          {
            src: "/images/projects/project1.png",
            alt: "Maulana",
          },
        ],
      },
      {
        type: "heading",
        data: [
          {
            text: "Introduction",
          },
        ],
      },
      {
        type: "paragraph",
        data: [
          {
            text: "Welcome to Maulana, a personal portfolio website built with Next.js and Tailwind CSS. It features a responsive layout, dynamic content, and a contact form for easy communication with the developer.",
          },
        ],
      },
      {
        type: "heading",
        data: [
          {
            text: "How to Start This Project",
          },
        ],
      },
      {
        type: "subheading",
        data: [
          {
            text: "1. Clone Using Git",
          },
        ],
      },
      {
        type: "markdown",
        data: [
          {
            text: "git clone https://github.com/mhmdnrmaulana/latest-portfolio",
          },
        ],
      },
      {
        type: "subheading",
        data: [
          {
            text: "2. Install dependencies",
          },
        ],
      },
      {
        type: "markdown",
        data: [
          {
            text: "npm install\n# or\nyarn",
          },
        ],
      },
      {
        type: "subheading",
        data: [
          {
            text: "3. Run development server",
          },
        ],
      },
      {
        type: "markdown",
        data: [
          {
            text: "npm run dev\n# or\nyarn dev\n# or\npnpm dev\n# or\nbun dev",
          },
        ],
      },
      {
        type: "paragraph",
        data: [
          {
            text: "Open http://localhost:3000 with your browser to see the result.",
          },
        ],
      },
    ],
  },
  {
    slug: "sdn-ciracas-14",
    title: "SDN Ciracas 14",
    tags: [SiNextdotjs, SiTailwindcss, SiTypescript],
    summary:
      "A website for SDN Ciracas 14, a school in Jakarta, Indonesia. It features a responsive layout, dynamic content, and a contact form for easy communication with the school.",
    link: {
      website: "https://sdnciracas14.sch.id/",
    },
    image: "/images/projects/project2.png",
    content: [
      {
        type: "image",
        data: [
          {
            src: "/images/projects/project2.png",
            alt: "Maulana",
          },
        ],
      },
      {
        type: "paragraph",
        data: [
          {
            text: "I built the new website for SDN Ciracaras 14 from the ground up. I handled everything myself, from the user-facing design (the frontend) to the system that manages data behind the scenes (the backend). The goal was simple: to create a modern, fast, and easy-to-use platform for everyone, including parents, students, and the school staff.",
          },
        ],
      },
      {
        type: "paragraph",
        data: [
          {
            text: "For this project, I used a modern technology called Next.js. Its advantage is that it makes the website load very quickly and easy to find on Google. I also created a system that allows the school to easily add news or announcements themselves. As a result, the website not only looks great on phones and computers, but its information is also always up-to-date and easy to manage.",
          },
        ],
      },
    ],
  },
];
