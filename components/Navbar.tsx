import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 border-b-[0.8px] border-slate-800">
      <Link href={"/"} className="flex it gap-3">
        <Image
          src={"/icons/logo.svg"}
          height={32}
          width={32}
          alt="SyncCity"
          className="max-sm:size-10 animate-spin fill-blue-500"
        />
        <Image
          src={"/icons/orbit.svg"}
          alt="logo"
          width={120}
          height={120}
          className="max-sm:hidden"
        />
      </Link>
      <div className="flex-between gap-5">
        {/* clerk user management */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
