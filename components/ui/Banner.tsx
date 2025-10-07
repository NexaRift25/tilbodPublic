import bannerImage from '@/images/banner.png'
import Image from 'next/image'
import FadeUpSection from './FadeUpSection'
import { cn } from '@/lib/utils'
import Container from './Container'

const Banner = ({ className }: { className: string }) => {
    return (
        <FadeUpSection>
            <div className="bg-banner-background">
                <Container className={cn(` max-w-[91.1875rem] px-[8.5625rem] py-[6.345rem]`)}>
                    <Image
                        src={bannerImage}
                        alt="Active Offers"
                        className={cn(`mx-auto h-[19.875rem] w-full rounded-[1.91rem] md:rounded-[4.2675rem] border object-cover lg:h-[32.310625rem]`, className)}
                    />
                </Container>
            </div>
        </FadeUpSection>
    )
}

export default Banner
