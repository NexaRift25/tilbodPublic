import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import HappyHourOfferCard from "@/components/ui/HappyHourOfferCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { happyHourOfers } from "@/data/happyHourOfers";
import { Fragment } from "react";

export default function HappyOfferWraper() {
    return (
        <div className="w-full pt-[6.25rem]">
            <div className="flex justify-between items-center py-[2.3rem]">
                <h2 className="text-5xl font-semibold text-smoky-white">Happy Hour </h2>
                <div className="theme-green">
                    <AnimatedLineButton category="happy hour" />
                </div>
            </div>
            <ScrollableCarousel gap="gap-6" className="pr-0">
                {happyHourOfers.map((offer, index) => (
                    <Fragment key={offer.id}>
                        <div className="flex-shrink-0 snap-center">
                            <HappyHourOfferCard offer={offer} />
                        </div>
                        {(index + 1) % 4 === 0 && (
                            <AdCard variant="happy-hour" />
                        )}
                    </Fragment>
                ))}
            </ScrollableCarousel>
        </div>
    )
}