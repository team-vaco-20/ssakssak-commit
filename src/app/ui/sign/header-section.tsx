import Header from "@/app/ui/common/header";

type HeaderProps = {
  title: string;
};

function HeaderSection({ title }: HeaderProps) {
  return (
    <div className="fixed top-0 text-center">
      <Header>ssakssak commit</Header>
      <p>{title}</p>
    </div>
  );
}
export default HeaderSection;
