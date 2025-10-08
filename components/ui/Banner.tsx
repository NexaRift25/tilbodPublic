import bannerImage from '@/images/banner.png'
import Image from 'next/image'
import FadeUpSection from './FadeUpSection'
import { cn } from '@/lib/utils'
import Container from './Container'

const Banner = ({ className }: { className: string }) => {
    return (
        <FadeUpSection>
            <div className="bg-banner-background py-[1rem] md:py-[1.5rem] lg:py-[6.3125rem]">
                <Container className="w-full px-4 sm:px-6 lg:px-8">
                    <Image
                        src={bannerImage}
                        alt="Active Offers"
                        className={cn(
                            "w-full h-auto rounded-[1.90rem] sm:rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[4.2675rem]",
                            "border object-cover mx-auto",
                            "max-w-full min-h-[19.875rem] sm:max-w-[95%] md:max-w-[90%] lg:max-w-[118.75rem]",
                            "max-h-[32.3125rem]",
                            className
                        )}
                    />
                </Container>
            </div>
        </FadeUpSection>
    )
}

export default Banner
