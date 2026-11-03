"use client";

import { IEventType } from "@/Type/EventsType";
import Image from "next/image";
import { useState } from "react";

const DefaultImageManage = ({ event }: { event: IEventType }) => {
  const [img, setImg] = useState(event.image);
  return (
    <div>
      <Image
        src={img}
        alt={event.eventName}
        fill
        unoptimized
        className="h-full w-full object-cover"
        onError={() => setImg("/images.jpg")}
      />
    </div>
  );
};

export default DefaultImageManage;
