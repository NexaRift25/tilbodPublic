"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

interface PromoOffer {
  id: number;
  title: string;
  brand: string;
  discount: string;
  image: string;
  link: string;
}

interface PromoCardProps {
  offer: PromoOffer;
}

export default function PromoCard({ offer }: PromoCardProps) {
  const { title, brand, discount, image, link } = offer;

  return (
    <div className="relative min-w-[283px] lg:w-[26.6875rem] h-[31.25rem] sm:h-[37.5rem] lg:h-[40.625rem] 2xl:h-[45.75rem] bg-card-background text-smoky-white rounded-3xl border border-primary overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          width={427}
          height={732}
          className="w-full h-full min-w-[17.6875rem] md:min-w-[22.5rem] lg:min-w-[26.6875rem] object-cover pointer-events-none select-none"
          priority
        />

        {/* Discount Card - Always 24px from bottom, left, and right */}
        <div className="whitespace-nowrap overflow-hidden min-w-[251px] min-h-[180px] absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-card-background rounded-4xl border border-primary shadow-md p-2.5 md:p-4 lg:p-4 flex flex-col items-start">
          <div className="bg-primary text-dark text-center font-semibold rounded-full py-2 px-2 lg:py-2 lg:px-4 w-full mb-2 text-2xl lg:text-[1.75rem]">
            {discount}
          </div>

          <div className=" w-full p-2">
            <div className="flex flex-col items-start gap-0.5 px-2">
              <div className="text-base text-yellow font-semibold">{brand}</div>
              <h3 className="text-2xl font-semibold mb-4 truncate">{title}</h3>
            </div>

            <div className="hidden w-full lg:block">
              <AnimatedButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
