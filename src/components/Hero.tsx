"use client";

import { ShieldCheck, Map, Headset } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#edfbfd] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-black sm:text-4xl lg:text-[38px]">
            Why Choose Wanderlust
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature Cards */}
        <Carousel
          opts={{ align: "start" }}
          aria-label="Why choose Wanderlust features"
        >
          <CarouselContent>
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <CarouselItem
                  key={feature.title}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full border-b border-gray-200 bg-white px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:px-7">
                    <Icon
                      className="mb-4 h-7 w-7 text-[#08a5c5]"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />

                    <h3 className="font-heading text-xl font-normal tracking-tight text-[#171717] sm:text-[21px]">
                      {feature.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-xs leading-[1.8] text-gray-500 sm:text-[13px]">
                      {feature.description}
                    </p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden md:-left-10 md:flex lg:-left-12" />
          <CarouselNext className="hidden md:-right-10 md:flex lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}