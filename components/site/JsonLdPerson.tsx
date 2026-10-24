export function JsonLdPerson() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://codemaulana.web.id/#person",
        "name": "Muhammad Nur Maulana",
        "jobTitle": "Full Stack Developer",
        "description":
          "Full stack software engineer specializing in Next.js, Laravel, Go, and Flutter. Experienced in building production web apps and mobile solutions.",
        "url": "https://codemaulana.web.id",
        "sameAs": [
          "https://github.com/codemaulana",
          "https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290",
          "https://instagram.com/ctizz4",
          "https://www.tiktok.com/@elitescr",
        ],
        "knowsAbout": [
          "Next.js",
          "React",
          "Laravel",
          "Flutter",
          "Dart",
          "TypeScript",
          "PostgreSQL",
          "Tailwind CSS",
          "Full Stack Software Engineering",
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jakarta",
          "addressCountry": "ID",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://codemaulana.web.id/#website",
        "url": "https://codemaulana.web.id",
        "name": "Muhammad Nur Maulana — Digital Atelier",
        "description": "Personal engineering portfolio and technical writing by Muhammad Nur Maulana.",
        "publisher": {
          "@id": "https://codemaulana.web.id/#person",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
