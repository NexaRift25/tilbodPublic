import { MoveRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import { cn } from "@/lib/utils";

interface GiftOffer {
  id: number;
  offerType: string;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  timeLeft: string;
  purchaseCount: number;
  link: string;
}

interface GiftOfferCardProps {
  offer: GiftOffer;
  className?: string;
}

export default function GiftOfferCard({ offer, className }: GiftOfferCardProps) {
  const {
    title,
    price,
    description,
    image,
    category,
    timeLeft,
    purchaseCount,
    link,
  } = offer;

  return (
    <div className="theme-orange">
      <div className={cn(
        "w-full min-h-[30rem] h-[30rem] sm:h-[33rem] md:h-[38.75rem] relative overflow-hidden border border-primary rounded-[2.5rem] bg-card-background mx-auto",
        className
      )}>
        {/* Price Banner */}
        <div className="bg-primary absolute left-[1rem] right-[1rem] top-[1rem] z-30 flex select-none items-center justify-center rounded-full py-[0.375rem] h-[2.5rem] md:h-[3.5rem] w-auto bg-offer-banner">
          <span className="text-xl md:text-[1.75rem] font-semibold text-dark truncate">
            {price}
          </span>
        </div>

        {/* Main Image */}
        <div className="relative h-[12.5rem] w-full bg-card-background sm:h-[15rem] border-b border-primary">
          <img
            src={image}
            alt={title}
            className="pointer-events-none relative z-10 select-none object-cover w-full h-full"
          />
          {/* Time Left Indicator */}
          <div className="min-w-[9rem] text-center absolute bottom-0 left-1/2 z-40 -translate-x-1/2 transform">
            <div className="whitespace-nowrap rounded-t-3xl text-sm shadow-lg px-[2rem] py-[0.34375rem] font-semibold lg:text-base border border-b-0 bg-card-background text-smoky-white border-primary truncate">
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Bottom Content Overlay */}
        <div className="z-30 p-[1rem] md:p-[1.5rem] flex flex-col justify-between sm:rounded-b-3xl bg-card-background">
          {/* Content Section */}
          <div className="pointer-events-none flex-1">
            <div className=" border-b border-primary">
              {/* Category */}
              <div className="text-xs font-semibold sm:text-base text-yellow">
                {category}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold lg:text-2xl text-smoky-white mb-2 lg:mb-4 truncate">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="h-[9.99rem] w-full text-sm md:text-base text-smoky-white pt-4 font-medium">
              {description}
            </p>
          </div>

          {/* Purchase Count - Absolute positioned */}
          <div className="truncate absolute bottom-[5.50rem] md:bottom-[6.5rem] left-[1.5rem] right-[1.5rem] text-smoky-white text-sm md:text-base font-medium">
            <p>
              {purchaseCount} have taken <span className="hidden md:inline">advantage of the offer</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-[1.5rem] left-[1.5rem] right-[1.5rem] flex flex-col gap-2">
            {/* View Offer Button */}
            <AnimatedButton />
          </div>
        </div>
      </div>
    </div>
  );
}
