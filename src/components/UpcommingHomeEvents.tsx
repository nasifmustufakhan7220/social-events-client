
import { Suspense } from "react";
import UpcommingSkeleton from "@/app/(root)/_components/upcomming/UpcommingSkeleton";
import UpcommingHomeGrid from "./UpcommingHomeGrid";

const UpcommingHomeEvents = () => {
  return (
    <div>
      <section className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 ">
          {/* Header */}
           <div className="mx-auto max-w-3xl space-y-3 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                        Upcoming Initiatives
                    </p>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Recent Upcoming Events
                    </h2>
                    <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                       Latest 6 community drives scheduled in your city. Get involved today.
                    </p>
                </div>

          {/* Filters and Search */}

          <Suspense fallback={<UpcommingSkeleton />}>
            <UpcommingHomeGrid/>
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default UpcommingHomeEvents;
