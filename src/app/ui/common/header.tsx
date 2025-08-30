type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <header className="py-5 text-[32px]">{children}</header>;
};

export default Header;
