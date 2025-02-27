"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import UserCard from "~/components/card/user-card";
import { useUser } from "~/hooks/user/use-user";
import { cn } from "~/lib/utils";
import { NAV_LINKS } from "./links";
import Logo from "./logo";
import MobileNav from "./mobile-navbar";

const Navbar = () => {
  const [scrolling, setIsScrolling] = useState<boolean>(false);
  const pathname = usePathname();
  const { user } = useUser();

  const handleScrollEvent = () => {
    if (window.scrollY > 1) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  });

  return (
    <nav
      className={`${scrolling ? "shadow-md" : "shadow-none"} sticky left-0 right-0 top-0 z-40 bg-background px-2 sm:px-4`}
    >
      <div
        className={cn(
          `relative mx-auto flex w-full max-w-[1200px] items-center gap-x-2 py-4 transition-all duration-500 md:justify-between md:py-5`,
          user.email && "justify-between",
        )}
      >
        <MobileNav />
        <Logo />
        <div className="hidden w-full items-center justify-center gap-x-2 md:flex lg:gap-x-6">
          {NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`p-3 text-[16px] font-medium text-neutral-dark-1 transition-all duration-300 hover:text-primary ${pathname === item.link ? "text-primary" : ""}`}
            >
              {item.route}
            </Link>
          ))}
        </div>

        {!user.email && (
          <div className="hidden items-center justify-end gap-x-1 md:flex md:gap-x-6 lg:gap-x-8">
            <Link
              href="/login"
              className="grid h-[44px] place-items-center whitespace-nowrap rounded-md border border-primary px-4 text-primary lg:px-6"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="grid h-[44px] place-items-center whitespace-nowrap rounded-md border border-primary bg-primary px-4 text-white lg:px-6"
            >
              Get Started
            </Link>
          </div>
        )}
        {user.email && <UserCard email={user.email} />}
      </div>
    </nav>
  );
};

export default Navbar;
