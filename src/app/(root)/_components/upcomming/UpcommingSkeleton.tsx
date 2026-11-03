import { Skeleton } from "@/components/ui/skeleton";

const skeletonCards = [1, 2, 3, 4, 5, 6];
const skeletonChips = [1, 2, 3, 4, 5, 6, 7, 8];

const UpcommingSkeleton = () => {
  return (
    <div>
      {/* Filter buttons + search bar */}
      <div className="mt-12 mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center">
          {skeletonChips.map((item) => (
            <Skeleton
              key={item}
              className="ml-2 mt-2 h-9 w-20 rounded-full"
            />
          ))}
        </div>

        <div className="w-full lg:max-w-90">
          <Skeleton className="h-11 w-full rounded-2xl" />
        </div>
      </div>

      {/* Event cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((item) => (
          <article
            key={item}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
          >
            {/* Cover image */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Skeleton className="h-full w-full rounded-none" />

              {/* Category badge */}
              <Skeleton className="absolute left-4 top-4 h-7 w-28 rounded-full" />

              {/* Date badge */}
              <Skeleton className="absolute bottom-3 left-3 h-7 w-32 rounded-lg" />
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <Skeleton className="h-7 w-2/3" />

              <div className="mt-3 flex items-center gap-2">
                <Skeleton className="h-4 w-4 shrink-0" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <Skeleton className="h-4 w-4 shrink-0" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="mt-auto pt-4">
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UpcommingSkeleton;
