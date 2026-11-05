import Link from "next/link";
import {
  HelpingHand,
  MapPin,
  Globe,
  Heart,
  CalendarDays,
  PlusCircle,
  CheckCircle,
  Settings,
} from "lucide-react";

const navLinks = [
  { href: "/up-comming", label: "Upcoming Events", icon: CalendarDays },
  { href: "/create-event", label: "Create an Event", icon: PlusCircle },
  { href: "/manage-event", label: "Manage My Events", icon: Settings },
  { href: "/joined-event", label: "My Joined Events", icon: CheckCircle },
];

const causes = [
  { label: "Winter Clothes & Blanket Relief", color: "text-brand" },
  { label: "City Clean-up & Waste Segregation", color: "text-brandHover" },
  { label: "Urban Tree Plantation Drives", color: "text-sun" },
  { label: "Underprivileged Meal Sharing", color: "text-nasif" },
  { label: "Free Medical & Health Camps", color: "text-brandHover" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-8">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand">
                <HelpingHand className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-brand sm:text-xl">
                  Upswell
                </span>
                <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
                  COMMUNITY ACTION
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              A community-driven event management platform empowering everyday citizens
              to create, join, and track impactful social development drives.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-brand" />
              <span>Dhaka, Bangladesh</span>
              <span className="text-muted-foreground">•</span>
              <span>Nationwide Impact</span>
            </div>
          </div>

          {/* Explore Platform */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              EXPLORE PLATFORM
            </h3>
            <nav className="space-y-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    <Icon className="h-4 w-4 text-brand" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Active Causes */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              ACTIVE CAUSES
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {causes.map((cause) => (
                <li key={cause.label} className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${cause.color}`} />
                  <span>{cause.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Spirit */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              COMMUNITY SPIRIT
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Every small action counts. Connect with local volunteers, turn compassion
              into direct community aid, and be the change your city needs.
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand">
              <Globe className="h-3 w-3" />
              100% Volunteer Driven
            </div>
          </div>
        </div>

        <hr className="my-12 border-border" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center text-sm text-muted-foreground">
          <p className="text-center md:text-left">
            © 2026 Upswell. Built with care for community service and social development.
          </p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-nasif" />
            <span>for a better tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
