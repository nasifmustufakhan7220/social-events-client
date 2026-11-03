import { CalendarX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const UpcommingEmptyState = ({setE}:{setE: Dispatch<SetStateAction<string>>}) => {
  return (
<div className="flex w-full justify-center">
  <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-lg sm:px-10 sm:py-16 md:max-w-2xl md:px-14 md:py-20">
    {/* Icon circle */}
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
      <CalendarX className="h-8 w-8 text-brand" />
    </div>

    {/* Title */}
    <h3 className="mt-5 text-xl font-bold text-foreground sm:text-2xl">
      No events found
    </h3>

    {/* Description */}
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
      We couldn&apos;t find any upcoming events. Try a different category or
      search for something else.
    </p>

    {/* Action button */}
    <button
      type="button"
      value={""}
      onClick={()=>setE("")}
      className="mt-6 cursor-pointer rounded-lg bg-brand px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brandHover"
    >
      Clear Filters
    </button>
  </div>
</div>
  );
};

export default UpcommingEmptyState;
