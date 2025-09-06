import NavLinks from "@/app/ui/layout/sections/nav/nav-links";
import {
  SignInButton,
  SignOutButton,
} from "@/app/ui/layout/sections/nav/sign-buttons";
import HomeLink from "@/app/ui/layout/sections/nav/home-link";

type Props = {
  isLoggedIn: boolean;
};

function SideNav({ isLoggedIn }: Props) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <HomeLink />

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        {isLoggedIn ? (
          <>
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <SignOutButton />
          </>
        ) : (
          <>
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <SignInButton />
          </>
        )}
      </div>
    </div>
  );
}

export default SideNav;
