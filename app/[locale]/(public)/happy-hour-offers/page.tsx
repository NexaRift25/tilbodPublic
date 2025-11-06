"use client";

import HappyHourOfferCard from "@/components/ui/HappyHourOfferCard";
import AdCard from "@/components/ui/AdCard";
import Banner from "@/components/ui/Banner";
import Container from "@/components/ui/Container";
import Footer from "@/components/ui/Footer";
import OfferFillter from "@/components/ui/OfferFillter";
import Pagination from "@/components/ui/Pagination";
import ViewMoreOffers from "@/components/ui/ViewMoreOffers";
import CategoryCardWraper from "@/componentWraper/CategoryCardWraper";
import { happyHourOfers } from "@/data/happyHourOfers";
import { injectAdAtPosition, isAdPlaceholder } from "@/utils/injectAds";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface FilterState {
  sort: string;
  category: string;
  location: string;
  when: string;
}

export default function HappyHourOffersPage() {
  const t = useTranslations();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    sort: "",
    category: "",
    location: "",
    when: "",
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
    // Here you would typically filter your data based on the new filters
    console.log("Happy Hour Offers filters changed:", newFilters);
  };

  // Dynamically inject ad at position 4 (5th position in grid)
  const itemsWithAd = injectAdAtPosition(happyHourOfers.slice(0, 8), 4);
  const restOfItemsWithAd = injectAdAtPosition(happyHourOfers.slice(8, 16), 4);

  return (
    <div>
      <div className="pb-4 theme-green">
        <Banner className="border-primary" />
        <div className="w-full pl-8 sm:pl-12 lg:pl-24 xl:pl-[100px] 2xl:pl-[137px] max-w-[130rem] mx-auto">
          <CategoryCardWraper />
        </div>
        <Container className="w-[86%] md:w-[90%] lg:w-[86%] max-w-[112rem] mx-auto pb-24">
          <div className="pb-16">
            <OfferFillter
              offerType={t('offers.happyHourOffers')}
              onFilterChange={handleFilterChange}
            />
          </div>
          {/* justify-items-center centers cards in their grid cells, gap-6 maintains 24px spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {itemsWithAd.map((item, index) => {
              // Check if item is an ad placeholder using type guard
              if (isAdPlaceholder(item)) {
                return (
                  <AdCard
                    key={`ad-${index}`}
                    variant="happy-hour"
                    className="w-full"
                  />
                );
              }

              // Otherwise render offer card
              return (
                <HappyHourOfferCard
                  key={item.id}
                  offer={item}
                  className="w-full max-h-[38.25rem]"
                />
              );
            })}
          </div>
        </Container>
        <Banner className="border-primary" />
        <Container className="w-[86%] md:w-[86%] max-w-[112rem] mx-auto py-[4.375rem] lg:py-[7.5rem]">
          {/* justify-items-center centers cards in their grid cells, gap-6 maintains 24px spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {restOfItemsWithAd.map((item, index) => {
              // Check if item is an ad placeholder using type guard
              if (isAdPlaceholder(item)) {
                return (
                  <AdCard
                    key={`ad-${index}`}
                    variant="happy-hour"
                    className="w-full"
                  />
                );
              }

              // Otherwise render offer card
              return (
                <HappyHourOfferCard
                  key={item.id}
                  offer={item}
                  className="w-full max-h-[38.25rem]"
                />
              );
            })}
          </div>
        </Container>
        <Container className="w-[86%] md:w-[86%] max-w-[1524px] mx-auto pb-[4.375rem] lg:pb-[7.5rem]">
          <Pagination
            currentPage={currentPage}
            totalPages={40}
            onPageChange={setCurrentPage}
          />
        </Container>
        <div className="pb-[2rem]">
          <ViewMoreOffers />
        </div>
      </div>
        <Footer />
    </div>
  );
}
