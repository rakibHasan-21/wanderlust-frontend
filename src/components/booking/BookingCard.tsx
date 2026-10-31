"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Check } from "lucide-react";

type Destination = {
  _id: string;
  destinationName: string;
  price: string;
  departureDate: string;
};

const BookingCard = ({ data }: { data: Destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [selectedDate, setSelectedDate] = useState(
    data.departureDate?.slice(0, 10) || "",
  );

  const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   console.log(selectedDate);
    const AllData = {
      useName: user?.name,
      email: user?.email,
      image: user?.image,
      ...data,
      selectedDate: selectedDate,
      bookingdate: new Date(),
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AllData),
    });

    const result = await res.json();

    console.log("Response status:", res.status);
    console.log("Backend response:", result);
  };

  return (
    <div className="lg:col-span-4">
      <div className="sticky top-8 rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm">
        <span className="text-xs font-medium text-gray-500">Starting from</span>

        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#0295A9]">
            ${data.price}
          </span>
        </div>

        <span className="mt-0.5 block text-xs text-gray-400">per person</span>

        <form onSubmit={handleBook}>
          <div className="mb-5 mt-6">
            <label
              htmlFor="departureDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Departure Date
            </label>

            <input
              id="departureDate"
              type="date"
              name="departureDate"
              value={selectedDate}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full rounded-lg border border-gray-100 bg-[#f8f9fa] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#0295A9]"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0ea5be] px-4 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0c8ea4]"
          >
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 space-y-2.5 border-t border-gray-100 pt-5">
          <div className="flex items-center gap-2.5 text-xs text-gray-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Free cancellation up to 7 days</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Travel insurance included</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-600">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>24/7 customer support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
