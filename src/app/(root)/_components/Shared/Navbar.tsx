"use client";
import {
  CalendarDays,
  CheckCircle,
  HelpingHand,
  LogIn,
  LogOut,
  PlusCircleIcon,
  Settings,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import ThemeToggle from "../../../../components/theme-toggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/app/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <div>
                      <Avatar>
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={session?.user?.image as string}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  }
                />
                <DropdownMenuContent className="w-64 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      My Account
                    </DropdownMenuLabel>

                    <DropdownMenuItem
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium outline-none transition-colors hover:bg-foreground/10! focus:bg-foreground/10! ${
                        pathName === "/create-event"
                          ? "bg-brand/10 text-brand"
                          : "text-muted-foreground"
                      }`}
                    >
                      <PlusCircleIcon className="size-4" />
                      <Link href="/create-event" className="flex-1">
                        Create Event
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium outline-none transition-colors hover:bg-foreground/10! focus:bg-foreground/10! ${
                        pathName === "/joined-event"
                          ? "bg-brand/10 text-brand"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CheckCircle className="size-4" />
                      <Link href="/joined-event" className="flex-1">
                        Joined Events
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium outline-none transition-colors hover:bg-foreground/10! focus:bg-foreground/10! ${
                        pathName === "/manage-event"
                          ? "bg-brand/10 text-brand"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Settings className="size-4" />
                      <Link href="/manage-event" className="flex-1">
                        Manage Events
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem className="group/dropdown-menu-item flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 outline-none transition-colors duration-200 hover:bg-red-500! hover:text-white! focus:bg-red-500! focus:text-white!">
                    <LogOut className="size-4 transition-colors duration-200 group-hover/dropdown-menu-item:text-white! group-focus/dropdown-menu-item:text-white!" />

                    <span
                      className="flex-1 transition-colors duration-200 group-hover/dropdown-menu-item:text-white! group-focus/dropdown-menu-item:text-white!"
                      onClick={() =>
                        signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              router.push("/sign-in");
                            },
                          },
                        })
                      }
                    >
                      Log out
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() =>
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/sign-in");
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
