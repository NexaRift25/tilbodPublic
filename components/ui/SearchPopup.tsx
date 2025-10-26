"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import { activeOfers } from "@/data/activeOfers";
import { giftOfers } from "@/data/giftOfers";
import { happyHourOfers } from "@/data/happyHourOfers";
import { weeklyOfers } from "@/data/weeklyOfers";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const SearchPopup: React.FC<SearchPopupProps> = ({
  isOpen,
  onClose,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const dayNames = ["Mán", "Þri", "Mið", "Fim", "Fös", "Lau", "Sun"];

  // Combine all offers for search
  const allOffers = [
    ...activeOfers.map(offer => ({ ...offer, type: "active" })),
    ...giftOfers.map(offer => ({ ...offer, type: "gift" })),
    ...happyHourOfers.map(offer => ({ ...offer, type: "happy-hour" })),
    ...weeklyOfers.map(offer => ({ ...offer, type: "weekly" })),
  ];

  // Filter offers based on search query
  const filteredOffers = searchQuery.trim() 
    ? allOffers.filter(offer => 
        offer.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ('category' in offer && offer.category?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        offer.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10)
    : happyHourOfers.slice(0, 4).map(offer => ({ ...offer, type: "happy-hour" }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Search Popup */}
          <motion.div
            className={`max-w-[1728px] w-[92%] md:w-[80%] absolute left-1/2 -translate-x-1/2 top-[100px] bottom-4 border border-primary rounded-[20px] z-50 flex flex-col bg-[#1f2233] ${className}`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 300,
              damping: 40,
            }}
          >
            {/* Search Header */}
            <div className="w-full flex-shrink-0">
              <div className="mx-auto w-[calc(100%-40px)] m-4">
                <p className="text-white text-lg font-bold mb-3">Search</p>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-2 border border-primary p-4 sm:p-5 rounded-[20px]">
                  <h2 className="text-white text-lg sm:text-[24px] font-bold">
                    Happy hour tilboð
                  </h2>
                  <Link
                    href="/happy-hour-offers"
                    onClick={onClose}
                    className="w-full sm:w-[220px] flex items-center justify-between text-primary text-sm sm:text-[18px] font-bold border border-primary rounded-[32px] px-3 sm:px-4 py-2 hover:bg-primary hover:text-dark transition-colors"
                  >
                    Skoða síðu
                    <MoveRight className="text-2xl sm:text-[36px]" />
                  </Link>
                </div>
              </div>
              <p className="text-white text-xs font-bold px-4 sm:px-5 py-1">
                Tilboð
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5">
              <div className="w-full space-y-3 sm:space-y-5">
                {filteredOffers?.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 border border-primary p-4 sm:p-5 rounded-[20px]"
                  >
                    <div className="flex items-center gap-3 sm:gap-6 flex-1">
                      {/* Image */}
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        width={100}
                        height={100}
                        className="w-[42px] h-[40px] object-cover border border-primary/50 rounded-[4px]"
                      />

                      {/* Bar Info */}
                      <div>
                        <p className="text-white text-sm md:text-base font-bold">
                          {'status' in offer ? offer.status : "Open now"}
                        </p>
                        <h3 className="text-white text-base sm:text-lg font-bold">
                          {offer.title}
                        </h3>
                      </div>

                      {/* Price */}
                      <div>
                        <p className="text-white text-sm md:text-base font-bold">
                          {'discount' in offer ? offer.discount : 'pricing' in offer ? offer.pricing : "Verð"}
                        </p>
                        <p className="text-primary text-xs sm:text-sm lg:text-base font-bold">
                          {'price' in offer ? offer.price : 'pricing' in offer ? offer.pricing : "800kr. bjór / 1000kr. vín"}
                        </p>
                      </div>
                    </div>

                    {/* Time and Days */}
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <p className="text-white text-xs sm:text-sm lg:text-base font-bold">
                        Gildir {'time' in offer ? offer.time : 'timeLeft' in offer ? offer.timeLeft : "19:00 - 21:00"}
                      </p>
                      <div className="flex flex-wrap items-center gap-1">
                        {'availableDays' in offer && offer.availableDays ? (
                          dayNames.map((day) => (
                            <p
                              key={day}
                              className={`rounded w-[32px] h-[18px] theme-green text-center text-sm font-semibold ${
                                offer.availableDays.some((d: string) => d.toLowerCase().includes(day.toLowerCase().substring(0, 3)))
                                  ? "text-dark bg-primary"
                                  : "text-gray-400 theme-green bg-gray-700"
                              }`}
                            >
                              {day}
                            </p>
                          ))
                        ) : (
                          dayNames.map((day) => (
                            <p
                              key={day}
                              className="text-dark theme-green bg-primry rounded w-[32px] h-[16px] text-center text-base font-semibold"
                            >
                              {day}
                            </p>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/${offer.type === "happy-hour" ? "happy-hour-offers" : offer.type === "gift" ? "gift-certificates" : offer.type === "weekly" ? "weekday-specials" : "active-offers"}`}
                      onClick={onClose}
                      className="w-full lg:w-[220px] flex items-center justify-between text-primary text-sm sm:text-[18px] font-bold border border-primary rounded-[32px] px-3 sm:px-4 py-2 hover:bg-primary hover:text-dark transition-colors"
                    >
                      Skoða tilboð
                      <MoveRight className="text-xl sm:text-2xl" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer - View All Button */}
            <div className="w-full flex-shrink-0 px-4 sm:px-5 py-4 border-t border-primary/20">
              <div className="w-full">
                <Link
                  href="/active-offers"
                  onClick={onClose}
                  className="w-full sm:w-[220px] flex items-center justify-between text-primary text-sm sm:text-[16px] font-bold border-b border-primary border-solid px-3 sm:px-4 py-2 hover:bg-primary/10 transition-colors"
                >
                  Skoða öll tilboð
                  <MoveRight className="text-xl sm:text-2xl" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup;

