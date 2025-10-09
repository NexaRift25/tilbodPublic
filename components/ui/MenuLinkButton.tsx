import Image from "next/image";

export default function MenuLinkButton({
  nav,
}: {
  nav: { title: string; link: string };
}) {
  return (
    <div>
      <div className="line_button relative flex cursor-pointer items-center gap-6 text-white transition-colors hover:text-primary xl:pr-[137px]">
        <div className="line_button_content font-semibold text-2xl">
          {nav.title}
        </div>

        <Image
          src="/rightArrow.svg"
          alt="arrow-right"
          width={32}
          height={32}
          className="w-fit object-cover"
        />

        <div className="bottom_line absolute h-[3px] bottom-[-8px] w-[45%] bg-primary" />
      </div>
    </div>
  );
}
