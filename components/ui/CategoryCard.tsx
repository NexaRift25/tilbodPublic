import Image from "next/image";

export default function CategoryCard() {
    return (
        <div className="py-[1.875rem]">
            <div className='bg-card-background max-w-[13.9375rem] max-h-[17.875rem] p-[0.5rem] mx-auto border border-primary rounded-3xl'>
                <Image
                    src='/home-section-2/259_69f3864c-c4f8-49cf-b642-6800f94787e9-thumbnail-1080x1080-70 1-12.png'
                    alt="Category"
                    width={6.25 * 16} // 100px = 6.25rem * 16px
                    height={6.25 * 16}
                    className="max-w-[12.9375rem] max-h-[13.9375rem] mx-auto w-full h-[13.9375rem] object-cover border border-primary rounded-2xl"
                />
                <h3 className="text-lg font-semibold text-center text-smoky-white mt-2">Electronics</h3>
            </div>
        </div>
    )
}