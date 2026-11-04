"use client";
import { IEventType } from "@/Type/EventsType";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { notFound, useRouter } from "next/navigation";
// import { EventContextApi } from "@/contextApi/EventContextApi";

const DeleteManage = ({ event }: { event: IEventType }) => {
    console.log(event);
    const [open, setOpen] = useState(false);
    // const {setAvaiable} = useContext(EventContextApi)
    const router = useRouter();
    const handelDelete = async()=>{
        setOpen(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}manage-delete/${event._id}`,{
            method:'DELETE',
        });

        if(!res.ok) notFound();
        const data = await res.json();
        if(data.deletedCount > 0){
            setOpen(false);
            router.refresh();
            toast.add({
                title: "Your event is delete successfully",
                type: "success"
            });
        }else{
            return toast.add({
                title: "Your event is not delete successfully",
                type: "error"
            });
        };
    }
  return (
    <div>
      <div
      
        className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-glass-error/40 bg-glass-error/10 px-3 text-sm font-bold text-glass-error transition-colors hover:bg-glass-error/20"
      >
        
        <AlertDialog open={open} onOpenChange={setOpen}>
        
          <AlertDialogTrigger className={`flex items-center gap-1 cursor-pointer`}
            render={
            <div><Trash className="h-4 w-4" />Delete</div>}
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handelDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DeleteManage;
