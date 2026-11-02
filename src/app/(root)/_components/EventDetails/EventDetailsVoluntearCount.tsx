"use client"
import { EventContextApi } from "@/contextApi/EventContextApi";
import React, { useContext } from "react";

const EventDetailsVoluntearCount = () => {
    const {joined} = useContext(EventContextApi)
  return (
    <div>
      <h3 className="text-xs font-bold text-card-foreground">
        {joined.length} Volunteers Joined
      </h3>
      <p className="text-[10px] text-muted-foreground">
        You are confirmed for this initiative
      </p>
    </div>
  );
};

export default EventDetailsVoluntearCount;
