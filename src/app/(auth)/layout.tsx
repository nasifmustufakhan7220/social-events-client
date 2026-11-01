import Image from "next/image";
import type { ReactNode } from "react";

// Benefits shown on top of the hero image
const benefits = [
    {
    title: "Clothes Donation Drive",
    description: "Collect gently used and new clothes from donors and distribute them to poor and homeless people, especially during winter."
  },
  {
    title: "Clean City Campaign",
    description: "Organize volunteers to clean streets, parks, and public spaces, collect litter, and raise awareness."
  },
  {
    title: "Free Food Distribution",
    description: "Prepare and distribute free meals to hungry and low-income families, street children."
  },
  {
    title: "Tree Plantation Program",
    description: "Plant trees in neighborhoods, schools, and roadsides to improve air quality, reduce heat, and create a greener environment for future generations."
  },
  {
    title: "Free Education Support",
    description: "Provide free tutoring, books, and school supplies to underprivileged children."
  }
];

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left side: hero image with benefits overlay */}
                        <div className="relative h-80 w-full lg:h-auto lg:w-1/2">
                            <Image
                                src="/hero.jpg"
                                alt="Traveler walking across a mountain suspension bridge"
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />

                            {/* Translucent box with the benefits list */}
                            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-black/60 p-5 backdrop-blur-sm sm:p-6">
                                <ul className="space-y-4">
                                    {benefits.map((benefit) => (
                                        <li key={benefit.title}>
                                            <h2 className="text-sm font-black uppercase tracking-wide text-white">
                                                {benefit.title}
                                            </h2>
                                            <p className="mt-1 text-sm leading-relaxed text-white/90">
                                                {benefit.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right side: the page content (login / register form) */}
                        <div className="w-full p-6 sm:p-8 lg:w-1/2 lg:p-12">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
