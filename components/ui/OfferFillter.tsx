"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';

interface FilterState {
  sort: string;
  category: string;
  location: string;
  when: string;
}

interface OfferFillterProps {
  offerType: string;
  onFilterChange?: (filters: FilterState) => void;
}

export default function OfferFillter({
  offerType,
  onFilterChange,
}: OfferFillterProps) {
  const t = useTranslations();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Set default filters based on offer type
  const getDefaultFilters = () => {
    const activeOffers = t('offers.activeOffers');
    const giftCertificates = t('offers.giftCertificates');
    const weekdaySpecials = t('offers.weekdaySpecials');
    const happyHourOffers = t('offers.happyHourOffers');
    
    switch (offerType) {
      case "Active Offers":
      case activeOffers:
        return { sort: "popular", category: "all", location: "", when: "" };
      case "Gift Certificates":
      case giftCertificates:
        return { sort: "popular", category: "all", location: "", when: "" };
      case "Weekday Specials":
      case weekdaySpecials:
        return { sort: "", category: "all", location: "", when: "today" };
      case "Happy Hour Offers":
      case happyHourOffers:
        return { sort: "", category: "", location: "", when: "now" };
      default:
        return { sort: "", category: "", location: "", when: "" };
    }
  };

  const [currentFilters, setCurrentFilters] = useState(getDefaultFilters());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Define filter options based on offer type
  const getFilterOptions = () => {
    const activeOffers = t('offers.activeOffers');
    const giftCertificates = t('offers.giftCertificates');
    const weekdaySpecials = t('offers.weekdaySpecials');
    const happyHourOffers = t('offers.happyHourOffers');
    
    switch (offerType) {
      case "Active Offers":
      case activeOffers:
        return {
          sort: [
            { value: "popular", label: t('filters.mostPopular') },
            { value: "price-low", label: t('filters.priceLow') },
            { value: "price-high", label: t('filters.priceHigh') },
            { value: "newest", label: t('filters.newestOffer') },
            { value: "last-chance", label: t('filters.lastChance') },
            { value: "highest-discount", label: t('filters.highestDiscount') },
          ],
          category: [
            { value: "all", label: t('filters.allOffers') },
            { value: "spa", label: t('filters.spa') },
            { value: "hotel", label: t('filters.hotel') },
            { value: "restaurants", label: t('filters.restaurants') },
            { value: "activity", label: t('filters.activity') },
          ],
        };
      case "Gift Certificates":
      case giftCertificates:
        return {
          sort: [
            { value: "popular", label: t('filters.mostPopular') },
            { value: "price-low", label: t('filters.priceLow') },
            { value: "price-high", label: t('filters.priceHigh') },
            { value: "newest", label: t('filters.newestOffer') },
            { value: "last-chance", label: t('filters.lastChance') },
          ],
          category: [
            { value: "all", label: t('filters.allOffers') },
            { value: "spa", label: t('filters.spa') },
            { value: "hotel", label: t('filters.hotel') },
            { value: "restaurants", label: t('filters.restaurants') },
            { value: "activity", label: t('filters.activity') },
          ],
        };
      case "Weekday Specials":
      case weekdaySpecials:
        return {
          when: [
            { value: "today", label: t('filters.today') },
            { value: "now", label: t('filters.now') },
            { value: "lunch", label: t('filters.lunchTime') },
            { value: "tonight", label: t('filters.tonight') },
          ],
          category: [
            { value: "all", label: t('filters.allOffersWeekday') },
            { value: "food", label: t('filters.food') },
            { value: "activity", label: t('filters.activity') },
          ],
          location: [
            { value: "near-me", label: t('filters.nearMe') },
            { value: "capital", label: t('filters.capitalArea') },
            { value: "south", label: t('filters.southIceland') },
            { value: "north", label: t('filters.northIceland') },
            { value: "east", label: t('filters.eastIceland') },
            { value: "west", label: t('filters.westIceland') },
          ],
        };
      case "Happy Hour Offers":
      case happyHourOffers:
        return {
          when: [
            { value: "now", label: t('filters.nowIcelandic') },
            { value: "all-day", label: t('filters.allDay') },
            { value: "tonight", label: t('filters.tonightIcelandic') },
          ],
          location: [
            { value: "near-me", label: t('filters.nearMe') },
            { value: "capital", label: t('filters.capitalArea') },
            { value: "south", label: t('filters.southIceland') },
            { value: "north", label: t('filters.northIceland') },
            { value: "east", label: t('filters.eastIceland') },
            { value: "west", label: t('filters.westIceland') },
          ],
        };
      default:
        return {};
    }
  };

  const filterOptions = getFilterOptions();
  const availableFilters = Object.keys(filterOptions);

  const handleFilterSelect = (filterType: string, value: string) => {
    const newFilters = { ...currentFilters, [filterType]: value };
    setCurrentFilters(newFilters);
    setActiveDropdown(null);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const getFilterLabel = (filterType: string) => {
    const value = currentFilters[filterType as keyof typeof currentFilters];
    if (!value) {
      // Show default labels for each filter type
      switch (filterType) {
        case "sort": return t('filters.sort');
        case "when": return t('filters.when');
        case "category": return t('filters.category');
        case "location": return t('filters.location');
        default: return filterType;
      }
    }
    
    const options = filterOptions[filterType as keyof typeof filterOptions];
    const option = options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="w-full max-w-[74.5rem] space-y-[36px]">
      {/* Title */}
      <h3 className="text-smoky-white text-xl md:text-2xl lg:text-5xl font-semibold">
        {offerType}
      </h3>
      
      {/* Filter Buttons Row */}
      <div className="flex lg:flex-row flex-col md:flex-row gap-3 sm:gap-4" ref={dropdownRef}>
        {availableFilters.map((filterType) => (
          <div key={filterType} className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === filterType ? null : filterType)}
              className="flex items-center justify-between w-[298px] h-[56px] rounded-[32px] border border-primary bg-transparent px-8 py-4 hover:bg-primary/10 transition-all duration-200 cursor-pointer active:scale-95 active:bg-primary/20"
            >
              <span className="text-base font-semibold text-primary">
                {getFilterLabel(filterType)}
              </span>
              <div className="flex-shrink-0 text-primary">
                <ChevronDown className={`transition-transform ${activeDropdown === filterType ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-2 w-[298px] bg-card-background border border-primary rounded-[16px] shadow-lg z-50 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-300 ease-in-out ${
              activeDropdown === filterType 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}>
                {filterOptions[filterType as keyof typeof filterOptions]?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterSelect(filterType, option.value)}
                    className="w-full text-left px-6 py-3 hover:bg-primary/10 transition-all duration-200 first:rounded-t-[16px] last:rounded-b-[16px] cursor-pointer active:scale-98 active:bg-primary/20"
                  >
                    <span className="text-base font-semibold text-primary">
                      {option.label}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Filter Tags Row */}
      {Object.values(currentFilters).some(filter => filter !== "") && (
        <div className="flex flex-wrap gap-4">
          {Object.entries(currentFilters).map(([filterType, value]) => {
            if (!value) return null;
            
            const options = filterOptions[filterType as keyof typeof filterOptions];
            const option = options?.find(opt => opt.value === value);
            const label = option?.label || value;

            return (
              <div
                key={`${filterType}-${value}`}
                className="flex items-center gap-4 rounded-[24px] border border-primary bg-transparent px-6 py-1.5 animate-in slide-in-from-top-2 fade-in-0 duration-300"
              >
                <span className="text-base font-semibold text-smoky-white">
                  {label}
                </span>
                <button
                  onClick={() => {
                    const newFilters = { ...currentFilters, [filterType]: "" };
                    setCurrentFilters(newFilters);
                    if (onFilterChange) {
                      onFilterChange(newFilters);
                    }
                  }}
                  className="text-smoky-white text-lg font-semibold hover:text-primary transition-all duration-200 cursor-pointer active:scale-110 active:text-red-400"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
