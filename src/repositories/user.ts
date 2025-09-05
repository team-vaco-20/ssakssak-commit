import prisma from "@/lib/prisma";

type UpsertUserParams = {
  githubId: bigint;
  email: string;
  name: string;
  avatarUrl?: string | null;
};

const upsertUser = ({ githubId, email, name, avatarUrl }: UpsertUserParams) => {
  const baseData = {
    user_email: email,
    user_name: name,
    is_active: true,
  };

  return prisma.users.upsert({
    where: {
      github_id: githubId,
    },
    update: {
      ...baseData,
      avatar_url: avatarUrl ?? undefined,
    },
    create: {
      ...baseData,
      github_id: githubId,
      avatar_url: avatarUrl ?? null,
    },
  });
};

const findUserIdByGithubId = async (githubId: bigint) => {
  return prisma.users.findUnique({
    where: { github_id: githubId },
    select: { user_id: true },
  });
};
export { upsertUser, findUserIdByGithubId };
