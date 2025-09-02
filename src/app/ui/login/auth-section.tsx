import GitHubAuthButton from "@/app/ui/login/github-auth-button";

type AuthSectionProps = {
  title: string;
  label: string;
};

function AuthSection({ title, label }: AuthSectionProps) {
  return (
    <div className="grid gap-5">
      <div className="flex justify-center gap-3 text-3xl">{title}</div>
      <GitHubAuthButton label={`${label}`}></GitHubAuthButton>
    </div>
  );
}

export default AuthSection;
