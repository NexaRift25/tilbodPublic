"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { categories } from "@/data/categories";
import { useTranslations } from 'next-intl';

export default function CategoryCardWraper() {
  const t = useTranslations();
  return (
    <div className="w-full pb-16 pt-24">
      <h2 className="text-2xl font-semibold text-smoky-white mb-1">
        {t('offers.whatKindOfOffer')}
      </h2>
      <ScrollableCarousel gap="gap-4 md:gap-6" className="pr-0">
        {categories.map((category) => (
          <div key={category.id} className="flex-shrink-0 snap-center">
            <CategoryCard category={category} />
          </div>
        ))}
      </ScrollableCarousel>
    </div>
  );
}
