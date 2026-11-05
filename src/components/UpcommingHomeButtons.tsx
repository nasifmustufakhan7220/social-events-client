"use client";
import DefaultImage from "@/app/(root)/_components/upcomming/DefaultImage";
import { IEventType } from "@/Type/EventsType";
import { CalendarDays, MapPin, Tag, User } from "lucide-react";
import Link from "next/link";
import UpcommingHomeEmptyState from "./UpcommingHomeEmptyState";

const UpcommingHomeButtons = ({ events }: { events: IEventType[] }) => {
  const filteredDatas = () => {
    const ev = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return ev;
  };

  const e = filteredDatas();
  console.log(e);

  const getTodayLoacl = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const day = String(now.getDay() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = getTodayLoacl();
  const newE = e.filter((ev) => {
    if (ev.date < today) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {newE.length === 0 ? (
            <div className="col-span-full flex w-full justify-center">
              <UpcommingHomeEmptyState />
            </div>
          ) : (
            newE.slice(0, 6).map((event) => (
              <article
                key={event._id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-colors"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <DefaultImage event={event} />
                  <div
                    className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium ${event.eventType === "Winter Relief" ? "text-brand" : event.eventType === "Health Camp" ? "text-nasif" : event.eventType === "Education" ? "text-brand" : event.eventType === "Food Drive" ? "text-amber-700" : event.eventType === "Plantation" ? "text-glass-success" : event.eventType === "Cleanup" ? "text-muted-foreground" : event.eventType === "Donation" && "text-brand"}`}
                  >
                    <Tag size={12} className="text-brand" />
                    {event.eventType}
                  </div>

                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                    <CalendarDays className="h-3.5 w-3.5 text-brand" />
                    {event.date}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-brand">
                    {event.eventName}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-brand" />
                    <span>{event.location}</span>
                  </div>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                    <User className="h-4 w-4 shrink-0 text-brand" />
                    <span>{event.userName}</span>
                  </div>

                  <div className="mt-auto flex gap-2 pt-4">
                    <Link
                      className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/70"
                      href={`/up-comming/${event._id}`}
                    >
                      <button type="button">View</button>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcommingHomeButtons;
