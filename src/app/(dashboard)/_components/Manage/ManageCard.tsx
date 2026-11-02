import { IEventType } from "@/Type/EventsType";
import {
  CalendarDays,
  MapPin,
  SquarePen,
  Tag,
  Trash,
  User,
} from "lucide-react";
import Image from "next/image";

const ManageCard = ({ event } : {event: IEventType}) => {

  console.log(event);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-colors">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full">
        {/* Plain img so any image URL works without next/image domain config */}
        <Image
          src={event.image}
          alt={event.eventName}
          width={120}
          height={120}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {/* Status badge */}
        <span className="absolute left-3 top-3 inline-flex items-center border-2 border-blue-500 gap-1.5 rounded-full bg-transparent px-2.5 py-1 text-xs font-bold text-brand shadow-sm">
          <Tag className="h-3.5 w-3.5" />
          {event.eventType}
        </span>

        {/* Date badge */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
          <CalendarDays className="h-3.5 w-3.5 text-glass-success" />
          {event.date}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-xl font-extrabold tracking-tight text-glass-success">
          {event.eventName}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-glass-success" />
          <span>{event.location}</span>
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        {/* Organizer */}
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
          <User className="h-4 w-4 shrink-0 text-glass-success" />
          <span>{event.userName}</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/70"
          >
            View
          </button>
          <button
            type="button"
            className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
          >
            <SquarePen className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-glass-error/40 bg-glass-error/10 px-3 text-sm font-bold text-glass-error transition-colors hover:bg-glass-error/20"
          >
            <Trash className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default ManageCard;
