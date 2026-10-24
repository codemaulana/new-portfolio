import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const messages = [
  {
    name: "Zidane Novanda Putra",
    email: "zidane.putra@gmail.com",
    avatarUrl: null,
    message: "test",
    isOwner: false,
    daysAgo: 210, // ~7 months ago
  },
  {
    name: "Zidane Novanda Putra",
    email: "zidane.putra@gmail.com",
    avatarUrl: null,
    message: "mantep",
    isOwner: false,
    daysAgo: 210,
  },
  {
    name: "Putra",
    email: "putra.dev@gmail.com",
    avatarUrl: null,
    message: "halo",
    isOwner: false,
    daysAgo: 180, // ~6 months ago
  },
  {
    name: "Putra",
    email: "putra.dev@gmail.com",
    avatarUrl: null,
    message: "@Bagus Pratama keren",
    isOwner: false,
    daysAgo: 180,
  },
  {
    name: "Muhamad Arsaludin",
    email: "arsaludin99@gmail.com",
    avatarUrl: null,
    message: "test mantap mas",
    isOwner: false,
    daysAgo: 175,
  },
  {
    name: "Muhamad Arsaludin",
    email: "arsaludin99@gmail.com",
    avatarUrl: null,
    message: "keren",
    isOwner: false,
    daysAgo: 175,
  },
  {
    name: "Ahmad Beni Rusli",
    email: "ahmadbeni.rusli@gmail.com",
    avatarUrl: null,
    message: "mas maulana mau tanya dong, tech stack buat backendnya mending go apa laravel ya kalau mau bikin platform e-commerce skripsi?",
    isOwner: false,
    daysAgo: 150, // ~5 months ago
  },
  {
    name: "Muhammad Nur Maulana",
    email: "codemaulana@gmail.com",
    avatarUrl: "/profile-avatar.png",
    message: "@Ahmad Beni Rusli Halo mas Beni! Kalau buat skripsi yang kejar deadline dan butuh fitur out-of-the-box (auth, ORM, queues), Laravel juara banget mas. Tapi kalau emang pengen eksplor concurrency dan microservices, Go bakal ngasih nilai plus di mata penguji hehe.",
    isOwner: true,
    daysAgo: 148,
  },
  {
    name: "Fajar Kurniawan",
    email: "fajar.kurnia@gmail.com",
    avatarUrl: null,
    message: "desain portonya clean banget bang, suka sama animasi scroll dan layout cardnya 👍",
    isOwner: false,
    daysAgo: 90, // ~3 months ago
  },
  {
    name: "Dimas Prayoga",
    email: "dimas.prayoga@gmail.com",
    avatarUrl: null,
    message: "artikel golang worker pool nya ngebantu banget mas, langsung dipake buat optimasi batch background job di kantor wkwk",
    isOwner: false,
    daysAgo: 60, // ~2 months ago
  },
  {
    name: "Rian Pratama",
    email: "rian.pratama@gmail.com",
    avatarUrl: null,
    message: "gokil mas maulana, fluid banget dibuka lewat hp. izin jadikan referensi UI ya mas!",
    isOwner: false,
    daysAgo: 35, // ~1 month ago
  },
  {
    name: "Bagus Pratama",
    email: "bagus.pratama88@gmail.com",
    avatarUrl: null,
    message: "@Putra makasih bro! Semangat terus buat mas Maulana, ditunggu sharing project berikutnya!",
    isOwner: false,
    daysAgo: 25,
  },
  {
    name: "Siti Nurhaliza",
    email: "sitinurhaliza.tech@gmail.com",
    avatarUrl: null,
    message: "rapih banget kodingannya mas, font playfair dipadu sama sans nya pas bgt keliatan artistik tapi tetep tech",
    isOwner: false,
    daysAgo: 10,
  },
  {
    name: "Rendi",
    email: "milajenner21@gmail.com",
    avatarUrl: null,
    message: "keren parah mas Maulana! Web SDN Ciracas 14 nya juga udah rapih bgt sekarang.",
    isOwner: false,
    daysAgo: 2,
  },
];

async function seed() {
  console.log("Seeding realistic Indonesian chat messages...");

  // Clear existing dummy messages if any
  await pool.query(`DELETE FROM "ChatMessage"`);

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    const id = `chat_${Date.now()}_${i}`;
    const createdAt = new Date(Date.now() - m.daysAgo * 24 * 60 * 60 * 1000 + i * 3600000);

    await pool.query(
      `INSERT INTO "ChatMessage" ("id", "name", "email", "avatarUrl", "message", "isOwner", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, m.name, m.email, m.avatarUrl, m.message, m.isOwner, createdAt]
    );
  }

  const countRes = await pool.query(`SELECT count(*) FROM "ChatMessage"`);
  console.log(`Seeded ${countRes.rows[0].count} chat messages successfully.`);
  await pool.end();
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
