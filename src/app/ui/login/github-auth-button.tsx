"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/app/ui/common/button";

type Props = {
  label: string;
  callbackUrl?: string;
};

function GitHubAuthButton({ label, callbackUrl = "/" }: Props) {
  return (
    <Button
      className="w-full rounded-2xl py-4 text-sm font-semibold shadow-sm"
      onClick={() => signIn("github", { callbackUrl })}
    >
      {label}
    </Button>
  );
}
export default GitHubAuthButton;
