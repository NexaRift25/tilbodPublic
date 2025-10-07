
import { Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Container from './Container'

const Footer: React.FC = () => {

    return (
        <Container className="max-w-[91rem]">
            <footer
                className="my-[2rem] rounded-[3rem] border border-solid border-primary bg-card-background"
            >
                <div className=" py-12 px-[4rem]">
                    {/* Top Section */}
                    <div className="mb-6 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-8">
                        {/* Navigation Links */}
                        <div className="flex flex-wrap md:flex-row flex-col gap-6 font-bold lg:gap-6 2xl:gap-12">
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors sm:text-base"
                            >
                                Terms and conditions
                            </a>
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors sm:text-base"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors sm:text-base"
                            >
                                About us
                            </a>
                            <a
                                href="#"
                                className="text-sm text-smoky-white transition-colors sm:text-base"
                            >
                                Advertise on Tilbod.is
                            </a>
                        </div>

                        {/* Mailing List Signup */}
                        <div
                            className="flex w-full flex-col gap-1.25 rounded-3xl md:rounded-[3rem] border border-primary p-2 sm:flex-row lg:w-auto "
                        >
                            <div className="relative flex-1 lg:flex-none">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Sign up for the mailing list"
                                        className=" w-full rounded-t-3xl  md:rounded-l-full border border-solid border-primary bg-general-background py-2 pl-3 pr-4 text-white placeholder-gray-400 focus:border-transparent focus:outline-none md:w-[448px] md:rounded-[48px] md:rounded-r-none md:pl-10"
                                    />
                                    <Mail
                                        className="absolute right-6 top-1/2 -translate-y-1/2 transform text-lg md:right-3 text-primary"
                                    />
                                </div>
                            </div>
                            <button
                                className="whitespace-nowrap bg-primary rounded-b-[1.5rem] px-[1.5rem] py-[0.5rem] font-medium text-dark transition-colors hover:bg-primary md:rounded-[3rem] md:rounded-l-none"
                            >
                                Register me
                            </button>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-row items-start justify-between gap-4 pt-4 sm:items-center">
                        {/* Copyright */}
                        <div className="text-sm font-bold text-smoky-white sm:text-base">
                            © 2023 Tilbod.is
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex gap-[8px] md:gap-4">
                            <Image
                                className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0"
                                width={24}
                                height={24}
                                sizes="100vw"
                                alt=""
                                src="/Facebook-Logo-1--Streamline-Core.svg"
                            />
                            <Image
                                className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0"
                                width={24}
                                height={24}
                                sizes="100vw"
                                alt=""
                                src="/Instagram-Logo--Streamline-Core.svg"
                            />
                        </div>
                    </div>
                </div>
            </footer>
        </Container>
    )
}

export default Footer
