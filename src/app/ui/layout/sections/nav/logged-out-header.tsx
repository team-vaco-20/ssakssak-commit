"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import Image from "next/image";

export default function LoggedOutHeader() {
  return (
    <header className="sticky top-0 z-40 border-neutral-200 bg-white/90 pt-5 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-lg items-center justify-between px-4">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
        >
          <Image src="/logo.svg" alt="싹싹커밋 로고" width={60} height={60} />
          <div className="flex flex-col leading-tight">
            <span className="text-m font-semibold text-neutral-900">
              싹싹커밋
            </span>
            <span className="text-[16px] text-neutral-500 group-hover:text-neutral-600">
              commit insight helper
            </span>
          </div>
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
        >
          <LogIn className="h-4 w-4 text-neutral-600" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      </div>
    </header>
  );
}
