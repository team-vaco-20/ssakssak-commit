import AuthSection from "@/app/ui/sign/auth-section";
import HeaderSection from "@/app/ui/sign/header-section";

function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-30">
      <HeaderSection title={"로그인"} />

      <AuthSection
        title={"로그인"}
        message={"계정이 없으신가요?"}
        linkLabel={"회원가입"}
        linkHref={"/signup"}
      ></AuthSection>
    </div>
  );
}

export default LoginPage;
