"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

interface PromoOffer {
    id: number;
    title: string;
    brand: string;
    discount: string;
    image: string;
    link: string;
}

interface PromoCardProps {
    offer: PromoOffer;
}

export default function PromoCard({ offer }: PromoCardProps) {
    const { title, brand, discount, image, link } = offer;

    return (
        <div className="relative w-[26.6875rem] h-[31.25rem] sm:h-[37.5rem] lg:h-[40.625rem] 2xl:h-[45.75rem] bg-card-background text-smoky-white rounded-3xl border border-primary overflow-hidden">
            {/* Product Image */}
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    width={427}
                    height={732}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    priority
                />

                {/* Discount Card - Always 24px from bottom, left, and right */}
                <div className="absolute bottom-6 left-6 right-6 bg-card-background rounded-4xl border border-primary shadow-md p-6 flex flex-col items-start">
                    <div className="bg-primary text-dark text-center font-semibold text-sm rounded-full py-2 px-4 w-full mb-2 lg:text-[1.75rem]">
                        {discount}
                    </div>

                    <div className="text-base text-yellow font-semibold">{brand}</div>
                    <h3 className="lg:text-2xl font-semibold mb-2 truncate">{title}</h3>

                    <AnimatedButton />
                </div>
            </div>
        </div>
    );
}
