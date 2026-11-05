
import Link from "next/link";
import Image from "next/image";

import {
  HeartHandshake,
  ArrowUpRight,
  Heart,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa6";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "All Events", href: "/events" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Community Events", href: "/events" },
      { label: "About UpsWell", href: "/about" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Become a Volunteer", href: "/events" },
      { label: "Create an Event", href: "/create-event" },
      { label: "Join an Initiative", href: "/events" },
      { label: "Make an Impact", href: "/events" },
    ],
  },
  {
    title: "Your Activities",
    links: [
      { label: "My Joined Events", href: "/joined-events" },
      { label: "My Created Events", href: "/my-events" },
      { label: "Manage Events", href: "/my-events" },
      { label: "My Profile", href: "/profile" },
    ],
  },
  {
    title: "About & Support",
    links: [
      { label: "Our Mission", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: FaEnvelope,
    href: "mailto:hello@upswell.com",
    label: "Email",
  },
];

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-background mt-10">

      {/* Full Footer Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/footer.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 dark:opacity-15"
        />

        {/* Theme Overlay */}
        <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">

        {/* Logo and Description */}
        <div className="mb-14 flex flex-col gap-5 sm:mb-16 lg:mb-20">

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-2xl font-extrabold tracking-tight text-foreground"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <HeartHandshake size={25} />
            </span>

            Ups<span className="text-brand">Well</span>
          </Link>

          <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            Building stronger communities through kindness,
            volunteering, and meaningful social initiatives.
            Together, we can create a better tomorrow.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm font-bold text-foreground sm:text-base">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors duration-200 hover:text-brand sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-5 text-sm font-bold text-foreground sm:text-base">
              Stay Connected
            </h3>

            <p className="mb-5 text-xs leading-6 text-muted-foreground sm:text-sm">
              Follow our journey and stay updated with our latest
              community initiatives.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-border bg-card/70 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand transition-all hover:gap-3 sm:text-sm"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border py-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-muted-foreground sm:text-sm">
            © 2026 UpsWell. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            Made with
            <Heart size={14} className="fill-nasif text-nasif" />
            for a better community
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
