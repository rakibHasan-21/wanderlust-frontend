"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
];

export default function Home() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Carousel opts={{ align: "start" }} aria-label="Traveler testimonials">
          {/* Section Heading + Controls */}
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
            <div>
              <h2 className="font-heading text-4xl font-normal tracking-tight text-black sm:text-5xl">
                What Travelers Say
              </h2>

              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <CarouselPrevious className="static size-10 rounded-full text-gray-600" />
              <CarouselNext className="static size-10 rounded-full text-gray-600" />
            </div>
          </div>

          {/* Testimonial Cards */}
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full sm:basis-1/2"
              >
                <figure className="flex min-h-44 gap-4 border border-gray-200 bg-white p-5 sm:gap-6 sm:p-6">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <blockquote className="font-heading text-[17px] font-normal leading-[1.6] text-[#171717]">
                      {testimonial.quote}
                    </blockquote>

                    <figcaption className="mt-auto pt-6">
                      <p className="text-sm text-[#08a5c5]">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>

                  <div className="relative w-32 shrink-0 self-stretch sm:w-40">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 640px) 160px, 128px"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
