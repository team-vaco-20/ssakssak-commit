"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { PowerIcon } from "lucide-react";
import { signOut } from "next-auth/react";

function SignInButton() {
  return (
    <Link
      href={"/login"}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm hover:bg-purple-100 hover:text-purple-800 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <LinkIcon className="w-6" />
      <p className="hidden md:block">Signin</p>
    </Link>
  );
}

function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm hover:bg-purple-100 hover:text-purple-800 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}

export { SignInButton, SignOutButton };
