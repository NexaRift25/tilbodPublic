'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

const AnimatedButton = ({ link }: { link: string }) => {
  const t = useTranslations();
  const router = useRouter();
  return (
    <button onClick={() => router.push(link)} className="group  whitespace-nowrap overflow-hidden  w-full py-[0.6875rem] px-[1.5rem] rounded-[3.5rem] bg-card-background border border-primary hover:border-green-500 transition-all duration-100 cursor-pointer text-primary relative">
      <div className="flex items-center justify-between md:-translate-x-1/4 transition-all duration-400 group-hover:translate-x-0">
        <Image
          src="/rightArrow.svg"
          alt="arrow-right"
          width={32}
          height={32}
          className="w-fit object-cover hidden md:block"
          style={{ filter: "invert(49%) sepia(97%) saturate(749%) hue-rotate(86deg) brightness(92%) contrast(88%)" }}
        />
        <div className="">
          <span className="text-lg lg:text-2xl font-semibold">
            {t('common.viewOffer')}
          </span>
        </div>
        <Image
          src="/rightArrow.svg"
          alt="arrow-right"
          width={32}
          height={32}
          className="w-fit object-cover"
        />
      </div>
    </button>
  );
};

export default AnimatedButton;
