import { Button } from "@/components/ui/button";
import { CalendarDays, CirclePlus } from "lucide-react";
import { Suspense } from "react";
import UpCommingGrid from "../_components/upcomming/UpCommingGrid";
import Link from "next/link";



const UpComingEventspage = () => {
  return (
    <div>
      <section className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 ">
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                <CalendarDays size={17} />
                Future Community Drives
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                Upcoming <span className="text-brand">Events</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Discover verified volunteer initiatives scheduled for upcoming
                dates. Past events are automatically excluded so you can focus
                on active drives that need support.
              </p>
            </div>
            <Link href={'create-event'}>
              <Button className="h-14 rounded-2xl bg-brand px-8 text-base font-bold text-primary-foreground shadow-md hover:bg-primary/90">
              <CirclePlus size={20} />
              Create Event
            </Button>
            </Link>
          </div>

          {/* Filters and Search */}
          
          <Suspense fallback={<p>Loading...</p>}>
            <UpCommingGrid />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default UpComingEventspage;
