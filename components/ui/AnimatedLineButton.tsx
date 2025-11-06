"use client";

import { MoveRight } from "lucide-react";
import { useTranslations } from 'next-intl';
// import Image from "next/image";

const AnimatedLineButton = ({ category }: { category: string }) => {
  const t = useTranslations();
  return (
    <div className="line_button relative flex cursor-pointer items-center gap-4 text-white transition-colors hover:text-primary xl:pr-[8.5625rem]">
      <div className="line_button_content text-lg font-semibold md:text-2xl">
        {t('common.viewAll')} {category}
      </div>

      {/* <Image
        src="/rightArrow.svg"
        alt="arrow-right"
        width={32}
        height={32}
        className="w-fit object-cover"
        
      /> */}
      <MoveRight size={32} className="text-primary" />

      <div className="bottom_line absolute h-[0.1875rem] bottom-[-0.5rem] w-[32%] md:w-[40%] hover:w-fit bg-primary" />
    </div>
  );
};

export default AnimatedLineButton;
