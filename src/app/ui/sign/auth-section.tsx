import { Button, TextButton } from "@/app/ui/common/button";

type AuthSectionProps = {
  title: string;
  message: string;
  linkLabel: string;
  linkHref: string;
};

function AuthSection({
  title,
  message,
  linkLabel,
  linkHref,
}: AuthSectionProps) {
  return (
    <div className="grid gap-5">
      <Button className="p-5 text-2xl">GitHub로 {title}</Button>

      <div className="flex justify-center gap-3">
        {message} <TextButton href={linkHref}>{linkLabel}</TextButton>
      </div>
    </div>
  );
}

export default AuthSection;
