"use client";

import { EventContextApi, IJoinedButton } from "@/contextApi/EventContextApi";
import Image from "next/image";
import { useContext } from "react";

const EventDetailsVoluntear = () => {
  const { joined } = useContext(EventContextApi);
  const voluntears: IJoinedButton[] = joined;

  return (
    <div>
      <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Confirmed Volunteers ({joined.length})
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {voluntears.slice(0,5).map((volunteer, index) => (
          <div
            key={`${volunteer.email}${index}`}
            className="flex items-center gap-2"
          >
            <span className="text-[10px] text-card-foreground">
              <Image
                className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
                src={volunteer.image}
                width={20}
                height={20}
                alt={volunteer.email}
              />
            </span>

            <div
              className={`flex size-5 items-center justify-center rounded-full text-[9px] font-bold text-slate-700`}
            >
              {volunteer.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetailsVoluntear;
