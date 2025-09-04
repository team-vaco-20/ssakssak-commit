type HeaderProps = {
  className: string;
  children: React.ReactNode;
};

const Header = ({ className, children }: HeaderProps) => {
  return (
    <header className={`py-5 text-[32px] ${className}`}>{children}</header>
  );
};

export default Header;
