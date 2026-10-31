import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Calendar, Check } from "lucide-react";
import EditDestination from "../../../components/EditDestination";
import { DelectDestination } from "@/components/DelectDestination";
import BookingCard from "@/components/booking/BookingCard";
import TokenServer from "@/lib/TokenServer";


interface DestinationData {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const Details = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;



  const token = await TokenServer()
  console.log(token)

  // Fetch destination data from backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${slug}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store", 
  });
  const data: DestinationData = await res.json();

  // Static highlights fallback list matching the UI design
  const highlights = [
    "Luxury beachfront accommodation",
    "Traditional Balinese spa treatment",
    "Sunrise trek to Mount Batur",
    "Visit Uluwatu Temple at sunset",
    "Private beach dinner experience",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Destinations</span>
          </Link>

          <div className="flex items-center gap-3">
            <EditDestination data={data}></EditDestination>
            <DelectDestination data={data}></DelectDestination>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden mb-10 shadow-sm">
          <Image
            src="/images/destinations/image1.png"
            alt={data?.destinationName || "Destination Image"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2 font-medium capitalize">
                <MapPin className="w-4 h-4" />
                <span>{data?.country}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif tracking-tight font-medium text-gray-900 capitalize">
                {data?.destinationName}
              </h1>

              {/* Meta information */}
              <div className="flex items-center gap-6 mt-4 text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span className="font-semibold text-gray-900">4.9</span>
                  <span className="text-gray-500 font-normal">
                    (234 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {data?.duration || "7"} Days /{" "}
                    {Math.max(1, Number(data?.duration || 7) - 1)} Nights
                  </span>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {data?.description ||
                  "Discover the magic of this destination with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
              </p>
            </div>

            {/* Highlights Section */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-3">
                Highlights
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                Discover the magic of this destination with pristine beaches,
                ancient temples, and vibrant culture. Experience luxury resorts,
                tropical landscapes, and unforgettable sunsets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <BookingCard data={data}></BookingCard>
        </div>
      </main>
    </div>
  );
};

export default Details;
