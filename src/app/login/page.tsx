import Header from "@/app/ui/common/header";
import AuthSection from "@/app/ui/login/auth-section";

function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-30">
      <Header style="fixed top-0">ssakssak commit</Header>

      <AuthSection title={"Login"} label={"GitHub로 로그인하기"}></AuthSection>
      <AuthSection title={"Sign up"} label={"GitHub로 시작하기"}></AuthSection>
    </div>
  );
}

export default LoginPage;
