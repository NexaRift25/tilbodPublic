import Image from "next/image";
import adCardImage from "@/images/ad.png";

interface AdCardProps {
  variant?:
    | "active-offer"
    | "happy-hour"
    | "promo"
    | "gift-card"
    | "weekly-offer";
  className?: string;
}

export default function AdCard({
  variant = "active-offer",
  className = "",
}: AdCardProps) {
  // Define dimensions and styles for different variants
  const variants = {
    "active-offer": {
      container:
        "min-h-[30rem] h-[30rem] sm:h-[33rem] md:h-[38.75rem]",
      rounded: "rounded-[2.5rem]",
      padding: "p-4",
    },
    "happy-hour": {
      container:
        "min-h-[30rem] h-[30rem] sm:h-[33rem] md:h-[38.75rem]",
      rounded: "rounded-[2.5rem]",
      padding: "p-4",
    },
    promo: {
      container:
        "min-w-[17.6875rem] lg:w-[26.6875rem] h-[31.25rem] sm:h-[37.5rem] lg:h-[40.625rem] 2xl:h-[45.75rem]",
      rounded: "rounded-3xl",
      padding: "p-4",
    },
    "gift-card": {
      container:
        "min-w-[17.625rem] min-h-[30rem] w-[17.625rem] h-[30rem] md:w-[23rem] md:h-[38rem] lg:w-[25.625rem] lg:h-[39.0625rem]",
      rounded: "rounded-[2.5rem]",
      padding: "p-4",
    },
    "weekly-offer": {
      container:
        "min-h-[30rem] h-[30rem] sm:h-[33rem] md:h-[38.75rem]",
      rounded: "rounded-[2.5rem]",
      padding: "p-4",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={`${currentVariant.container} ${currentVariant.rounded} ${currentVariant.padding} border border-primary bg-card-background mx-auto ${className}`}
    >
      <div className="h-full w-full relative overflow-hidden">
        <Image
          src={adCardImage}
          alt="AdCard"
          className="h-full w-full object-cover rounded-[1rem] lg:rounded-[2.5rem] pointer-events-none select-none"
          draggable={false}
          fill
        />
      </div>
    </div>
  );
}
