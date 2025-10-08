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
        <div className='bg-card-background w-[13.9375rem] h-[17.875rem] p-[0.5rem] border border-primary rounded-3xl'>
            <Image
                src={image}
                alt={name}
                width={6.25 * 16}
                height={6.25 * 16}
                className="pointer-events-none select-none w-full h-[13.9375rem] object-cover border border-primary rounded-2xl"
            />
            <h3 className="text-lg font-semibold text-center text-smoky-white pt-3 truncate">{name}</h3>
        </div>
    )
}