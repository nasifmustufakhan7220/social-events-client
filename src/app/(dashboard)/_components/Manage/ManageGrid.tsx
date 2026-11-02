import { auth } from "@/app/lib/auth";
import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { PlusCircle, Settings } from "lucide-react";
import ManageCard from "./ManageCard";
import { IEventType } from "@/Type/EventsType";

const ManageGrid = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}manage-event/${email}`,
  );
  const manageEvents: IEventType[] = await res.json();

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      {/* Page header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-bold text-ring dark:bg-brand dark:text-white">
            <Settings className="h-3.5 w-3.5" />
            Organizer Dashboard
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Manage<span className="text-brand"> My Events </span>
          </h1>

          <p className="mt-2 max-w-xl font-medium text-sm leading-relaxed text-muted-foreground">
            View, edit, and manage the social drives you have published. Only
            you have permission to edit or delete your created initiatives.
          </p>
        </div>

        {/* Create new event button */}
        <Link
          href="/create-event"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-[14px] font-bold text-white transition-colors hover:bg-brandHover"
        >
          <PlusCircle className="h-4 w-4" />
          Create New Event
        </Link>
      </div>

      {/* Divider */}
      <div className="mt-6 border-b border-border" />


      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
        {manageEvents.map((event) => (
          <ManageCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default ManageGrid;
