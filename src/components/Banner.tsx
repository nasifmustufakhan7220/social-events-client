
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    image: "/hero.jpg",
    badge: "Community-Driven Social Development Platform",
    title: "Empowering Communities.",
    highlight: "Sustaining Growth.",
    description:
      "Create, discover, and join local social service drives in your neighborhood. From winter clothes and blanket distribution to urban tree plantations and cleanups.",
  },
  {
    image: "/SmallActions.jpg",
    badge: "Together We Can Make A Difference",
    title: "Small Actions.",
    highlight: "Big Impact.",
    description:
      "Every helping hand matters. Join local volunteers, support meaningful initiatives, and bring positive changes to the lives of people around you.",
  },
  {
    image: "/voluntearToday.jpg",
    badge: "Be The Change Your Community Needs",
    title: "Volunteer Today.",
    highlight: "Inspire Tomorrow.",
    description:
      "Discover upcoming volunteering opportunities, participate in social events, and become part of a community that cares.",
  },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[activeSlide];

  return (
    <section className="relative flex min-h-[550px] items-center justify-center overflow-hidden sm:min-h-[620px] lg:min-h-[750px]">

      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-accent/80 dark:bg-background/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <span className="mx-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-brand/40 bg-card/80 px-3 py-2 text-xs leading-5 font-semibold text-brand sm:px-4 sm:text-sm">
              <Sparkles size={15} className="shrink-0 sm:size-4" />
              {slide.badge}
            </span>

            {/* Heading */}
            <h1 className="mx-auto mt-6 max-w-4xl text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {slide.title}{" "}
              <span className="text-brand">
                {slide.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10 sm:gap-5">

          {/* Previous */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-card/80 text-brand transition-all duration-300 hover:bg-brand hover:text-white sm:size-11"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 sm:h-2.5 ${
                  activeSlide === index
                    ? "w-7 bg-brand sm:w-8"
                    : "w-2 bg-foreground/40 sm:w-2.5"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-card/80 text-brand transition-all duration-300 hover:bg-brand hover:text-white sm:size-11"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Banner;
