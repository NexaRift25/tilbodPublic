import FadeUpSection from "@/components/ui/FadeUpSection";
import PromoCard from "@/components/ui/PromoCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { promoOffers } from "@/data/promoOffers";

export default function PromoCardWraper() {
    return (
        <div className="w-full">
            <FadeUpSection>
                <ScrollableCarousel gap="gap-6" className="pr-0">
                    {promoOffers.map((offer) => (
                        <div key={offer.id} className="flex-shrink-0 snap-center">
                            <PromoCard offer={offer} />
                        </div>
                    ))}
                </ScrollableCarousel>
            </FadeUpSection>
        </div>
    )
}