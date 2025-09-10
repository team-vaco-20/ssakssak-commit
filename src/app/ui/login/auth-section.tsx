"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/app/ui/common/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AuthSectionProps = {
  title: string;
  description: string;
  label: React.ReactNode;
  callbackUrl?: string;
};

function AuthSection({
  title,
  description,
  label,
  callbackUrl,
}: AuthSectionProps) {
  const router = useRouter();

  return (
    <div className="grid gap-10">
      <div className="flex justify-center text-3xl">{title}</div>
      <p className="whitespace-pre-wrap">{description}</p>
      <div className="flex flex-col gap-4">
        <Button
          className="hover:gray-80 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm hover:text-white"
          onClick={() => signIn("github", { callbackUrl })}
        >
          <Image src="/github-mark.svg" width={20} height={20} alt="Github" />
          <span className="whitespace-nowrap">{label}</span>
        </Button>
        <Button onClick={() => router.push("/")}>
          리포트 생성 페이지로 이동
        </Button>
      </div>
    </div>
  );
}

export default AuthSection;
