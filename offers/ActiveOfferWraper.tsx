import ActiveOfferCard from "@/components/ui/ActiveOfferCard";
import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { activeOfers } from "@/data/activeOfers";
import { Fragment } from "react";

export default function ActiveOfferWraper() {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center py-[2.3rem]">
                <h2 className="text-5xl font-semibold text-smoky-white">Active Offers</h2>
                <AnimatedLineButton category="active offers" />
            </div>
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