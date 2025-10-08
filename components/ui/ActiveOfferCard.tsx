import AnimatedButton from "./AnimatedButton";

interface Offer {
  id: number;
  offerType: string;
  title: string;
  discount: string;
  description: string;
  image: string;
  category: string;
  timeLeft: string;
  location: string;
  link: string;
}

interface ActiveOfferCardProps {
  offer: Offer;
}

export default function ActiveOfferCard({ offer }: ActiveOfferCardProps) {
  const { title, discount, description, image, category, timeLeft, link } =
    offer;
  return (
    <div className="min-w-[17.625rem] min-h-[30rem] w-[17.625rem] h-[30rem] md:w-[25.625rem] md:h-[38.75rem] relative overflow-hidden rounded-[2.5rem] border border-primary sm:rounded-[2.5rem] bg-card-background">
      {/* Discount Banner */}
      <div className="bg-primary absolute left-[1rem] right-[1rem] top-[1rem] z-30 flex select-none items-center justify-center rounded-full py-[0.375rem] h-[3rem] md:h-[3.5rem] w-auto bg-offer-banner">
        <span className="text-xl md:text-[1.75rem] font-semibold text-dark">
          {discount}
        </span>
      </div>

      {/* Main Image */}
      <div className="relative w-full bg-card-background h-[12.5rem] sm:h-[15rem] lg:h-[17.5rem] border-b border-primary">
        <img
          src={image}
          alt={title}
          className="pointer-events-none relative z-10 select-none object-cover w-full h-full"
        />
        {/* Time Left Indicator */}
        <div className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2 transform">
          <div className="min-w-[9.4375rem] text-center rounded-t-3xl text-sm shadow-lg px-[2rem] py-[0.34375rem] font-semibold lg:text-base border border-b-0 bg-card-background text-smoky-white border-primary">
            {timeLeft}
          </div>
        </div>
      </div>

      {/* Bottom Content Overlay */}
      <div className="z-30 p-[1rem] lg:p-[1.5rem] flex flex-col justify-between sm:rounded-b-3xl bg-card-background">
        {/* Content Section */}
        <div className="pointer-events-none flex-1">
          <div className=" border-b border-primary">
            {/* Category */}
            <div className="text-xs font-semibold sm:text-base text-primary">
              {category}
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold sm:text-base lg:text-2xl text-smoky-white mb-4 truncate">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="h-[5.4375rem] w-[80%] text-base text-smoky-white pt-4 font-medium">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-[1rem] left-[1rem] right-[1rem] md:bottom-[1.5rem] md:left-[1.5rem] md:right-[1.5rem]">
          {/* View Offer Button */}
          <AnimatedButton />
        </div>
      </div>
    </div>
  );
}
