import { MoveRight } from "lucide-react";

const AnimatedButton = () => {
  return (
    <button className="group  whitespace-nowrap overflow-hidden  w-full py-[0.6875rem] px-[1.5rem] rounded-[3.5rem] bg-card-background border border-primary hover:border-green-500 transition-all duration-100 cursor-pointer text-primary relative">
      <div className="flex items-center justify-between -translate-x-1/4 transition-all duration-400 group-hover:translate-x-0">
        <span>
          <MoveRight size={32} className="text-green-500" />
        </span>

        <div className="">
          <span className="text-xs sm:text-sm md:text-base lg:text-2xl font-semibold">
            View offer
          </span>
        </div>
        <MoveRight size={32} className="w-fit" />
      </div>
    </button>
  );
};

export default AnimatedButton;
