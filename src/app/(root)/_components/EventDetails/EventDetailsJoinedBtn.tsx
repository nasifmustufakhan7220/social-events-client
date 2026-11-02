"use client";

import { useSession } from "@/app/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { EventContextApi, IJoinedButton } from "@/contextApi/EventContextApi";
import { IEventType } from "@/Type/EventsType";
import { Handshake } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const EventDetailsJoinedBtn = ({ data }: { data: IEventType }) => {
  const {data: session} = useSession();
  const { joined, setJoined} = useContext(EventContextApi);
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loader, setLoader] = useState(false);


  const user = {
    email: session?.user?.email as string,
    image: session?.user?.image as string,
    name: session?.user?.name as string,
  };

  const handelJoined = (user: IJoinedButton) => {
    setLoading(!loading);
    
    if(loading){
      const filteredData = joined.filter(u=>u.email !== user.email);
      setJoined(filteredData);
    }else{
      setLoader(true);
      setTimeout(()=>{
        setLoader(false);
        setJoined([...joined, user]);
      },1000)
    }

  };


  useEffect(()=>{
    const getLoading = localStorage.getItem("loading");
    if(getLoading){
      const parsedLoading = JSON.parse(getLoading);
      setLoading(parsedLoading);
    }
    setIsLoading(false);
  },[]);


  useEffect(()=>{
    if(isLoading === false){
      localStorage.setItem("loading", JSON.stringify(loading));
    }
  },[isLoading, loading])
  
  return (
    <div>
      <button
        onClick={() => handelJoined(user)}
        className={` flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-sm cursor-pointer`}
      >
        <Handshake size={13} />
        { loader ? <Spinner className="size-5 text-white" /> :  `${loading ? "Joined (Click to Leave)" : "Join Now"}`}
      </button>
    </div>
  );
};

export default EventDetailsJoinedBtn;
