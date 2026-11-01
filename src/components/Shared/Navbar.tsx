"use client";
import { CalendarDays, HelpingHand, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import ThemeToggle from "../theme-toggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/app/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  return (
    <nav className=" bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href={"/"}>
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
        </Link>

        {/* Nav Link (hidden on small screens) */}
        <Link
          href="/up-comming"
          className={`hidden items-center gap-2 text-sm font-bold  md:flex ${pathName === "/up-comming" ? "text-brand" : "text-muted-foreground"}`}
        >
          <CalendarDays className="h-5 w-5" />
          Upcoming Events
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={session?.user?.image as string}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                onClick={() =>
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/sign-in"); // redirect to login page
                      },
                    },
                  })
                }
                className="gap-2 bg-button-transparent hover:bg-(--button-transparent-hover) text-red-600 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href={"/sign-in"}>
              <Button className="gap-2 bg-brand text-white hover:bg-brand/90">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
