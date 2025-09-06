"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { PowerIcon } from "lucide-react";
import { signOut } from "next-auth/react";

function SignInButton() {
  return (
    <Link
      href={"/login"}
      className={
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      }
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
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}

export { SignInButton, SignOutButton };
