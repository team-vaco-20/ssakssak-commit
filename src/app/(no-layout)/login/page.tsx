"use client";

import { useState } from "react";
import Header from "@/app/ui/common/header";
import AuthSection from "@/app/ui/login/auth-section";
import AuthSwitch from "@/app/ui/login/auth-switch";
import Image from "next/image";

function LoginPage() {
  const [hasAccount, setHasAccount] = useState(false);

  const authCopy = hasAccount
    ? {
        title: "Login",
        description:
          "Welcome back!\n프로젝트의 커밋 흐름과 변화를 계속 추적해 보세요.\n ",
        label: "GitHub로 로그인하기",
      }
    : {
        title: "Get Started",
        description: "쉽게 시작하고\n🔎 프로젝트를 더 똑똑하게 추적해 보세요.",
        label: "GitHub로 시작하기",
      };

  return (
    <div className="flex h-screen items-center justify-center gap-30 bg-[#F4F0E6]">
      <Header className="fixed top-0">ssakssak commit</Header>

      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4">
        <div className="grid w-full gap-8 rounded-3xl bg-white p-8 shadow-xl md:grid-cols-2 md:p-12">
          <section className="flex flex-col justify-center gap-6">
            <AuthSection
              title={authCopy.title}
              description={authCopy.description}
              label={authCopy.label}
              callbackUrl="/"
            />

            <AuthSwitch
              hasAccount={hasAccount}
              onToggle={() => setHasAccount((prev) => !prev)}
            />
          </section>
          <Image
            src={"/login.svg"}
            width={600}
            height={600}
            alt={"ssakssak-commit"}
          />
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
