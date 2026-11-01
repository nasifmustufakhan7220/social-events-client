import React from "react";
import { CalendarDays, HelpingHand, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import ThemeToggle from "../theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand">
            <HelpingHand className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-brand sm:text-xl">
              Upswell
            </span>
            <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
              COMMUNITY ACTION
            </span>
          </div>
        </div>

        {/* Nav Link (hidden on small screens) */}
        <Link
          href="#"
          className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground md:flex"
        >
          <CalendarDays className="h-5 w-5" />
          Upcoming Events
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button className="gap-2 bg-brand text-white hover:bg-brand/90">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
