import { MapPin } from "lucide-react";

interface WeeklyOffer {
    id: number;
    offerType: string;
    title: string;
    discount: string;
    description: string;
    image: string;
    badge: string;
    location: string;
    time: string;
    availableDays: string[];
    link: string;
}

interface WeeklyOfferCardProps {
    offer: WeeklyOffer;
}

export default function WeeklyOfferCard({ offer }: WeeklyOfferCardProps) {
    const { title, discount, description, image, badge, location, time, availableDays, link } = offer;
    const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    return (
        <div className="theme-pink">
            <div className="w-[25.625rem] h-[39.0625rem] relative overflow-hidden rounded-[1rem] border border-primary sm:rounded-[2.5rem] bg-card-background">
                {/* Discount Banner */}
                <div className="bg-primary absolute left-[1rem] right-[1rem] top-[1rem] z-30 flex select-none items-center justify-center rounded-full py-[0.375rem] h-[2.5rem] md:h-[3.5rem] w-auto bg-offer-banner">
                    <span className="text-[1.75rem] font-semibold text-dark">
                        {discount}
                    </span>
                </div>

                {/* Main Image */}
                <div className="relative h-[12.5rem] w-full bg-card-background sm:h-[15rem] border-b border-primary">
                    <img
                        src={image}
                        alt={title}
                        className="pointer-events-none relative z-10 select-none object-cover w-full h-full"
                    />
                    {/* Badge Indicator */}
                    <div className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2 transform">
                        <div className="whitespace-nowrap rounded-t-3xl  text-xs shadow-lg px-[2rem] py-[0.34375rem] font-semibold lg:text-base border border-b-0 bg-card-background text-smoky-white border-primary">
                            {badge}
                        </div>
                    </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="z-30 p-[1.5rem] flex flex-col justify-between sm:rounded-b-3xl bg-card-background">
                    {/* Content Section */}
                    <div className="pointer-events-none flex-1">
                        <div className=" border-b border-primary">
                            {/* Title */}
                            <h3 className="text-sm font-bold sm:text-base lg:text-2xl text-smoky-white mb-4">
                                {title}
                            </h3>
                        </div>

                        {/* Location */}
                        <div className="flex gap-1 py-4 text-xs font-semibold sm:text-base text-yellow">
                            <MapPin />  {location}
                        </div>

                        {/* Description */}
                        <p className="h-[9.99rem] w-full text-base text-smoky-white font-medium">
                            {description}
                        </p>
                        <div className='text-yellow text-2xl font-medium'>
                            {time}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-[1.5rem] left-[1.5rem] right-[1.5rem] flex flex-col gap-2">
                        {/* Available Days */}
                        <div className="grid grid-cols-7 gap-2 text-xs font-semibold">
                            {allDays.map((day) => (
                                <div 
                                    key={day}
                                    className={`flex items-center justify-center h-[23px] w-[48.29px] rounded-sm ${
                                        availableDays.includes(day) ? 'bg-primary text-dark' : 'bg-card-background border border-primary text-smoky-white'
                                    }`}
                                >
                                    <p>{day}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
