import { Sparkles } from "lucide-react";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image src="/hero.jpg" alt="" fill priority className="object-cover" />
        {/* Overlay so the text stays readable over the photo — bright tinted look in light theme, unchanged in dark */}
        <div className="absolute inset-0 bg-accent/80 dark:bg-background/75" />

        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-center sm:py-20">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-card/80 px-4 py-2 text-sm font-semibold text-brand">
            <Sparkles size={16} />
            Community-Driven Social Development Platform
          </span>

          {/* Heading */}
          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Gather for Good.{" "}
            <span className="text-brand">Transform Your Neighborhood.</span>
          </h1>

          {/* Paragraph */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Create, discover, and join local social service drives in your
            neighborhood. From winter clothes and blanket distribution in Mirpur
            and Mohammadpur to urban tree plantations and cleanups.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Banner;
