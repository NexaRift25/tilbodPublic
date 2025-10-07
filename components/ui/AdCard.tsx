import Image from "next/image";
import adCardImage from "@/images/ad.png";

export default function AdCard() {
    return (
        <div className="flex-shrink-0 snap-center w-[25.625rem] h-[38.75rem] rounded-[1rem] lg:rounded-[2.5rem] p-4 border border-primary">
            <div className="h-full w-full">
                <Image 
                    src={adCardImage} 
                    alt="AdCard" 
                    className="h-full w-full object-cover rounded-[1rem] lg:rounded-[2.5rem] pointer-events-none select-none" 
                    draggable={false}
                />
            </div>
        </div>
    )
}