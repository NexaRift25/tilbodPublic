import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import GiftOfferCard from "@/components/ui/GiftOfferCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { giftOfers } from "@/data/giftOfers";
import { Fragment } from "react";

export default function GiftOfferWraper() {
    return (
        <div className="w-full lg:py-[100px] py-[3rem]">
            <div className="flex justify-between items-center lg:py-[2.3rem] py-[1rem]">
                <h2 className="lg:text-5xl text-2xl font-semibold text-smoky-white">
                    Gift Certificate
                </h2>
                <div className="theme-orange hidden md:block">
                    <AnimatedLineButton category="gift certificate" />
                </div>
            </div>

            <ScrollableCarousel gap="gap-4 md:gap-6" className="pr-0 theme-orange">
                {giftOfers.map((offer, index) => (
                    <Fragment key={offer.id}>
                        <div className="">
                            <GiftOfferCard offer={offer} />
                        </div>
                        {(index + 1) % 4 === 0 && <AdCard variant="gift-card" />}
                    </Fragment>
                ))}
            </ScrollableCarousel>
            <div className="block md:hidden theme-orange">
                <AnimatedLineButton category="gift certificate" />
            </div>
        </div>
    )
}
