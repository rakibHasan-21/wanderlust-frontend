import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SEARCH_FIELDS = [
  { label: "Location", placeholder: "Address, City or Zip" },
  { label: "Date/Duration", placeholder: "Anytime / 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
] as const;

const searchCellClasses =
  "border-b border-white/20 sm:border-b-0 sm:border-r last:border-r-0";

const Banner = () => {
  return (
    <main className="relative flex min-h-[700px] flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Beautiful travel destination"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div
        className="absolute inset-0 -z-10 bg-black/30"
        aria-hidden="true"
      />

      <section className="flex flex-1 items-center justify-center px-6 pt-16 pb-32">
        <div className="flex flex-col items-center text-center text-white">
          <h1 className="font-heading text-5xl leading-tight font-medium sm:text-6xl lg:text-7xl">
            Discover Your
            <br />
            Next Adventure
          </h1>

          <p className="mt-5 max-w-xl text-sm text-white/90 sm:text-base">
            Explore breathtaking destinations and create unforgettable
            memories with our curated travel experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-11 px-8 font-semibold tracking-widest uppercase"
            >
              Explore Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              className="h-11 bg-white/70 px-8 font-semibold tracking-widest text-foreground uppercase backdrop-blur-sm hover:bg-white/90"
            >
              View Destination
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 bg-black/25 backdrop-blur-sm sm:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        {SEARCH_FIELDS.map((field) => (
          <div
            key={field.label}
            className={cn("px-6 py-3.5", searchCellClasses)}
          >
            <label className="block text-sm font-semibold text-white">
              {field.label}
            </label>

            <input
              type="text"
              placeholder={field.placeholder}
              aria-label={field.label}
              className="mt-0.5 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
          </div>
        ))}

        <button
          type="button"
          className="cursor-pointer bg-primary px-10 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/85 sm:py-0"
        >
          Search
        </button>
      </div>
    </main>
  );
};

export default Banner;