"use client";

import ActiveOfferCard from "@/components/ui/ActiveOfferCard";
import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { activeOfers } from "@/data/activeOfers";
import { injectAds, isAdPlaceholder } from "@/utils/injectAds";
import { useTranslations } from 'next-intl';

export default function ActiveOfferWraper() {
  const t = useTranslations();
  // Inject ads after every 4th item (positions 3, 7, 11, etc.)
  const adPositions = Array.from(
    { length: Math.floor(activeOfers.length / 4) },
    (_, i) => (i + 1) * 4 - 1
  );
  const itemsWithAds = injectAds(activeOfers, adPositions);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center lg:py-[2.3rem] py-[1rem]">
        <h2 className="lg:text-5xl text-2xl font-semibold text-smoky-white">
          {t('offers.activeOffers')}
        </h2>
        <div className="hidden md:block">
          <AnimatedLineButton category={t('offers.activeOffers')} />
        </div>
      </div>
      <ScrollableCarousel gap=" gap-4 md:gap-6" className="pr-0">
        {itemsWithAds.map((item, index) => {
          // Render ad card
          if (isAdPlaceholder(item)) {
            return (
              <AdCard 
                key={`ad-${index}`} 
                variant="active-offer"
                className="flex-shrink-0 snap-center w-[17.625rem] md:w-[18.75rem] lg:w-[25rem] xl:w-[25.625rem]"
              />
            );
          }

          // Render offer card
          return (
            <div key={item.id} className="flex-shrink-0 snap-center">
              <ActiveOfferCard 
                offer={item} 
                className="max-w-[25.625rem] min-w-[17.625rem] w-[17.625rem] md:w-[18.75rem] lg:w-[25rem] xl:w-[25.625rem]" 
              />
            </div>
          );
        })}
      </ScrollableCarousel>
      <div className="block md:hidden">
        <AnimatedLineButton category={t('offers.activeOffers')} />
      </div>
    </div>
  );
}
