"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CirclePlus,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Tag,
  Type,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient, useSession } from "@/app/lib/auth-client";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { notFound } from "next/navigation";

const quickPresets = [
  "Winter Clothes",
  "Blanket Relief",
  "Cleanup",
  "Tree Plantation",
];

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const getTodayLoacl = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CreateEventPage = () => {
  const { data: session } = useSession();
  const [d, setD] = useState("");
  const [submit, setSubmit] = useState(false);
  const [i, setI] = useState("");

  const userEmail = session?.user?.email;

  const handelONSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { data, error } = await authClient.token();
    if (error) {
      toast.add({ title: error.message, type: "error" });
      return;
    }
    const token = data?.token;
    if (!token) {
      toast.add({ title: "Not authenticated", type: "error" });
      return;
    }
    const createEventData = Object.fromEntries(formData.entries());

    const today = getTodayLoacl();
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

    setSubmit(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}create-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...createEventData,
        userEmail: userEmail,
        userName: session?.user?.name,
        userImage: session?.user?.image,
      }),
    });

    if (!res.json) notFound();

    const result = await res.json();
    if (result.acknowledged) {
      toast.add({
        title: "Event created successfully",
        type: "success",
      });
    }
    setSubmit(false);
  };
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Back to upcoming events */}
      <Link
        href="/up-comming"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Upcoming Events
      </Link>

      {/* Form card */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand">
          <Sparkles className="h-3.5 w-3.5" />
          Social Service Drive
        </span>

        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-card-foreground sm:text-3xl">
          Create a Community Event
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Organize a local relief effort, environmental cleanup, or community
          support drive.
        </p>

        {/* Form (UI only, no functionality) */}
        <form className="mt-8 space-y-5" onSubmit={handelONSubmit}>
          {/* Event Title */}
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
                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                className="h-10 rounded-lg bg-background pl-9"
              />
            </div>
          </div>

          {/* Event Type + Event Date */}
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
                  defaultValue="Donation"
                  name="eventType"
                  className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-input bg-background pl-9 pr-3 text-base text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30 dark:scheme-dark"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type} className="bg-card text-card-foreground">
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
                      el.min = getTodayLoacl();
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

          {/* Location / Venue */}
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
                placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                className="h-10 rounded-lg bg-background pl-9"
              />
            </div>
          </div>

          {/* Thumbnail Image URL */}
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

            <p className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">
                Quick photo presets:
              </span>
              {quickPresets.map((preset, index) => (
                <span key={preset} className="flex items-center gap-2">
                  <button
                    type="button"
                    className="cursor-pointer font-medium text-brand hover:underline"
                  >
                    {preset}
                  </button>
                  {index < quickPresets.length - 1 && (
                    <span aria-hidden="true" className="text-muted-foreground">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Event Description */}
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
              placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete…"
              className="min-h-32 rounded-lg bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-background px-4 py-3">
            <span className="text-sm text-muted-foreground">
              Organizer Email attached:
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {userEmail}
            </span>
          </div>

          <button
            type="submit"
            disabled={submit}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand text-sm font-bold text-white transition-colors hover:bg-brand/90"
          >
            {submit ? (
              <Spinner className="size-5 text-white" />
            ) : (
              <>
                <CirclePlus className="h-5 w-5" />
                Publish Event
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateEventPage;
