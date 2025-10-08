
import { Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Container from './Container'

const Footer: React.FC = () => {

    return (
        <Container className="w-full max-w-[118.75rem]">
            <footer
                className="my-4 sm:my-6 lg:my-8 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] border border-solid border-primary bg-card-background"
            >
                <div className="py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 lg:py-12 lg:px-12 xl:px-16">
                    {/* Top Section */}
                    <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-4 sm:gap-6 lg:flex-row lg:items-center lg:gap-8">
                        {/* Navigation Links */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-12 font-bold">
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors hover:text-primary sm:text-base"
                            >
                                Terms and conditions
                            </a>
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors hover:text-primary sm:text-base"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors hover:text-primary sm:text-base"
                            >
                                About us
                            </a>
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors hover:text-primary sm:text-base"
                            >
                                Advertise on Tilbod.is
                            </a>
                        </div>

                        {/* Mailing List Signup */}
                        <div
                            className="flex w-full flex-col sm:flex-row gap-0 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] border border-primary p-1.5 sm:p-2 lg:w-auto"
                        >
                            <div className="relative flex-1 lg:flex-none">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Sign up for the mailing list"
                                        className="w-full rounded-t-[1.25rem] sm:rounded-l-full sm:rounded-tr-none border border-solid border-primary bg-general-background py-2 sm:py-2.5 pl-3 sm:pl-4 md:pl-10 pr-10 text-sm sm:text-base text-white placeholder-gray-400 focus:border-transparent focus:outline-none md:w-[28rem] lg:w-[28rem]"
                                    />
                                    <Mail
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-lg text-primary w-5 h-5"
                                    />
                                </div>
                            </div>
                            <button
                                className="whitespace-nowrap bg-primary rounded-b-[1.25rem] sm:rounded-r-full sm:rounded-bl-none px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-dark transition-colors hover:opacity-90"
                            >
                                Register me
                            </button>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-primary/20">
                        {/* Copyright */}
                        <div className="text-xs sm:text-sm font-bold text-smoky-white">
                            © 2023 Tilbod.is
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex gap-3 sm:gap-4">
                            <a href="#" className="transition-transform hover:scale-110">
                                <Image
                                    className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden shrink-0"
                                    width={24}
                                    height={24}
                                    sizes="100vw"
                                    alt="Facebook"
                                    src="/Facebook-Logo-1--Streamline-Core.svg"
                                />
                            </a>
                            <a href="#" className="transition-transform hover:scale-110">
                                <Image
                                    className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden shrink-0"
                                    width={24}
                                    height={24}
                                    sizes="100vw"
                                    alt="Instagram"
                                    src="/Instagram-Logo--Streamline-Core.svg"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </Container>
    )
}

export default Footer
