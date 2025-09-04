"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/app/ui/common/button";
import Image from "next/image";

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
  return (
    <div className="grid gap-18">
      <div className="flex justify-center text-3xl">{title}</div>
      <p className="whitespace-pre-wrap">{description}</p>

      <Button
        className="hover:gray-80 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm hover:text-white"
        onClick={() => signIn("github", { callbackUrl })}
      >
        <Image src={"/github-mark.svg"} width={20} height={20} alt={"Github"} />

        <span className="whitespace-nowrap">{label}</span>
      </Button>
    </div>
  );
}

export default AuthSection;
