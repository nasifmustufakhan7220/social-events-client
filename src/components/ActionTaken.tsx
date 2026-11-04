import Image from "next/image";
import { CalendarDays, User } from "lucide-react";

// Dummy data for the cards (images cycle through the 3 local photos)
const stories = [
    {
        id: 1,
        title: "Winter Clothes Drive",
        text: "Volunteers gathered warm clothes and blankets for rickshaw pullers across Mirpur during the coldest weeks of the year. Coats, sweaters, and gloves were handed out directly on the roadside to those who work outdoors every day.",
        date: "August 16, 2024",
        author: "Emma",
        image: "/hero.jpg",
    },
    {
        id: 2,
        title: "Night Blanket Relief",
        text: "Sleeping on the pavement in winter is brutal. Our team drove through Mohammadpur after midnight handing blankets, hot tea, and food to people sleeping on footpaths and flyovers.",
        date: "September 3, 2024",
        author: "Rahim",
        image: "/images.jpg",
    },
    {
        id: 3,
        title: "Dhanmondi Lake Clean-up",
        text: "Over sixty volunteers spent a Saturday morning pulling plastic bottles and bags out of Dhanmondi Lake. The collected waste was sorted for recycling and properly disposed of.",
        date: "October 12, 2024",
        author: "Sara",
        image: "/pexels-aj4xo-27597369.jpg",
    },
];

const ActionTaken = () => {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-6xl space-y-8 px-4">
                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                        {/* Photo and text side by side, alternating on desktop */}
                        <div
                            className={`flex flex-col md:flex-row ${
                                index % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            {/* Photo */}
                            <div className="relative h-64 w-full md:h-auto md:w-1/2">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Text side */}
                            <div className="flex w-full flex-col md:w-1/2">
                                <div className="flex-1 p-6 sm:p-8">
                                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                                        {story.title}
                                    </h3>
                                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                                        {story.text}{" "}
                                        <span className="font-semibold text-brand">
                                            More...
                                        </span>
                                    </p>
                                </div>

                                {/* Footer: date and author */}
                                <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border px-6 py-4 text-sm font-semibold uppercase tracking-wide text-foreground sm:px-8">
                                    <span className="flex items-center gap-2">
                                        <CalendarDays
                                            size={16}
                                            className="text-brand"
                                        />
                                        {story.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <User size={16} className="text-brand" />
                                        {story.author}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ActionTaken;
