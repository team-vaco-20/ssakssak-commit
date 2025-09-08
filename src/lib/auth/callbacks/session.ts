import type { CallbacksOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const sessionCallback: NonNullable<CallbacksOptions["session"]> = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => {
  if (session.user) {
    session.user.userName = token.userName ?? null;
    session.user.githubId = token.githubId ?? null;
    session.user.userId = token.userId ?? null;
  }

  if (token.reportHistory) {
    session.reportHistory = token.reportHistory;
  }

  return session;
};

export default sessionCallback;
