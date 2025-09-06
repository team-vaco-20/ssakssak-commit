import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Parmas = {
  href: string;
  label: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function NavLink({ href, label, children, ...props }: Parmas) {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      {...props}
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-slate-800 hover:bg-orange-300 hover:text-orange-600 md:flex-none md:justify-start md:p-2 md:px-3",
        { "bg-orange-300 text-black": currentPath === href },
      )}
    >
      {children} <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

export default NavLink;
