'use client' // if using Next.js 13+

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const FadeUpSection = ({ children }: { children: React.ReactNode }) => {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.2 })

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' as const },
        },
    }

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className=""
        >
            {children}
        </motion.section>
    )
}

export default FadeUpSection
