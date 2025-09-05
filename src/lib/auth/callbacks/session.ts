import type { CallbacksOptions } from "next-auth";

const sessionCallback: NonNullable<CallbacksOptions["session"]> = async ({
  session,
  token,
}) => {
  if (session.user) {
    session.user.userName = token.userName ?? null;
    session.user.githubId = token.githubId ?? null;
    session.user.userId = token.userId ?? null;
  }
  return session;
};

export default sessionCallback;
