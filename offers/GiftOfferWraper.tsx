import AdCard from "@/components/ui/AdCard";
import GiftOfferCard from "@/components/ui/GiftOfferCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { giftOfers } from "@/data/giftOfers";
import { Fragment } from "react";

export default function GiftOfferWraper() {
    return (
        <div className="w-full">
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
