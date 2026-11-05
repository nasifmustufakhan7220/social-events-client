import Link from "next/link";
import { Calendar, CalendarDays, Sun } from "lucide-react";

const exploreEvents = [
    { label: "Today", icon: Sun, tileClass: "from-blue-500 to-sky-400" },
    {
        label: "Tomorrow",
        icon: Sun,
        tileClass: "from-amber-300 to-orange-400",
    },
    {
        label: "This Week",
        icon: CalendarDays,
        tileClass: "from-violet-400 to-purple-600",
    },
    {
        label: "Choose Date",
        icon: Calendar,
        tileClass: "from-slate-300 to-slate-400",
    },
];

const DashboardRightbar = () => {
    return (
        <aside className="space-y-6">
            {/* Post your event card */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#111827] via-[#1e1b4b] to-[#312e81] p-6 text-center shadow-md">
                {/* decorative dots */}
                <span className="absolute left-5 top-4 h-3 w-3 rounded-full bg-brand" />
                <span className="absolute right-8 top-10 h-4 w-4 rounded-full bg-brand" />
                <span className="absolute bottom-8 left-10 h-2.5 w-2.5 rounded-full bg-brand" />
                <span className="absolute right-14 bottom-4 h-2 w-2 rounded-full bg-brand" />

                <div className="relative">
                    <h2 className="text-lg font-bold text-white">
                        Want to Post Your Event
                    </h2>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-white/85">
                        Post your event on Upswell for free. Just make an account
                        and add it through the simple form. As simple as that.
                    </p>
                    <Link
                        href="/create-event"
                        className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-8 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
                    >
                        Post It Now
                    </Link>
                </div>
            </div>

            {/* Explore events */}
            <div>
                <h2 className="text-xl font-bold text-foreground">
                    Explore Events
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    {exploreEvents.map((item) => (
                        <div
                            key={item.label}
                            className={`relative flex min-h-28 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br p-4 text-white shadow-sm ${item.tileClass}`}
                        >
                            <item.icon className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-white/20" />

                            <div className="relative flex flex-col items-center gap-2">
                                <item.icon className="h-6 w-6" />
                                <span className="text-sm font-bold">
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default DashboardRightbar;
