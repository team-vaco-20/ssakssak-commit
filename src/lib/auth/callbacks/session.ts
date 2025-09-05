import type { CallbacksOptions } from "next-auth";

const sessionCallback: NonNullable<CallbacksOptions["session"]> = async ({
  session,
  token,
}) => {
  if (session.user) {
    session.user.name = token.userName ?? null;
    session.user.githubId = token.githubId ?? null;
    session.user.id = token.userId ?? null;
  }
  session.accessToken = token.accessToken;
  return session;
};

export default sessionCallback;
