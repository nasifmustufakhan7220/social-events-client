import ActionTaken from "@/components/ActionTaken";
import Banner from "@/components/Banner";
import Subscribe from "@/components/Subscribe";
import UpcommingHomeEvents from "@/components/UpcommingHomeEvents";


export default function Home() {
  return (
    <div>

      <Banner/>

      <UpcommingHomeEvents/>
      <ActionTaken/>
      <Subscribe/>
    </div>
  );
}