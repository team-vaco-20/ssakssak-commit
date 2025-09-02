type HeaderProps = {
  style: string;
  children: React.ReactNode;
};

const Header = ({ style, children }: HeaderProps) => {
  return <header className={`py-5 text-[32px] ${style}`}>{children}</header>;
};

export default Header;
