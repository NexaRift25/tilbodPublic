import { MoveRight } from "lucide-react";

const AnimatedLineButton = () => {
    return (
        <div className="line_button relative flex cursor-pointer items-center gap-4 text-white transition-colors hover:text-primary xl:pr-[137px]">
            <div className="line_button_content text-sm font-semibold sm:text-2xl">
                View all active offers
            </div>

            <MoveRight size={32} className='text-primary font-semibold' />

            <div className="bottom_line absolute h-[3px] bottom-0 w-[40%] hover:w-fit bg-primary" />
        </div>
    );
};

export default AnimatedLineButton;
