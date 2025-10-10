import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MenuLinkButton({
  nav,
  isActive = false,
  onClick,
}: {
  nav: { title: string; link: string };
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href={nav.link} onClick={onClick}>
      <div className={cn(
        "line_button relative flex cursor-pointer items-center gap-6 transition-colors hover:text-primary pb-2",
        isActive ? "text-primary" : "text-white"
      )}>
        <div className="line_button_content font-semibold text-base">
          {nav.title}
        </div>

        <Image
          src="/rightArrow.svg"
          alt="arrow-right"
          width={32}
          height={32}
          className={cn(
            "w-fit object-cover transition-all",
            isActive && "scale-110"
          )}
        />

        <div className={cn(
          "bottom_line absolute h-[0.1875rem] bottom-0 bg-primary transition-all",
          isActive ? "w-[60%] sm:w-[30%]" : "w-[45%] sm:w-[20%]"
        )} />
      </div>
    </Link>
  );
}
