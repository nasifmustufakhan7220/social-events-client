"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { IJoinedEvents } from './JoinedEventGrid';

const DefaultJoinedImage = ({event}: {event:IJoinedEvents}) => {
    const [img, setImg] = useState(event.eventImage)
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

export default DefaultJoinedImage;