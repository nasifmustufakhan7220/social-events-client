"use client";
import { useSession } from "@/app/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { EventContextApi, IVluntearType } from "@/contextApi/EventContextApi";
import { IEventType } from "@/Type/EventsType";
import { Handshake } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useContext, useState } from "react";

const EventDetailsJoinedBtn = ({ data }: { data: IEventType }) => {
  const { data: session } = useSession();
  const { joined, setJoined } = useContext(EventContextApi);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if(!session?.user) return;

  const handelJoined = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}joined-users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        userImage: session?.user?.image,
        userName: session?.user?.name,
        eventID: data._id,
        eventName: data.eventName,
        eventImage: data.image,
        eventLocation: data.location,
        eventTyepe: data.eventType,
        eventDescription: data.description,
        eventWeek: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }),
    });

    if(!res.ok) notFound();

    const events = await res.json();
    if (events.acknowledged) {
      toast.add({
        title: "You are successfully join this event",
        type: "success",
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}joined-events/${data._id}`,
      );
      const joinedEvent = await res.json();
      setJoined(joinedEvent);
    }
    setLoading(false);
  };

  const isUserJoined = joined.some(
    (j) => j.eventID === data._id && j.userEmail === session?.user.email,
  );

  const handeldelete = async (j: IVluntearType[]) => {
    const id = j.find(
      (i) => i.eventID === data._id && i.userEmail === session?.user?.email,
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}joined-users/${id?._id}`,
      {
        method: "DELETE",
      },
    );
    if(!res.ok){
      notFound();
    }
    const deleteUser = await res.json();
    if (deleteUser.deletedCount > 0) {
      router.refresh();
      toast.add({
        title: "You are successfully leave from this event",
        type: "success",
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner className="size-2.5 " />
      ) : isUserJoined ? (
        <button
          onClick={() => handeldelete(joined)}
          className={` flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-sm cursor-pointer`}
        >
          <Handshake size={13} />
          click to leave
        </button>
      ) : (
        <button
          onClick={() => handelJoined()}
          className={` flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-sm cursor-pointer`}
        >
          <Handshake size={13} />
          Join Now
        </button>
      )}
    </div>
  );
};

export default EventDetailsJoinedBtn;
