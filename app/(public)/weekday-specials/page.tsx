import WeeklyOfferCard from "@/components/ui/WeeklyOfferCard";
import AdCard from "@/components/ui/AdCard";
import Banner from "@/components/ui/Banner";
import Container from "@/components/ui/Container";
import { weeklyOfers } from "@/data/weeklyOfers";
import { injectAdAtPosition, isAdPlaceholder } from "@/utils/injectAds";

export default function WeeklyOffersPage() {
  // Dynamically inject ad at position 4 (5th position in grid)
  const itemsWithAd = injectAdAtPosition(weeklyOfers.slice(0, 8), 4);

  return (
    <div className="theme-pink">
      <Banner className="border-primary" />
      <Container className="w-[86%] md:w-[86%] max-w-[1524px] mx-auto py-[4.375rem] lg:py-[7.5rem]">
        {/* justify-items-center centers cards in their grid cells, gap-6 maintains 24px spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {itemsWithAd.map((item, index) => {
            // Check if item is an ad placeholder using type guard
            if (isAdPlaceholder(item)) {
              return (
                <AdCard
                  key={`ad-${index}`}
                  variant="weekly-offer"
                  className="w-full"
                />
              );
            }

            // Otherwise render offer card
            return (
              <WeeklyOfferCard key={item.id} offer={item} className="w-full" />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

