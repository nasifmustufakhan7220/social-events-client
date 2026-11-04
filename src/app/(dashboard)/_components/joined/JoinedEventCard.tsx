"use client"
import DefaultJoinedImage from "./DefaultJoinedImage";
import Link from "next/link";
import { CalendarDays, MapPin, Tag, User } from "lucide-react";
import { IJoinedEvents } from "./JoinedEventGrid";
import ManageEmptyState from "../Manage/ManageEmptyState";


const JoinedEventCard = ({joinedEvents}:{joinedEvents:IJoinedEvents[]}) => {

    return (
        <div>
            <div className="mx-auto w-full max-w-5xl px-4">
        {/* Divider */}
        <div className="mt-6 border-b border-border" />

        {joinedEvents.length === 0 ? (
          <div className="col-span-full flex w-full justify-center">
            <ManageEmptyState />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
            {joinedEvents.map((event) => (
              <article
                key={event._id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full">
                  {/* Plain img so any image URL works without next/image domain config */}
                  <DefaultJoinedImage event={event}/>

                  {/* Status badge */}
                  <span className="absolute left-3 top-3 inline-flex items-center border-2 border-blue-500 gap-1.5 rounded-full bg-transparent px-2.5 py-1 text-xs font-bold text-brand shadow-sm">
                    <Tag className="h-3.5 w-3.5" />
                    {event.eventTyepe}
                  </span>

                  {/* Date badge */}
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                    <CalendarDays className="h-3.5 w-3.5 text-glass-success" />
                    {event.eventWeek}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-brand">
                    {event.eventName}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-brand" />
                    <span>{event.eventLocation}</span>
                  </div>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {event.eventDescription}
                  </p>

                  {/* Organizer */}
                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                    <User className="h-4 w-4 shrink-0 text-brand" />
                    <span>{event.userName}</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2 pt-4">
                    <Link className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/70" href={`/up-comming/${event.eventID}`}>
                    <button
                      type="button"
                      
                    >
                      View
                    </button>
                      </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
        </div>
    );
};

export default JoinedEventCard;