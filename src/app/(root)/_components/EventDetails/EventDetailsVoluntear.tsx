"use client";
import { EventContextApi } from "@/contextApi/EventContextApi";
import Image from "next/image";
import {  useContext, useEffect } from "react";
import { IEventType } from "@/Type/EventsType";


const EventDetailsVoluntear = ({eventId}: {eventId:IEventType }) => {
  const {joined, setJoined} = useContext(EventContextApi)

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}joined-events/${eventId._id}`)
    .then((res)=> res.json())
    .then((data)=> setJoined(data))
  },[eventId,setJoined])

  return (
    <div>
      <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Confirmed Volunteers ({joined.length})
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {joined.map((volunteer, index) => (
          <div key={`${volunteer._id}${index}`} className="flex items-center gap-2">
            <span className="text-[10px] text-card-foreground">
              <Image
                className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
                src={volunteer.userImage}
                width={20}
                height={20}
                alt={volunteer.userName}
              />
            </span>

            <div
              className={`flex size-5 items-center justify-center rounded-full text-[9px] font-bold text-slate-700`}
            >
              {volunteer.userName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetailsVoluntear;
