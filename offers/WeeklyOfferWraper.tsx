import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import WeeklyOfferCard from "@/components/ui/WeeklyOfferCard";
import { weeklyOfers } from "@/data/weeklyOfers";
import { injectAds, isAdPlaceholder } from "@/utils/injectAds";

export default function WeeklyOfferWraper() {
  // Inject ads after every 4th item (positions 3, 7, 11, etc.)
  const adPositions = Array.from(
    { length: Math.floor(weeklyOfers.length / 4) },
    (_, i) => (i + 1) * 4 - 1
  );
  const itemsWithAds = injectAds(weeklyOfers, adPositions);

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

      <ScrollableCarousel gap="gap-4 md:gap-6" className="pr-0 theme-pink">
        {itemsWithAds.map((item, index) => {
          // Render ad card
          if (isAdPlaceholder(item)) {
            return (
              <AdCard 
                key={`ad-${index}`} 
                variant="weekly-offer"
                className="flex-shrink-0 snap-center w-[17.625rem] md:w-[18.75rem] lg:w-[25rem] xl:w-[25.625rem]"
              />
            );
          }

          // Render offer card
          return (
            <div key={item.id} className="flex-shrink-0 snap-center">
              <WeeklyOfferCard 
                offer={item}
                className="w-[17.625rem] md:w-[18.75rem] lg:w-[25rem] xl:w-[25.625rem]"
              />
            </div>
          );
        })}
      </ScrollableCarousel>
      <div className="block md:hidden theme-pink">
        <AnimatedLineButton category="weekday deals" />
      </div>
    </div>
  );
}
