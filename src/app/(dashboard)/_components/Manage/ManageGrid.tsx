import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

import ManageCard from "./ManageCard";
import { IEventType } from "@/Type/EventsType";
import ManageEmptyState from "./ManageEmptyState";

const ManageGrid = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;
  if(!email) return;


   const JwtToken = await auth.api.getToken({
    headers: await headers()
  });
  const token = JwtToken?.token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}manage-event/${email}`,
    {
       headers:{
        authorization: `Bearer ${token}`
      }
    }
  );
  const manageEvents: IEventType[] = await res.json();

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      {/* Divider */}
      <div className="mt-6 border-b border-border" />

      {manageEvents.length === 0 ? (
        <div className="col-span-full flex w-full justify-center">
          <ManageEmptyState />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
          {manageEvents.map((event) => (
            <ManageCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageGrid;
