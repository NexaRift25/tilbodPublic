import { MoveRight } from "lucide-react";

const AnimatedButton = () => {
    return (
        <button className="hidden whitespace-nowrap md:flex items-center overflow-hidden animated_button w-full py-[0.6875rem] px-[1.5rem] rounded-[3.5rem]  gap-[4.375rem] bg-card-background border border-primary hover:border-green-500 transition-all duration-100 cursor-pointer text-primary relative">
            <span className="button_icon">
                <MoveRight color="green" size={25} className="" />
            </span>

            <div className="animated_button_content flex items-center w-full">
                <span className="text-xs sm:text-sm md:text-base lg:text-2xl font-semibold mr-[100px]">
                    View offer
                </span>
                <MoveRight size={26} className="w-6 h-6" />
            </div>
        </button>
    );
};

export default AnimatedButton;




