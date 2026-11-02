"use client";

import { Input } from "@/components/ui/input";
import { IEventType } from "@/Type/EventsType";
import { CalendarDays, MapPin, Search, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const categories = [
  { name: "All", href: "#all" },
  { name: "Donation", href: "#all" },
  { name: "Cleanup", href: "#all" },
  { name: "Plantation", href: "#all" },
  { name: "Winter Relief", href: "#all" },
  { name: "Food Drive", href: "#all" },
  { name: "Health Camp", href: "#all" },
  { name: "Education", href: "#all" },
];

const UpCommingButtons = ({ events }: { events: IEventType[] }) => {
  const [name, setName] = useState("All");
  const [E, setE] = useState("");

  const filteredDatas = () => {
    const ev = [...events].sort((a,b)=> new Date(a.date) - new Date(b.date));

    if (name === "Donation") {
      return ev.filter((t) => t.eventType === name);
    } else if (name === "Cleanup") {
      return ev.filter((t) => t.eventType === name);
    } else if (name === "Plantation") {
      return ev.filter((t) => t.eventType === name);
    } else if (name === "Winter Relief") {
      return ev.filter((t) => t.eventType === name);
    } else if (name === "Food Drive") {
      return ev.filter((t) => t.eventType === name);
    } else if (name === "Health Camp") {
      return ev.filter((t) => t.eventType === name);
    } else if (name === "Education") {
      return ev.filter((t) => t.eventType === name);
    }
    return ev;
  };



  const e = filteredDatas();

  const newE:IEventType[] = e.filter(e=> {
    if(name.trim().length < 0){
        return newE;
    }

    const Efiltered = e.eventName.toLocaleLowerCase().includes(E.toLocaleLowerCase());
    return Efiltered;
  })

  return (
    <div>
      <div className="mt-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-center mb-12">
        <div className="flex flex-wrap items-center">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {setName(category.name)}}
              className={`rounded-full ml-2 mt-2 border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                name === category.name
                  ? "border-[#38bdf8] bg-[#38bdf8] text-white shadow-sm"
                  : "border-[#e2e8f0] bg-[#d7d7d7] text-[#292929] hover:bg-[#c2e2ee] hover:text-[#38bdf8]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-90">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search events or areas..."
            value={E}
            onChange={(e)=>setE(e.target.value)}
            className="h-11 rounded-2xl border-border bg-card pl-12 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {
         newE.map((event) => (
          <article
            key={event._id}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-colors"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={event.image}
                alt={event.eventName}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
                className="object-cover"
              />

              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium text-card-foreground">
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
                <button
                  type="button"
                  className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/70"
                >
                  <Link href={`/up-comming/${event._id}`}>View</Link>
                </button>
              </div>
            </div>
          </article>
        ))
        }
      </div>
    </div>
  );
};

export default UpCommingButtons;
