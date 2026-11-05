"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, PlusCircle, Settings } from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import ProfileSidebarSkeleton from "./DashboardProfileSkeleton";

const categories = [
    { href: "/create-event", label: "Create Event", icon: PlusCircle },
    { href: "/joined-event", label: "Joined Events", icon: CheckCircle },
    { href: "/manage-event", label: "Manage Events", icon: Settings },
];

const DashboardSidebar = () => {
    const pathName = usePathname();
    const {data:session, isPending} = useSession();

    if(isPending) return <ProfileSidebarSkeleton/>

    return (
        <aside className="space-y-6">

            <div className="overflow-hidden rounded-2xl bg-card shadow-md">

                <div className="relative h-24 bg-linear-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95]">
                    <span className="absolute left-6 top-5 h-3.5 w-3.5 rounded-full bg-amber-400/80" />
                    <span className="absolute right-12 top-8 h-4 w-4 rounded-full bg-emerald-400/70" />
                    <span className="absolute left-1/2 top-4 h-2.5 w-2.5 rounded-full bg-pink-400/70" />
                    <span className="absolute bottom-4 left-16 h-2 w-2 rounded-full bg-sky-300/80" />
                    <span className="absolute right-8 bottom-3 h-2.5 w-2.5 rounded-full bg-white/60" />
                </div>


                <div className="flex flex-col items-center px-4 pb-5 text-center">
                    <Avatar className="-mt-10 size-20 border-4 border-white shadow-md after:hidden">
                        <AvatarImage
                            src={session?.user?.image || "https://github.com/shadcn.png"}
                            alt="John Doe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <h2 className="mt-3 text-lg font-bold text-card-foreground">
                        {session?.user?.name}
                    </h2>

                    {/* Followers / Following */}
                    <div className="mt-4 grid w-full grid-cols-2 divide-x divide-border">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-base font-bold text-card-foreground">
                                Followers
                            </span>
                            <span className="text-sm text-muted-foreground">3</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-base font-bold text-card-foreground">
                                Following
                            </span>
                            <span className="text-sm text-muted-foreground">2</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-4 cursor-pointer text-sm font-bold text-card-foreground transition-colors hover:text-brand"
                    >
                        View Profile
                    </button>
                </div>
            </div>

            {/* Categories navlinks */}
            <nav className="overflow-hidden rounded-2xl bg-card shadow-md">
                <h2 className="border-b border-border px-4 py-4 text-base font-bold text-card-foreground">
                    Categories
                </h2>

                <div className="flex flex-col">
                    {categories.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 border-b border-border px-4 py-3.5 text-sm font-medium transition-colors last:border-b-0 ${
                                pathName === item.href
                                    ? "bg-brand/10 text-brand"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            <item.icon className="h-5 w-5 shrink-0 text-brand" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
