
import ManageEmptyState from "../Manage/ManageEmptyState";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

import { notFound } from "next/navigation";
import JoinedEventCard from "./JoinedEventCard";

export interface IJoinedEvents {
  _id: string;
  userEmail: string;
  userImage: string;
  userName: string;
  eventID: string;
  eventName: string;
  eventImage:string;
  eventLocation: string;
  eventTyepe: string;
  eventDescription: string;
  eventWeek: string;
}

const JoinedEventsGrid = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  if(!email){
    return;
  }

  if (!email) {
    return <ManageEmptyState />;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}joined-users/${email}`,
  );
  if(!res.ok) notFound();
  const Joinedevents:IJoinedEvents[] = await res.json();

 
  return (
    <div>
      <JoinedEventCard joinedEvents={Joinedevents} />
    </div>
  );
};

export default JoinedEventsGrid;
