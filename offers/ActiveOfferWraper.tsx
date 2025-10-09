import ActiveOfferCard from "@/components/ui/ActiveOfferCard";
import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { activeOfers } from "@/data/activeOfers";
import { div } from "framer-motion/client";
import { Fragment } from "react";

export default function ActiveOfferWraper() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center lg:py-[2.3rem] py-[1rem]">
        <h2 className="lg:text-5xl text-2xl font-semibold text-smoky-white">
          Active Offers
        </h2>
        <div className="hidden md:block">
          <AnimatedLineButton category="active offers" />
        </div>
      </div>
      <ScrollableCarousel gap=" gap-4 md:gap-6" className="pr-0">
        {activeOfers.map((offer, index) => (
          <Fragment key={offer.id}>
            <div className="flex-shrink-0 snap-center">
              <ActiveOfferCard offer={offer} className="max-w-[25.625rem] min-w-[282px] w-[282px] md:w-[300px] lg:w-[400px] xl:w-[410px]" />
            </div>
            {(index + 1) % 4 === 0 && <AdCard variant="active-offer" />}
          </Fragment>
        ))}
      </ScrollableCarousel>
      <div className="block md:hidden">
        <AnimatedLineButton category="active offers" />
      </div>
    </div>
  );
}
