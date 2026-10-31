"use client";

import { CalendarDays, CircleCheck, Eye, MapPin, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface Booking {
  _id: string;
  destinationName: string;
  country?: string;
  image?: string;
  imageUrl?: string;
  price: string | number;
  departureDate?: string;
  selectedDate?: string;
  bookingDate?: string;
  status?: string;
}

interface BookCardProps {
  booking: Booking;
  onView?: (id: string) => void;
}

const formatDate = (date?: string) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

const BookCard = ({ booking, onView }: BookCardProps) => {
    const router = useRouter();
  const hendleDelectBooking = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}`,{
       method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
  };
  const {
    _id,
    destinationName,
    country,
    image,
    imageUrl,
    price,
    departureDate,
    selectedDate,
    status = "Confirmed",
  } = booking;

  const destinationImage = image || imageUrl;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        {/* Destination image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:min-h-64 sm:w-56">
          {destinationImage ? (
            <img
              src={destinationImage}
              alt={destinationName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-52 items-center justify-center text-sm text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Booking information */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge className="gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50">
                <CircleCheck className="size-4" />
                {status}
              </Badge>

              <span className="max-w-40 truncate text-xs text-gray-400">
                ID: {_id}
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {destinationName}
            </h3>

            {country && (
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="size-4 shrink-0 text-[#1a9bbf]" />
                {country}
              </p>
            )}

            <p className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="size-4 shrink-0 text-[#1a9bbf]" />
              Departure: {formatDate(selectedDate || departureDate)}
            </p>
          </div>

          {/* Price and actions */}
          <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-500">Total price per person</p>

              <p className="mt-1 text-2xl font-bold text-[#1a9bbf]">${price}</p>
            </div>

            {/* Right-side buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={hendleDelectBooking}
                type="button"
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="mr-1 size-4" />
                Delete
              </Button>

              <Button
                type="button"
                onClick={() => onView?.(_id)}
                className="bg-[#1a9bbf] text-white hover:bg-[#158aa9]"
              >
                <Eye className="mr-1 size-4" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
