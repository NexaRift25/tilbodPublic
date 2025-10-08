import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import GiftOfferCard from "@/components/ui/GiftOfferCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { giftOfers } from "@/data/giftOfers";
import { Fragment } from "react";

export default function GiftOfferWraper() {
    return (
        <div className="w-full py-[100px]">
            <div className="flex justify-between items-center py-[2.3rem]">
                <h2 className="text-5xl font-semibold text-smoky-white">Gift Certificate</h2>
                <div className="theme-orange">
                    <AnimatedLineButton />
                </div>
            </div>
            <ScrollableCarousel gap="gap-6" className="pr-0">
                {giftOfers.map((offer, index) => (
                    <Fragment key={offer.id}>
                        <div className="flex-shrink-0 snap-center">
                            <GiftOfferCard offer={offer} />
                        </div>
                        {(index + 1) % 4 === 0 && (
                            <AdCard />
                        )}
                    </Fragment>
                ))}
            </ScrollableCarousel>
        </div>
    )
}
