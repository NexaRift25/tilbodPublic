import { MoveRight } from "lucide-react";
import Image from "next/image";

const AnimatedLineButton = ({ category }: { category: string }) => {
  return (
    <div className="line_button relative flex cursor-pointer items-center gap-4 text-white transition-colors hover:text-primary xl:pr-[137px]">
      <div className="line_button_content text-sm font-semibold sm:text-2xl">
        View all {category}
      </div>

      <Image
        src="/rightArrow.svg"
        alt="arrow-right"
        width={32}
        height={32}
        className="w-fit object-cover"
      />

      <div className="bottom_line absolute h-[3px] bottom-[-8px] w-[40%] hover:w-fit bg-primary" />
    </div>
  );
};

export default AnimatedLineButton;
