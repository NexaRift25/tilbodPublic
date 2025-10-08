import { Search, User } from "lucide-react";
import Container from "./Container";
import Link from "next/link";
export default function Header() {
    return <header className="bg-banner-background border-b border-primary px-4 sm:px-6 lg:px-8">
        <Container className="flex items-center justify-between">
            <div className="py-4 flex items-center gap-12">
                <Logo />
                <nav className="flex items-center gap-12 text-smoky-white font-semibold">
                    <Link href="/">Active 0ffers</Link>
                    <Link href="/">Weekday specials</Link>
                    <Link href="/">Happy hours</Link>
                    <Link href="/">Gift certificates</Link>
                </nav>
            </div>
            <div>
                {/* Search Bar */}
                <div
                    className={`group transition-all duration-300 flex-1  bg-general-background hover:bg-primary rounded-3xl `}
                >
                    <div
                        className={`relative ml-auto flex items-center transition-all`}
                    >
                        <input
                            type="search"
                            placeholder="Search"
                            // onClick={openSearchPopup}
                            readOnly
                            className="w-full border border-primary pl-8 pr-16 py-1 text-base text-white rounded-3xl !outline-none placeholder:text-white focus:border-primary focus:ring-0 cursor-pointer placeholder:font-semibold group-hover:placeholder:text-dark"
                        />
                        <button
                            // onClick={openSearchPopup}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary group-hover:text-dark"
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <button className="flex items-center gap-6 font-semibold bg-primary text-dark px-4 py-1.5 rounded-3xl">
                    My Page
                    <span className="text-dark border border-dark rounded-full text-base">
                        <User size={16} />
                    </span>
                </button>
            </div>
        </Container>
    </header>
}



const Logo = ({ className = "" }) => {
    return (
        <div
            className={`bg-primary inline-flex items-center justify-center pr-5 ${className}`}
            style={{
                height: "34px",
                width: "130px",
                clipPath:
                    "polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)",
            }}
        >
            <span className="text-dark font-extrabold whitespace-nowrap flex items-center justify-center w-full h-full text-center">
                Tilboð.is
            </span>
        </div>
    )
}
