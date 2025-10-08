import CategoryCard from "@/components/ui/CategoryCard";
import ScrollableCarousel from "@/components/ui/ScrollableCarousel";
import { categories } from "@/data/categories";

export default function CategoryCardWraper() {
    return (
        <div className="w-full py-[7.1rem]">
            <h2 className="text-2xl font-semibold text-smoky-white mb-1">What kind of offer are you looking for?</h2>
            <ScrollableCarousel gap="gap-6" className="pr-0">
                {categories.map((category) => (
                    <div key={category.id} className="flex-shrink-0 snap-center">
                        <CategoryCard category={category} />
                    </div>
                ))}
            </ScrollableCarousel>
        </div>
    )
}
