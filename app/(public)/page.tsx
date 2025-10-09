import Banner from "@/components/ui/Banner";
import CategoryCardWraper from "@/componentWraper/CategoryCardWraper";
import PromotionOffer from "@/components/ui/PromotionOffer";
import ActiveOfferWraper from "@/offers/ActiveOfferWraper";
import WeeklyOfferWraper from "@/offers/WeeklyOfferWraper";
import HappyOfferWraper from "@/offers/HappyOfferWraper";
import GiftOfferWraper from "@/offers/GiftOfferWraper";
import Footer from "@/components/ui/Footer";
import Container from "@/components/ui/Container";
import FadeUpSection from "@/components/ui/FadeUpSection";
export default function HomePage() {
  return (
    <div className="">
      <div className="pt-[2.5rem] pb-[4.375rem] lg:pb-[7.5rem]">
        <PromotionOffer />
      </div>
      <Banner className="border-primary" />

      <div className="w-full max-w-[118.75rem] mx-auto lg:pl-[137px]">
        <FadeUpSection>
          <CategoryCardWraper />
        </FadeUpSection>
        <FadeUpSection>
          <ActiveOfferWraper />
        </FadeUpSection>
        <FadeUpSection>
          <WeeklyOfferWraper />
        </FadeUpSection>
        <FadeUpSection>
          <HappyOfferWraper />
        </FadeUpSection>
        <FadeUpSection>
          <GiftOfferWraper />
        </FadeUpSection>
      </div>
      <Container className="w-full  max-w-[118.75rem] ">
        <FadeUpSection>
          <Footer />
        </FadeUpSection>
      </Container>
    </div>
  );
}
