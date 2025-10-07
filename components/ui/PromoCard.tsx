"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import offerImage from "@/images/iphone.png";

export default function PromoCard() {
    return (
        <div className="relative w-full max-w-[26.6875rem] mx-auto h-[31.25rem] sm:h-[37.5rem] lg:h-[40.625rem] 2xl:h-[45.75rem] bg-card-background text-smoky-white rounded-3xl border border-primary overflow-hidden">
            {/* Product Image */}
            <div className="relative w-full h-full">
                <Image
                    src={offerImage}
                    alt="iPhone"
                    className="w-full h-full object-cover"
                    priority
                />

                {/* Discount Card - Always 24px from bottom, left, and right */}
                <div className="absolute bottom-6 left-6 right-6 bg-card-background rounded-4xl border border-primary shadow-md p-6 flex flex-col items-start">
                    <div className="bg-primary text-dark text-center font-semibold text-sm rounded-full py-2 px-4 w-full mb-2 lg:text-[1.75rem]">
                        25% discount
                    </div>

                    <div className="text-base text-yellow font-semibold">Nova</div>
                    <h3 className="lg:text-2xl font-semibold mb-2">iPhone 16</h3>

                    <button className=" border border-primary text-yellow font-semibold text-[1.75rem] rounded-full py-2 px-5 flex items-center justify-start gap-17.5 w-full">
                        View offer
                        <MoveRight size={32} className=" text-yellow" />
                    </button>
                </div>
            </div>
        </div>
    );
}
