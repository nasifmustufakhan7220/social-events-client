"use client";
import { IEventType } from "@/Type/EventsType";
import Image from "next/image";
import { useState } from "react";

const DefaultImageEventsDetails = ({ data }: { data: IEventType }) => {
  const [imgSrc, setImgSrc] = useState(data.image);
  return (
    <div className="relative w-full h-full">
      <Image
        src={imgSrc}
        alt="Event cover"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
        loading="eager"
        onError={() => setImgSrc("/images.jpg")}
        className="object-cover"
      />
    </div>
  );
};

export default DefaultImageEventsDetails;
