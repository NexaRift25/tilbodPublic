import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import WeeklyOfferCard from "@/components/ui/WeeklyOfferCard";
import { weeklyOfers } from "@/data/weeklyOfers";
import { Fragment } from "react";

export default function WeeklyOfferWraper() {
    return (
        <div className="w-full pt-[6.25rem]">
            <div className="flex justify-between items-center py-[2.3rem]">
                <h2 className="text-5xl font-semibold text-smoky-white">Weekly Deals</h2>
                <div className="theme-pink">
                    <AnimatedLineButton />
                </div>
            </div>
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