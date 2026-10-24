import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Auto-detect local vs production environment:
// In local development, clear AUTH_URL so NextAuth automatically routes callbacks to localhost:3000.
// In production on Vercel, trustHost ensures callbacks route automatically to codemaulana.web.id.
if (process.env.NODE_ENV !== "production") {
  delete process.env.AUTH_URL;
  delete process.env.NEXTAUTH_URL;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const normalizedEmail = email.toLowerCase().trim();

        // Protect login with rate limiting
        const rateStatus = checkRateLimit({
          key: `login:${normalizedEmail}`,
          limit: 10,
          windowMs: 15 * 60 * 1000,
        });

        if (!rateStatus.allowed) {
          throw new Error("Too many failed login attempts. Please try again in 15 minutes.");
        }

        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        // Clear rate limit on successful authentication
        resetRateLimit(`login:${normalizedEmail}`);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (user.image) token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.id) session.user.id = token.id as string;
        if (token.picture) session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
