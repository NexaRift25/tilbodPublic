import { MoveRight } from "lucide-react";

interface GiftOffer {
    id: number;
    offerType: string;
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    timeLeft: string;
    purchaseCount: number;
    link: string;
}

interface GiftOfferCardProps {
    offer: GiftOffer;
}

export default function GiftOfferCard({ offer }: GiftOfferCardProps) {
    const { title, price, description, image, category, timeLeft, purchaseCount, link } = offer;
    
    return (
        <div className="theme-orange">
            <div className="w-[25.625rem] h-[39.0625rem] relative overflow-hidden rounded-[1rem] border border-primary sm:rounded-[2.5rem] bg-card-background">
                {/* Price Banner */}
                <div className="bg-primary absolute left-[1rem] right-[1rem] top-[1rem] z-30 flex select-none items-center justify-center rounded-full py-[0.375rem] h-[2.5rem] md:h-[3.5rem] w-auto bg-offer-banner">
                    <span className="text-[1.75rem] font-semibold text-dark">
                        {price}
                    </span>
                </div>

                {/* Main Image */}
                <div className="relative h-[12.5rem] w-full bg-card-background sm:h-[15rem] border-b border-primary">
                    <img
                        src={image}
                        alt={title}
                        className="pointer-events-none relative z-10 select-none object-cover w-full h-full"
                    />
                    {/* Time Left Indicator */}
                    <div className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2 transform">
                        <div className="whitespace-nowrap rounded-t-3xl  text-xs shadow-lg px-[2rem] py-[0.34375rem] font-semibold lg:text-base border border-b-0 bg-card-background text-smoky-white border-primary">
                            {timeLeft}
                        </div>
                    </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="z-30 p-[1.5rem] flex flex-col justify-between sm:rounded-b-3xl bg-card-background">
                    {/* Content Section */}
                    <div className="pointer-events-none flex-1">
                        <div className=" border-b border-primary">
                            {/* Category */}
                            <div className="text-xs font-semibold sm:text-base text-yellow">
                                {category}
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-bold sm:text-base lg:text-2xl text-smoky-white mb-4">
                                {title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="h-[8.2rem] w-full text-base text-smoky-white pt-4 font-medium">
                            {description}
                        </p>
                        <div className='text-smoky-white text-base font-medium'>
                            <p>{purchaseCount} have taken advantage of the offer</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-[1.5rem] left-[1.5rem] right-[1.5rem] flex flex-col gap-2">
                        {/* View Offer Button */}
                        <a href={link} className="py-[0.6875rem] px-[1.5rem] rounded-[3.5rem] flex gap-[4.375rem] bg-card-background border border-primary text-smoky-white">
                            <span className="text-sm font-semibold sm:text-base lg:text-2xl text-primary">
                                View offer
                            </span>
                            <MoveRight size={32} className=" text-primary" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}



