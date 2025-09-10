import {
  AUTH_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import AuthSection from "@/app/ui/login/auth-section";
import Image from "next/image";

type ErrorCode = keyof typeof AUTH_ERROR_MESSAGES;

type Props = {
  searchParams: Promise<{ code?: string }>;
};

async function AuthErrorPage({ searchParams }: Props) {
  const params = await searchParams;
  const code = (params.code ?? SYSTEM_ERROR_MESSAGES.NETWORK) as ErrorCode;
  const message = AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.UNKNOWN;

  return (
    <div className="flex h-screen items-center justify-center gap-30 bg-[#F4F0E6]">
      <div className="fixed top-0">ssakssak commit</div>

      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4">
        <div className="grid w-full gap-8 rounded-3xl bg-white p-8 shadow-xl md:grid-cols-2 md:p-12">
          <section className="flex flex-col justify-center gap-6">
            <AuthSection
              title="이런! 오류가 발생했어요!"
              description={message}
              label="GitHub로 다시 시작하기"
              callbackUrl="/"
            />
          </section>

          <Image
            src="/error-cat.svg"
            width={600}
            height={600}
            alt="ssakssak-commit"
          />
        </div>
      </main>
    </div>
  );
}

export default AuthErrorPage;
