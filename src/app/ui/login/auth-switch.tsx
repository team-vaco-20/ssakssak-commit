import { TextButton } from "@/app/ui/common/button";

type AuthSwitchProps = {
  hasAccount: boolean;
  onToggle: () => void;
};

function AuthSwitch({ hasAccount, onToggle }: AuthSwitchProps) {
  return (
    <section className="flex flex-row items-center justify-around">
      {hasAccount ? (
        <>
          <span>회원이 아니신가요?</span>
          <TextButton onClick={onToggle}>회원가입</TextButton>
        </>
      ) : (
        <>
          <span>이미 계정이 있으신가요?</span>
          <TextButton onClick={onToggle}>Login</TextButton>
        </>
      )}
    </section>
  );
}

export default AuthSwitch;
