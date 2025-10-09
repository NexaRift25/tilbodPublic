import ActiveOfferCard from "@/components/ui/ActiveOfferCard";
import Banner from "@/components/ui/Banner";
import Container from "@/components/ui/Container";
import { activeOfers } from "@/data/activeOfers";

export default function ActiveOffersPage() {
  return (
    <div>
      <Banner className="border-primary" />
      <Container className="w-[86%] md:w-[86%] max-w-[1524px] mx-auto py-[4.375rem] lg:py-[7.5rem]">
        {/* justify-items-center centers cards in their grid cells, gap-8 maintains 32px spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {activeOfers.map((offer) => (
            <ActiveOfferCard
              key={offer.id}
              offer={offer}
              className="w-full "
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
