import { Skeleton } from "@/components/ui/skeleton";

const skeletonCards = [1, 2, 3, 4, 5, 6];

const JoinedEventsSkeleton = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-5xl px-4">
        {/* Divider */}
        <div className="mt-6 border-b border-border" />

        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
          {skeletonCards.map((item) => (
            <article
              key={item}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Skeleton className="h-full w-full rounded-none" />

                {/* Type badge */}
                <Skeleton className="absolute left-3 top-3 h-6 w-20 rounded-full" />

                {/* Date badge */}
                <Skeleton className="absolute bottom-3 left-3 h-6 w-24 rounded-lg" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <Skeleton className="h-6 w-2/3" />

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
    </div>
  );
};

export default JoinedEventsSkeleton;