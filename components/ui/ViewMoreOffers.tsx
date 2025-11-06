"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import Container from "./Container";
import MenuLinkButton from "./MenuLinkButton";

export default function ViewMoreOffers() {
  const t = useTranslations();
  const pathname = usePathname();
  const offerPaths = [
    {
      path: "/active-offers",
      title: t('offers.activeOffers'),
    },
    {
      path: "/weekday-specials",
      title: t('offers.weekdayDeals'),
    },
    {
      path: "/happy-hour-offers",
      title: t('offers.happyHourOffers'),
    },
    {
      path: "/gift-certificates",
      title: t('offers.giftCertificate'),
    },
  ];

  // Check if current page is gift-details
  const isGiftDetailsPage = pathname?.startsWith('/gift-details');
  
  // Filter out the current page or gift-certificates when on gift-details page
  const filteredPaths = offerPaths.filter(path => {
    // If on gift-details page, exclude gift-certificates
    if (isGiftDetailsPage && path.path === '/gift-certificates') {
      return false;
    }
    // Exclude current page
    return path.path !== pathname;
  });

  return (
    <Container className="max-w-[118.75rem] w-[85%]">
      <div className="my-4 p-8 lg:p-16 space-y-12 sm:my-6 lg:my-8 rounded-[3rem] border border-solid border-primary bg-card-background">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-smoky-white">
          {t('offers.viewMoreOffers')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-[90%] 2xl:w-[70%]">
          {filteredPaths.map((path, index) => (
            <MenuLinkButton
              key={index}
              nav={{ title: path.title, link: path.path }}
              isActive={false}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
