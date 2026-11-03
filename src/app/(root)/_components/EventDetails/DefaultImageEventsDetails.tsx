"use client"
import { IEventType } from '@/Type/EventsType';
import Image from 'next/image';
import { useState } from 'react';


const DefaultImageEventsDetails = ({data}:{data:IEventType}) => {
    const [imgSrc, setImgSrc] = useState(data.image);
    return (
        <div>
            <Image
              src={imgSrc}
              alt="Event cover"
              fill
              unoptimized
              onError={()=>setImgSrc("/images.jpg")}
              className="object-cover"
            />
        </div>
    );
};

export default DefaultImageEventsDetails;