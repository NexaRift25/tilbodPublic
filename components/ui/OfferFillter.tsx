import { ArrowDownWideNarrow } from "lucide-react";

interface OfferFillterProps {
  selectedFilters?: string[];
  offerType: string;
}

export default function OfferFillter({
  selectedFilters = [],
  offerType,
}: OfferFillterProps) {
  const filters = [
    {
      id: 1,
      name: "Ranking",
      icon: <ArrowDownWideNarrow />,
    },
    {
      id: 2,
      name: "Location",
      icon: <ArrowDownWideNarrow />,
    },
    {
      id: 3,
      name: "Offer type",
      icon: <ArrowDownWideNarrow />,
    },
    {
      id: 4,
      name: "Days left",
      icon: <ArrowDownWideNarrow />,
    },
  ];

  return (
    <div className="w-full max-w-[74.5rem] space-y-[36px]">
      {/* Title */}
      <h3 className="text-smoky-white text-xl md:text-2xl lg:text-5xl font-semibold">
        {offerType}
      </h3>
      
      {/* Filter Buttons Row */}
      <div className="flex lg:flex-row flex-col md:flex-row gap-3 sm:gap-4">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between w-[298px] h-[56px] rounded-[32px] border border-primary bg-transparent px-8 py-4"
          >
            <span className="text-base font-semibold text-primary">
              {filter.name}
            </span>
            <div className="flex-shrink-0 text-primary">
              {filter.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Filter Tags Row */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {selectedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-[24px] border border-primary bg-transparent px-6 py-2 h-[36px]"
            >
              <span className="text-base font-semibold text-smoky-white">
                {filter}
              </span>
              <span className="text-smoky-white text-lg font-semibold">
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
