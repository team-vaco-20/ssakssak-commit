type HeaderProps = {
  title: string;
  subTitlePrefix: string;
  highlight: string;
  subTitleSuffix: string;
};

const Header = ({
  title,
  subTitlePrefix,
  highlight,
  subTitleSuffix,
}: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-2 pr-12 text-[40px] font-bold">{title}</div>
      <div className="text-center">
        <span className="text-gray-400">{subTitlePrefix} </span>
        <span className="text-yellow-500">{highlight}</span>
        <span className="text-gray-400"> {subTitleSuffix}</span>
      </div>
    </div>
  );
};

export default Header;
