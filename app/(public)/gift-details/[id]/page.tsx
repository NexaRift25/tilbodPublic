"use client";

import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { giftOfers } from "@/data/giftOfers";
import Container from "@/components/ui/Container";

interface GiftDetailsPageProps {
  params: {
    id: string;
  };
}

export default function GiftDetailsPage({ params }: GiftDetailsPageProps) {
  const giftOffer = giftOfers?.find((offer) => offer.id === parseInt(params.id));

  if (!giftOffer) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8 px-4 theme-orange">
      <Container className=" max-w-[118.75rem] w-[85%] mx-auto">
        {/* Main Card Container */}
        <div className=" overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Section - Content */}
            <div className="flex flex-col justify-between space-y-6">
              {/* Offer Tag */}
              <div className=" max-w-[322px] w-full  whitespace-nowrap justify-center inline-flex items-center px-4 py-2 rounded-[32px] border border-primary">
                <span className="text-white text-2xl font-medium">
                  {giftOffer.timeLeft}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-white text-3xl lg:text-4xl font-bold uppercase tracking-wide">
                {giftOffer.category}
              </h1>

              {/* Offer Summary */}
              <p className="text-primary text-2xl font-medium">
                {giftOffer.title}
              </p>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-white text-base leading-relaxed">
                  {giftOffer.description}
                </p>
                <p className="text-white text-base leading-relaxed">
                  Accommodation in a warm environment, a dining experience that
                  tickles the taste buds, and an adventure trip to Giljaböðin
                  are examples of gift certificates that are available.
                </p>
              </div>

              {/* Purchase Count */}
              <p className="text-yellow text-base font-medium">
                {giftOffer.purchaseCount} have taken advantage of the offer
              </p>

              {/* Price */}
              <div className="text-primary text-3xl font-bold">
                {giftOffer.price}
              </div>

              {/* Action Buttons */}
                <div className="flex xl:flex-row flex-col gap-4 w-full">
                <button className="flex justify-between max-w-[322px] w-full py-2 text-dark bg-primary rounded-[56px] text-xl 2xl:text-2xl items-center font-semibold border border-primary px-8    ">
                  <span>Gift Certificate</span>
                  <MoveRight size={32} />
                </button>
                <button className="flex justify-between max-w-[250px] w- gap-4 py-2 whitespace-nowrap text-primary rounded-[56px] text-xl 2xl:text-2xl items-center font-semibold border border-primary px-8    ">
                  <span>Add to cart</span>
                  <MoveRight size={32} />
                </button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="relative">
              <div className="relative rounded-3xl w-full border border-primary max-w-[719px] max-h-[632px] aspect-[719/632] h-full mx-auto">
                <Image
                  src={giftOffer.image}
                  alt={giftOffer.category}
                  fill
                  className="object-cover rounded-3xl "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
