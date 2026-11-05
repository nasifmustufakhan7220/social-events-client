
const EventDetailsSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse px-4 py-6 sm:px-6">
      {/* Back Button */}
      <div className="mb-5 flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-muted" />
        <div className="h-3 w-36 rounded bg-muted" />
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">

        {/* Event Banner */}
        <div className="relative flex h-52 flex-col justify-end bg-muted sm:h-56">
          {/* Category Badge */}
          <div className="absolute left-4 top-4 h-6 w-28 rounded-full bg-secondary" />

          {/* Event Info */}
          <div className="space-y-3 bg-gradient-to-t from-foreground/20 to-transparent p-4 sm:p-5">
            <div className="h-6 w-40 rounded-md bg-secondary sm:h-7 sm:w-48" />

            <div className="flex flex-wrap items-center gap-4">
              <div className="h-3 w-16 rounded bg-secondary" />
              <div className="h-3 w-24 rounded bg-secondary" />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">

          {/* Join Section */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 p-3 sm:p-4">

            {/* Volunteers Info */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-secondary" />

              <div className="min-w-0 space-y-2">
                <div className="h-3.5 w-28 rounded bg-muted-foreground/30" />
                <div className="h-2.5 w-36 max-w-full rounded bg-muted" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ml-auto flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-secondary" />
              <div className="h-9 w-24 rounded-xl bg-secondary sm:w-28" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_172px]">

            {/* Left Content */}
            <div className="min-w-0 space-y-5">

              {/* About Section */}
              <div className="space-y-3">
                <div className="h-4 w-44 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>

              <div className="border-t border-border" />

              {/* Volunteer Guidelines */}
              <div className="space-y-4">
                <div className="h-3 w-36 rounded bg-muted" />

                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <div className="h-3 w-full max-w-md rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">

              {/* Organizer Card */}
              <div className="rounded-xl border border-border p-4">
                <div className="mb-4 h-3 w-32 rounded bg-muted" />

                {/* Organizer Info */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-secondary" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 w-20 rounded bg-muted" />
                    <div className="h-2.5 w-full rounded bg-muted" />
                  </div>
                </div>

                <div className="my-3 border-t border-border" />

                {/* Verified Badge */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary" />
                  <div className="h-2.5 w-28 rounded bg-muted" />
                </div>
              </div>

              {/* Confirmed Volunteers Card */}
              <div className="rounded-xl border border-border p-4">
                <div className="h-3 w-full rounded bg-muted" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;
