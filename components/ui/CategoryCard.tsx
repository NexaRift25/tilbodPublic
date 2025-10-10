import Image from "next/image";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, image } = category;

  return (
    <div className="fkex flex-col items-center justify-center p-[0.5rem] pl-[0.4375rem] md:pl-[0.5rem] bg-card-background min-w-[8.75rem] min-h-[11.5rem] w-[8.75rem] h-[11.5rem] md:w-[13.9375rem] md:h-[17.875rem] border border-primary rounded-3xl">
      <Image
        src={image}
        alt={name}
        width={124}
        height={124}
        className="pointer-events-none select-none mx-auto min-w-[7.75rem] min-h-[7.75rem] h-[7.75rem] md:w-full md:h-[13.9375rem] object-cover border border-primary rounded-2xl"
      />
      <h3 className="text-base md:text-lg font-semibold text-center text-smoky-white pt-3 max-w-[90%] mx-auto w-full truncate">
        {name}
      </h3>
    </div>
  );
}
