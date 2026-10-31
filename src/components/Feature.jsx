import React from "react";

export default async function Feature() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);

  if (!res.ok) {
    throw new Error("Failed to fetch featured destinations");
  }

  const result = await res.json();

  return (
    <section className="mx-auto max-w-[1180px] p-5">
      <h2 className="mb-5 text-2xl font-bold">
        Featured Destinations ({result.length})
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {result.map((destination) => (
          <div key={destination._id} className="rounded-xl border p-4">
            <img
              src={destination.imageUrl?.[0]}
              alt={destination.destinationName}
              className="h-52 w-full rounded-lg object-cover"
            />

            <h3 className="mt-3 text-xl font-semibold">
              {destination.destinationName}
            </h3>

            <p>{destination.country}</p>
            <p>Price: ${destination.price}</p>
            <p>Duration: {destination.duration} days</p>
            <p>{destination.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}