"use client";

import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { activeOfers } from "@/data/activeOfers";
import ActiveOfferCard from "@/components/ui/ActiveOfferCard";
import AdCard from "@/components/ui/AdCard";
import Banner from "@/components/ui/Banner";
import Container from "@/components/ui/Container";
import Footer from "@/components/ui/Footer";
import OfferFillter from "@/components/ui/OfferFillter";
import Pagination from "@/components/ui/Pagination";
import ViewMoreOffers from "@/components/ui/ViewMoreOffers";
import CategoryCardWraper from "@/componentWraper/CategoryCardWraper";
import { injectAdAtPosition, isAdPlaceholder } from "@/utils/injectAds";
import { useState, use } from "react";

interface SingleCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SingleCategoryPage({ params }: SingleCategoryPageProps) {
  // Unwrap params Promise
  const { id } = use(params);
  
  // Find category by slug (the id parameter is actually the slug)
  const category = categories.find((cat) => cat.slug === id);

  if (!category) {
    notFound();
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Filter active offers by categorySlug
  const categoryOffers = activeOfers.filter((offer) => offer.categorySlug === category.slug);

  // If no offers found for this category, show some sample offers
  const displayOffers = categoryOffers.length > 0 ? categoryOffers : activeOfers.slice(0, 8);

  // Dynamically inject ads only if there are at least 8 offers
  const shouldShowAds = displayOffers.length >= 8;
  const itemsWithAd = shouldShowAds ? injectAdAtPosition(displayOffers.slice(0, 8), 4) : displayOffers.slice(0, 8);
  const restOfItemsWithAd = shouldShowAds ? injectAdAtPosition(displayOffers.slice(8, 16), 4) : displayOffers.slice(8, 16);

  return (
    <div className="pb-4">
      <Banner className="border-primary" />
      <div className="w-full pl-8 sm:pl-12 lg:pl-24 xl:pl-[100px] 2xl:pl-[137px] max-w-[130rem] mx-auto">
        <CategoryCardWraper />
      </div>
      
     

      <Container className="w-[86%] md:w-[90%] lg:w-[86%] max-w-[112rem] mx-auto pb-24">
        <div className="pb-16">
          <OfferFillter
            offerType={`${category.name} Offers`}
            selectedFilters={[id]}
          />
        </div>

        {/* First Grid of Offers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {itemsWithAd.map((item, index) => {
            if (isAdPlaceholder(item)) {
              return (
                <AdCard
                  key={`ad-${index}`}
                  variant="active-offer"
                  className="w-full"
                />
              );
            }
            return (
              <ActiveOfferCard
                key={item.id}
                offer={item}
                className="w-full max-h-[38.25rem]"
              />
            );
          })}
        </div>
      </Container>

      {restOfItemsWithAd.length > 0 && (
        <>
          <Banner className="border-primary" />
          
          <Container className="w-[86%] md:w-[86%] max-w-[112rem] mx-auto py-[4.375rem] lg:py-[7.5rem]">
            {/* Second Grid of Offers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
              {restOfItemsWithAd.map((item, index) => {
                if (isAdPlaceholder(item)) {
                  return (
                    <AdCard
                      key={`ad-${index}`}
                      variant="active-offer"
                      className="w-full"
                    />
                  );
                }
                return (
                  <ActiveOfferCard
                    key={item.id}
                    offer={item}
                    className="w-full max-h-[38.25rem]"
                  />
                );
              })}
            </div>
          </Container>
        </>
      )}

      <Container className="w-[86%] md:w-[86%] max-w-[1524px] mx-auto pb-[4.375rem] lg:pb-[7.5rem]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>

      <div className="pb-[2rem]">
        <ViewMoreOffers />
      </div>
      
      <Footer />
    </div>
  );
}
