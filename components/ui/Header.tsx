"use client";
import { Search, User, Menu, X, ArrowRight } from "lucide-react";
import Container from "./Container";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuLinkButton from "./MenuLinkButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-banner-background border-b border-primary">
        {/* Mobile/Tablet Header (xs to md) */}
        <div className="flex lg:hidden items-center justify-between px-4 py-4">
          {/* Mobile Logo */}
          <MobileLogo />

          {/* Mobile Icons */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center bg-transparent hover:bg-primary/10 transition-colors">
              <Search className="w-5 h-5 text-primary" />
            </button>

            {/* Menu Icon */}
            <button
              onClick={toggleMenu}
              className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center bg-transparent hover:bg-primary/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>

            {/* User Profile Icon */}
            <button className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
              <User className="w-5 h-5 text-dark border border-dark rounded-full" />
            </button>
          </div>
        </div>

        {/* Desktop Header (lg and above) */}
        <div className="hidden lg:block px-4 sm:px-6 lg:px-8">
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
            <div className="w-32 sm:w-48 md:w-56 lg:w-[300px] 2xl:w-[500px]">
              {/* Search Bar */}
              <div className="group transition-all duration-300 bg-general-background hover:bg-primary rounded-3xl">
                <div className="relative flex items-center">
                  <input
                    type="search"
                    placeholder="Search"
                    // onClick={openSearchPopup}
                    readOnly
                    className="w-full border border-primary px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2 text-xs sm:text-sm lg:text-base text-white rounded-3xl bg-transparent outline-none placeholder:text-white focus:border-primary focus:ring-0 cursor-pointer placeholder:font-semibold group-hover:placeholder:text-dark transition-all"
                  />
                  <button
                    // onClick={openSearchPopup}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-primary group-hover:text-dark transition-colors"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="fixed inset-0 z-50 bg-banner-background lg:hidden"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-primary">
              <MobileLogo />
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center bg-transparent hover:bg-primary/10 transition-colors">
                  <Search className="w-5 h-5 text-primary" />
                </button>
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <User className="w-5 h-5 text-dark border border-dark rounded-full" />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col px-14 py-10 ">
              {/* Main Navigation Links */}
              <nav className="flex-1 space-y-12">
                <MenuLinkButton nav={{ title: "Virk tilboð", link: "/" }} />
                <MenuLinkButton nav={{ title: "Vikudags tilboð", link: "/" }} />
                <MenuLinkButton
                  nav={{ title: "Happy hour tilboð", link: "/" }}
                />
                <MenuLinkButton nav={{ title: "Gjafabréf", link: "/" }} />
                <MenuLinkButton nav={{ title: "Mínar síður", link: "/" }} />
              </nav>

              {/* Bottom Utility Links */}
              <div className="space-y-4 pt-22">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block text-smoky-white text-base hover:text-yellow-400 transition-colors"
                >
                  Skilmálar
                </Link>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block text-smoky-white text-base hover:text-yellow-400 transition-colors"
                >
                  Persónuvernd
                </Link>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block text-smoky-white text-base hover:text-yellow-400 transition-colors"
                >
                  Um okkur
                </Link>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block text-smoky-white text-sm hover:text-yellow-400 transition-colors"
                >
                  Auglýsa á Tilboð.is
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop Logo
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
  );
};

// Mobile Logo (Arrow-shaped like in the design)
const MobileLogo = ({ className = "" }) => {
  return (
    <div
      className={`bg-primary inline-flex items-center justify-center pr-4 ${className}`}
      style={{
        height: "32px",
        width: "110px",
        clipPath:
          "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)",
      }}
    >
      <span className="text-dark font-extrabold whitespace-nowrap flex items-center justify-center w-full h-full text-center text-sm">
        Tilboð.is
      </span>
    </div>
  );
};
