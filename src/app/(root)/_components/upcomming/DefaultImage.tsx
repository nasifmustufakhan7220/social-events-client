"use client";

import { IEventType } from "@/Type/EventsType";
import Image from "next/image";
import { useState } from "react";

const DefaultImage = ({ event }: { event: IEventType }) => {
  const [img, setImg] = useState(event.image);
  return (
    <div>
      <Image
        src={img}
        alt={event.eventName}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        unoptimized
        onError={()=>setImg('/images.jpg')}
        className="object-cover"
      />
    </div>
  );
};

export default DefaultImage;
