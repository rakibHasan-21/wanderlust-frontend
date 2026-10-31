import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative isolate flex min-h-[320px] w-full items-center justify-center overflow-hidden md:min-h-[440px]">
      {/* Background image */}
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />

      {/* Content */}
      <div className="flex flex-col items-center px-4 text-center text-white">
        <h2 className="text-4xl font-light tracking-tight md:text-6xl">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-3 max-w-xl text-sm md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Button
          
          className="mt-8 h-12 rounded-none bg-white px-8 text-sm font-normal uppercase tracking-wide text-black hover:bg-white/90"
        >
          <Link href="/booking">
            Book Your Trip Today
            <ArrowRight className="ml-3 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}