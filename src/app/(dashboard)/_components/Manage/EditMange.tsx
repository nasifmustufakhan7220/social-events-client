"use client";
import { IEventType } from "@/Type/EventsType";
import {
  Calendar,
  ImageIcon,
  MapPin,
  SquarePen,
  Tag,
  Type,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const getDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate() + 1).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const EditMange = ({ event }: { event: IEventType }) => {
  const [d, setD] = useState<string>(event.date);
  const [i, setI] = useState(event.image);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handelOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateEvent = Object.fromEntries(formData.entries());
    const today = getDate();
    if (d < today) {
      return toast.add({
        title: "Date must be today or later",
        type: "error",
      });
    }

    if (!i.toLowerCase().startsWith("https://")) {
      return toast.add({
        title: "Provide valid image URL start with https://",
        type: "error",
      });
    }

    setOpen(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}manage-event/${event._id}`,
      {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...updateEvent, userEmail:event.userEmail, userName: event.userName}),
      },
    );

    const data = await res.json();
    if(data.matchedCount > 0){
        setOpen(false);
        router.refresh();
        toast.add({
            title: "Your event successfully updated",
            type: "success"

        })
    };
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 text-sm font-bold text-primary transition-colors hover:bg-primary/20">
          <SquarePen className="h-4 w-4" />
          Edit
        </DialogTrigger>
        <DialogContent className="w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <form onSubmit={handelOnSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Make changes to your events here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <div className="space-y-2">
                <Label
                  htmlFor="event-title"
                  className="gap-1 font-bold text-card-foreground"
                >
                  Event Title <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Type className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="event-title"
                    name="eventName"
                    defaultValue={event.eventName}
                    placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                    className="h-10 rounded-lg bg-background pl-9"
                  />
                </div>
              </div>
            </FieldGroup>

            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="event-type"
                    className="gap-1 font-bold text-card-foreground"
                  >
                    Event Type <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      id="event-type"
                      defaultValue={event.eventType}
                      name="eventType"
                      className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-input bg-background pl-9 pr-3 text-base text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30 dark:scheme-dark"
                    >
                      {eventTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-card text-card-foreground"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="event-date"
                    className="gap-1 font-bold text-card-foreground"
                  >
                    Event Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="event-date"
                      name="date"
                      ref={(el) => {
                        if (el) {
                          el.min = getDate();
                        }
                      }}
                      value={d}
                      onChange={(e) => setD(e.target.value)}
                      type="date"
                      className="h-10 rounded-lg bg-background pl-9 dark:scheme-dark"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dates must be in the future (today or later)
                  </p>
                </div>
              </div>
            </FieldGroup>

            <FieldGroup>
              <div className="space-y-2">
                <Label
                  htmlFor="event-location"
                  className="gap-1 font-bold text-card-foreground"
                >
                  Location / Venue <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="event-location"
                    name="location"
                    defaultValue={event.location}
                    placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                    className="h-10 rounded-lg bg-background pl-9"
                  />
                </div>
              </div>
            </FieldGroup>

            <FieldGroup>
              <div className="space-y-2">
                <Label
                  htmlFor="event-thumbnail"
                  className="gap-1 font-bold text-card-foreground"
                >
                  Thumbnail Image URL <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="event-thumbnail"
                    name="image"
                    value={i}
                    onChange={(e) => setI(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-…"
                    className="h-10 rounded-lg bg-background pl-9"
                  />
                </div>
              </div>
            </FieldGroup>

            <FieldGroup>
              <div className="space-y-2">
                <Label
                  htmlFor="event-description"
                  className="gap-1 font-bold text-card-foreground"
                >
                  Event Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="event-description"
                  name="description"
                  defaultValue={event.description}
                  placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete…"
                  className="min-h-32 rounded-lg bg-background"
                />
              </div>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
               <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMange;
