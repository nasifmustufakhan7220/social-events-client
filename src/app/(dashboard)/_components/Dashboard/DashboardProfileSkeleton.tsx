const ProfileSidebarSkeleton = () => {
  return (
    <div className="w-full max-w-70 space-y-6">
      {/* Profile Card Skeleton */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-md animate-pulse">
        {/* Cover */}
        <div className="relative h-24 bg-muted">
          <div className="absolute left-6 top-5 h-3 w-3 rounded-full bg-secondary" />
          <div className="absolute right-8 top-8 h-4 w-4 rounded-full bg-secondary" />
          <div className="absolute left-1/2 top-4 h-2.5 w-2.5 rounded-full bg-secondary" />
          <div className="absolute left-1/4 top-16 h-2 w-2 rounded-full bg-secondary" />
        </div>

        {/* Profile Image */}
        <div className="relative -mt-10 flex justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-card bg-secondary" />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center px-5 pb-5 pt-4">
          <div className="h-5 w-24 rounded-md bg-muted-foreground/30" />

          <div className="mt-3 h-4 w-16 rounded-md bg-muted" />

          {/* Followers / Following */}
          <div className="mt-5 flex w-full items-center justify-center">
            <div className="flex flex-1 flex-col items-center gap-2">
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="h-3 w-5 rounded bg-secondary" />
            </div>

            <div className="h-12 w-px bg-border" />

            <div className="flex flex-1 flex-col items-center gap-2">
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="h-3 w-5 rounded bg-secondary" />
            </div>
          </div>

          {/* View Profile */}
          <div className="mt-5 h-4 w-24 rounded bg-muted" />
        </div>
      </div>

      {/* Categories Card Skeleton */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-md animate-pulse">
        {/* Header */}
        <div className="border-b border-border px-4 py-5">
          <div className="h-4 w-24 rounded bg-muted" />
        </div>

        {/* Category Items */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex h-12 items-center gap-4 border-b border-border px-4 last:border-none"
          >
            <div className="h-5 w-5 rounded-full bg-muted" />
            <div className="h-4 w-28 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebarSkeleton;