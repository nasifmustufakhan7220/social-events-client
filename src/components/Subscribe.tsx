import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscribe = () => {
    return (
        <section className="bg-background py-16 md:py-2">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="flex flex-col gap-8 p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
                        {/* Text */}
                        <div className="max-w-xl space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                                Newsletter
                            </p>
                            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Stay in the loop
                            </h2>
                            <p className="text-base leading-7 text-muted-foreground">
                                Get updates on upcoming volunteer drives, relief
                                distributions, and community initiatives across
                                Dhaka and beyond.
                            </p>
                        </div>

                        {/* Form (static UI) */}
                        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-11 flex-1 rounded-lg bg-background"
                            />
                            <Button
                                type="submit"
                                className="h-11 shrink-0 rounded-lg bg-brand px-6 text-white hover:bg-brand/90"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;