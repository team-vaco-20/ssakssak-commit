type HeaderSectionProps = {
  title: string;
  children: React.ReactNode;
};

function HeaderSection({ title, children }: HeaderSectionProps) {
  return (
    <div>
      <p className="text-[45px] font-bold">📑 {title}</p>
      {children}
    </div>
  );
}

export default HeaderSection;
