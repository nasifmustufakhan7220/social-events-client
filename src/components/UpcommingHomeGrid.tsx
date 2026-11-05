import { IEventType } from "@/Type/EventsType";
import UpcommingHomeButtons from "./UpcommingHomeButtons";
import { notFound } from "next/navigation";

const UpcommingHomeGrid = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}all`);
  const events: IEventType[] = await res.json();
  if(!res.ok) notFound()
  return (
    <div>
      <UpcommingHomeButtons events={events}/>
    </div>
  );
};

export default UpcommingHomeGrid;
