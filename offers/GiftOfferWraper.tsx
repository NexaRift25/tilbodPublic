"use client";

import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import GiftOfferCard from "@/components/ui/GiftOfferCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { giftOfers } from "@/data/giftOfers";
import { injectAds, isAdPlaceholder } from "@/utils/injectAds";
import { useTranslations } from 'next-intl';

export default function GiftOfferWraper() {
    const t = useTranslations();
    // Inject ads after every 4th item (positions 3, 7, 11, etc.)
    const adPositions = Array.from(
        { length: Math.floor(giftOfers.length / 4) },
        (_, i) => (i + 1) * 4 - 1
    );
    const itemsWithAds = injectAds(giftOfers, adPositions);

    return (
        <div className="w-full lg:py-[6.25rem] py-[3rem]">
            <div className="flex justify-between items-center lg:py-[2.3rem] py-[1rem]">
                <h2 className="lg:text-5xl text-2xl font-semibold text-smoky-white">
                    {t('offers.giftCertificate')}
                </h2>
                <div className="theme-orange hidden md:block">
                    <AnimatedLineButton category={t('offers.giftCertificate')} />
                </div>
            </div>

            <ScrollableCarousel gap="gap-4 md:gap-6" className="pr-0 theme-orange">
                {itemsWithAds.map((item, index) => {
                    // Render ad card
                    if (isAdPlaceholder(item)) {
                        return (
                            <AdCard 
                                key={`ad-${index}`} 
                                variant="gift-card"
                                className="flex-shrink-0 snap-center w-[17.625rem] md:w-[18.75rem] lg:w-[25rem] xl:w-[25.625rem]"
                            />
                        );
                    }

                    // Render offer card
                    return (
                        <div key={item.id} className="flex-shrink-0 snap-center">
                            <GiftOfferCard 
                                offer={item}
                                className="w-[17.625rem] md:w-[18.75rem] lg:w-[25rem] xl:w-[25.625rem] max-h-[30rem] md:max-h-[37.5rem] lg:max-h-[39.0625rem]"
                            />
                        </div>
                    );
                })}
            </ScrollableCarousel>
            <div className="block md:hidden theme-orange">
                <AnimatedLineButton category={t('offers.giftCertificate')} />
            </div>
        </div>
    )
}
