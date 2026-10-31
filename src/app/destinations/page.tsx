
import Link from "next/link";
import { MapPin, CalendarDays, ArrowUpRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string | number;
  duration: string | number;
  departureDate: string;
  imageUrl: string[];
  description: string;
}

async function getDestinations(): Promise<Destination[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json();
}

const Destinations = async () => {
  const destinations = await getDestinations();
//   console.log(destinations)

  return (
<section className="bg-gradient-to-b from-white to-slate-50 px-3 py-12 sm:px-5 sm:py-16">
  <div className="mx-auto max-w-5xl">
    {/* Section Heading */}
    <div className="mb-8 text-center sm:mb-10">
      <span className="mb-3 inline-block rounded-full border border-cyan-100 bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
        Discover the World
      </span>

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Explore All Destinations
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        Find your perfect travel experience from our curated collection.
      </p>
    </div>

    {/* Destination Cards */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <Card
          key={destination._id}
          className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-900/10"
        >
          {/* Image */}
          <Link
            href={`/destinations/${destination._id}`}
            className="relative block aspect-[1.55/1] overflow-hidden bg-slate-100"
          >
            <img
              src={
                destination.imageUrl?.[0] ||
                "/images/placeholder.png"
              }
              alt={destination.destinationName}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Rating */}
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>4.5</span>
            </div>

            {/* Category Label */}
            <div className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
              Travel Destination
            </div>
          </Link>

          {/* Details */}
          <div className="p-4 sm:p-5">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="size-3.5 shrink-0 text-cyan-600" />
              <span className="truncate">{destination.country}</span>
            </div>

            {/* Name and Price */}
            <div className="mt-3 flex items-start justify-between gap-3">
              <h3 className="min-w-0 truncate text-xl font-bold capitalize tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-cyan-700">
                {destination.destinationName}
              </h3>

              <p className="shrink-0 text-right">
                <span className="text-xl font-bold text-slate-900">
                  ${destination.price}
                </span>
                <span className="block text-[11px] text-slate-500">
                  / person
                </span>
              </p>
            </div>

            {/* Duration */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <CalendarDays className="size-4 text-cyan-600" />
              <span>{destination.duration} Days Trip</span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-100" />

            {/* Book Now */}
            <Link
              href={`/destinations/${destination._id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold tracking-wide text-white transition-all duration-300 hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
              EXPLORE DESTINATION
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>

  );
};

export default Destinations;
