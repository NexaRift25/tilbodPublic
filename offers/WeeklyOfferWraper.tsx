import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import WeeklyOfferCard from "@/components/ui/WeeklyOfferCard";
import { weeklyOfers } from "@/data/weeklyOfers";
import { Fragment } from "react";

export default function WeeklyOfferWraper() {
  return (
    <div className="w-full lg:pt-[6.25rem] pt-[3rem]">
      <div className="flex justify-between items-center lg:py-[2.3rem] py-[1rem]">
        <h2 className="lg:text-5xl text-2xl font-semibold text-smoky-white">
          Weekly Deals
        </h2>
        <div className="theme-pink hidden md:block">
          <AnimatedLineButton category="weekday deals" />
        </div>
      </div>

      <ScrollableCarousel gap="gap-4 md:gap-6" className="pr-0">
        {weeklyOfers.map((offer, index) => (
          <Fragment key={offer.id}>
            <div className="">
              <WeeklyOfferCard offer={offer} />
            </div>
            {(index + 1) % 4 === 0 && <AdCard variant="weekly-offer" />}
          </Fragment>
        ))}
      </ScrollableCarousel>
      <div className="block md:hidden theme-pink">
        <AnimatedLineButton category="weekday deals" />
      </div>
    </div>
  );
}
