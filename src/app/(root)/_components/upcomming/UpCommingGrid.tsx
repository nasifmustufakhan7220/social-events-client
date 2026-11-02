import { IEventType } from "@/Type/EventsType";
import UpCommingButtons from "./UpCommingButtons";


const UpCommingGrid = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}all`);
  const events: IEventType[] = await res.json();

  return (
    <div>
        <UpCommingButtons events={events} />
    </div>
  );
};

export default UpCommingGrid;
