
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl text-center">

        {/* Brand */}
        <Link href="/" className="mb-12 inline-flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-xl font-black text-white">
            U
          </div>

          <div className="text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand">
              UpsWell
            </h2>
            <p className="text-[10px] font-semibold tracking-[3px] text-muted-foreground">
              COMMUNITY ACTION
            </p>
          </div>
        </Link>

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-[120px] leading-none font-black tracking-tighter text-brand/15 sm:text-[180px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-brand/20 bg-background px-5 py-2 text-sm font-bold tracking-widest text-brand">
              PAGE NOT FOUND
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Oops! You took a wrong turn.
          </h2>

          <p className="mx-auto max-w-md text-base leading-7 text-muted-foreground">
            Looks like this page has wandered off! Don&apos;t worry,
            there&apos;s still a whole community waiting for you.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
          >
            <span>←</span>
            Back to Home
          </Link>

          <Link
            href="/up-comming"
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 font-semibold transition-all hover:border-brand hover:text-brand sm:w-auto"
          >
            Explore Events
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-16 text-sm text-muted-foreground">
          Together, we make a difference.{" "}
          <span className="font-semibold text-brand">
            That&apos;s UpsWell.
          </span>
        </p>

      </div>
    </main>
  );
};

export default NotFound;
