import Banner from "@/components/ui/Banner";
import CategoryCard from "@/components/ui/CategoryCard";
import PromotionOffer from "@/components/ui/PromotionOffer";
import ActiveOfferWraper from "@/offers/ActiveOfferWraper";
import WeeklyOfferWraper from "@/offers/WeeklyOfferWraper";
import HappyOfferWraper from "@/offers/HappyOfferWraper";
import GiftOfferWraper from "@/offers/GiftOfferWraper";
import Footer from "@/components/ui/Footer";
import Container from "@/components/ui/Container";
export default function HomePage() {
    return (
        <div className="">
            <PromotionOffer />
            <Banner className="border-primary" />
            <CategoryCard />
            <div
                className="w-full max-w-[118.75rem] mx-auto pl-4 sm:pl-6 lg:pl-8"
            >
                <ActiveOfferWraper />
                <WeeklyOfferWraper />
                <HappyOfferWraper />
                <GiftOfferWraper />
            </div>
            <Container className="w-full max-w-[118.75rem] pl-8 pr-20">
                <Footer />
            </Container>
        </div>
    )
}