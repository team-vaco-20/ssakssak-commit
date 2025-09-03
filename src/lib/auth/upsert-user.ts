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
      updated_at: new Date(),
    },
    create: {
      ...baseData,
      user_id: crypto.randomUUID(),
      github_id: githubId,
      avatar_url: avatarUrl ?? null,
    },
  });
};

export default upsertUser;
