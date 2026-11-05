import { IEventType } from "@/Type/EventsType";
import React from "react";
import UpcommingHomeButtons from "./UpcommingHomeButtons";

const UpcommingHomeGrid = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}all`);
  const events: IEventType[] = await res.json();
  return (
    <div>
      <UpcommingHomeButtons events={events}/>
    </div>
  );
};

export default UpcommingHomeGrid;
