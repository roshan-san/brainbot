import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.SERVER_URL}/api/auth/callback/google`,
    },
  },
  trustedOrigins: [process.env.CLIENT_URL!, process.env.SERVER_URL!],
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 60 * 24,
  },
});

// Context only for protected routes
export type HonoAuthContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};
