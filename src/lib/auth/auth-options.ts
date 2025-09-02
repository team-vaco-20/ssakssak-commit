import { GitHubProfile } from "@/app/types/github-profile";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import initializeGitHubToken from "@/lib/auth/initialize-github-token";
import updateValidAccessToken from "@/lib/auth/update-valid-access-token";

const isAccessTokenExpired = (expiresAt?: number) => {
  if (!expiresAt) {
    return false;
  }
  const buffer = 60 * 1000;
  return Date.now() + buffer >= expiresAt;
};

const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        return initializeGitHubToken(token, account, profile as GitHubProfile);
      }

      if (!isAccessTokenExpired(token.accessTokenExpires)) {
        return token;
      }

      return updateValidAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.userName ?? null;
        session.user.id = token.userId ?? null;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default authOptions;
