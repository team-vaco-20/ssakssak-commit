import { GitHubProfile } from "@/app/types/github-profile";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import initializeGitHubToken from "@/lib/auth/initialize-github-token";
import updateValidAccessToken from "@/lib/auth/update-valid-access-token";
import upsertUser from "@/lib/auth/upsert-user";

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
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "github") {
        return "/auth/error?code=INVALID_PROVIDER";
      }
      try {
        const githubProfile = profile as GitHubProfile;
        const email =
          githubProfile.email ??
          `${githubProfile.login}@users.noreply.github.com`;

        await upsertUser({
          githubId: BigInt(githubProfile.id),
          email,
          name: githubProfile.name ?? githubProfile.login,
          avatarUrl: githubProfile.avatar_url ?? null,
        });

        return true;
      } catch {
        return "/auth/error?code=INTERNAL_ERROR";
      }
    },

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
