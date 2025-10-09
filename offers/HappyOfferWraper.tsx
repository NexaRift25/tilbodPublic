import AdCard from "@/components/ui/AdCard";
import AnimatedLineButton from "@/components/ui/AnimatedLineButton";
import HappyHourOfferCard from "@/components/ui/HappyHourOfferCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { happyHourOfers } from "@/data/happyHourOfers";
import { Fragment } from "react";

export default function HappyOfferWraper() {
    return (
        <div className="w-full lg:pt-[6.25rem] pt-[3rem]">
            <div className="flex justify-between items-center lg:py-[2.3rem] py-[1rem]">
                <h2 className="lg:text-5xl text-2xl font-semibold text-smoky-white">
                    Happy Hour
                </h2>
                <div className="theme-green hidden md:block">
                    <AnimatedLineButton category="happy hour" />
                </div>
            </div>

            <ScrollableCarousel gap="gap-4 md:gap-6" className="pr-0">
                {happyHourOfers.map((offer, index) => (
                    <Fragment key={offer.id}>
                        <div className="">
                            <HappyHourOfferCard offer={offer} />
                        </div>
                        {(index + 1) % 4 === 0 && <AdCard variant="happy-hour" />}
                    </Fragment>
                ))}
            </ScrollableCarousel>
            <div className="block md:hidden theme-green">
                <AnimatedLineButton category="happy hour" />
            </div>
        </div>
    )
}