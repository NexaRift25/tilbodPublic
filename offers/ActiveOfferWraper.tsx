import ActiveOfferCard from "@/components/ui/ActiveOfferCard";
import AdCard from "@/components/ui/AdCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { activeOfers } from "@/data/activeOfers";
import { Fragment } from "react";

export default function ActiveOfferWraper() {
    return (
        <div className="w-full">
            <ScrollableCarousel gap="gap-6" className="pr-0">
                {activeOfers.map((offer, index) => (
                    <Fragment key={offer.id}>
                        <div className="flex-shrink-0 snap-center">
                            <ActiveOfferCard offer={offer} />
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