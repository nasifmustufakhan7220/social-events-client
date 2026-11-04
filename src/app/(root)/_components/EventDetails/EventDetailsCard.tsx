
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Share2,
  Mail,
  BadgeCheck,
  Tag,
} from "lucide-react";
import { IEventType } from "@/Type/EventsType";
import EventDetailsJoinedBtn from "./EventDetailsJoinedBtn";
import EventDetailsVoluntearCount from "./EventDetailsVoluntearCount";
import EventDetailsVoluntear from "./EventDetailsVoluntear";
import DefaultImageEventsDetails from "./DefaultImageEventsDetails";
import { notFound } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";



export default async function EventDetails({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const jwtToken = await auth.api.getToken({
      headers: await headers()
    });

    console.log(jwtToken?.token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}up-comming/${id}`);
    if(!res.ok){
      notFound();
    }
    const data: IEventType = await res.json();
  return (
    <main className="min-h-screen bg-background px-4 py-6">

      <div className="mx-auto max-w-160">

        {/* Back Button */}
        <Link
          href="/up-comming"
          className="mb-6 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to Upcoming Events
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">

          {/* Event Banner */}
          <div className="relative h-60">

            <DefaultImageEventsDetails data={data}/>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

            {/* Category */}
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium text-card-foreground">
              <Tag size={12} className="text-brand" />
              {data.eventType}
            </div>

            {/* Event Information */}
            <div className="absolute bottom-4 left-4 text-white">

              <h1 className="mb-2 text-2xl font-bold">
               {data.eventName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs">

                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-brand" />
                  {data.location}
                </div>

                <div className="flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-brand" />
                  {data.date}
                </div>

              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 sm:p-6">

            {/* Volunteer Status */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-3">

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Users size={19} />
                </div>

                <EventDetailsVoluntearCount/>

              </div>

              <div className="flex items-center gap-2">

                {/* Share Button */}
                <button className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground">
                  <Share2 size={15} />
                </button>

                {/* Joined Button */}

                
               <EventDetailsJoinedBtn data={data} />

              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_180px]">

              {/* Left Content */}
              <div>

                <h2 className="mb-3 text-sm font-bold text-card-foreground">
                  About this Social Initiative
                </h2>

                <p className="border-b border-border pb-4 text-xs text-muted-foreground">
                  {data.description}
                </p>

                {/* Guidelines */}
                <div className="mt-4">

                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Volunteer Guidelines
                  </h3>

                  <ul className="space-y-2 text-[10px] leading-relaxed text-muted-foreground">

                    <li className="flex gap-2">
                      <span className="text-brand">●</span>
                      Please arrive 15 minutes before the scheduled time at the designated location.
                    </li>

                    <li className="flex gap-2">
                      <span className="text-brand">●</span>
                      Wear comfortable clothing suitable for physical social work and distribution.
                    </li>

                    <li className="flex gap-2">
                      <span className="text-brand">●</span>
                      Bring any pre-coordinated relief packages or distribution items if requested.
                    </li>

                  </ul>
                </div>
              </div>


              {/* Right Sidebar */}
              <div className="space-y-4">



                <div className="rounded-xl border border-border p-4">

                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Initiative Organizer
                  </h3>

                  <div className="flex items-center gap-2">

                    <div >
                      <Image className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground" src={data.userImage} width={20} height={20} alt={data.userName}/>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-card-foreground">
                        {data.userName}
                      </h4>

                      <p className="flex items-center gap-1 text-[9px] text-muted-foreground">
                        <Mail size={10} />
                        {data.userEmail}
                      </p>
                    </div>

                  </div>

                  <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-[9px] text-muted-foreground">
                    <BadgeCheck size={12} className="text-brand" />
                    Verified Platform Member
                  </div>

                </div>

                {/* Volunteers Card */}
                <div className="rounded-xl border border-border p-4">

                  

                  <div className="space-y-2">

                    <EventDetailsVoluntear eventId={data}/>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
