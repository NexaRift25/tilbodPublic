import AdCard from "@/components/ui/AdCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import WeeklyOfferCard from "@/components/ui/WeeklyOfferCard";
import { weeklyOfers } from "@/data/weeklyOfers";
import { Fragment } from "react";

export default function WeeklyOfferWraper() {
    return (
        <div className="w-full">
            <ScrollableCarousel gap="gap-6" className="pr-0">
                {weeklyOfers.map((offer, index) => (
                    <Fragment key={offer.id}>
                        <div className="flex-shrink-0 snap-center">
                            <WeeklyOfferCard offer={offer} />
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