import Banner from "@/components/ui/Banner";
import CategoryCard from "@/components/ui/CategoryCard";
import PromotionOffer from "@/components/ui/PromotionOffer";
import ActiveOfferWraper from "@/offers/ActiveOfferWraper";
import WeeklyOfferWraper from "@/offers/WeeklyOfferWraper";
import HappyOfferWraper from "@/offers/HappyOfferWraper";
import GiftOfferWraper from "@/offers/GiftOfferWraper";
export default function HomePage() {
    return (
        <div>
            <PromotionOffer />
            <Banner className="border-primary" />
            <CategoryCard />
            <ActiveOfferWraper />
            <WeeklyOfferWraper />
            <HappyOfferWraper />
            <GiftOfferWraper />
        </div>
    )
}