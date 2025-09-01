import AuthSection from "@/app/ui/sign/auth-section";
import HeaderSection from "@/app/ui/sign/header-section";

function SignupPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-20">
      <HeaderSection title={"회원가입"} />

      <AuthSection
        title={"회원가입"}
        message={"계정이 있으신가요?"}
        linkLabel={"로그인"}
        linkHref={"/login"}
      ></AuthSection>
    </div>
  );
}

export default SignupPage;
