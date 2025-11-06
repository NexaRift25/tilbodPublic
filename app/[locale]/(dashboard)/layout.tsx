"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, LogOut, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import { Logo, MobileLogo } from "@/components/ui/Header";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { locales } from '@/i18n';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Get pathname without locale prefix for accurate matching
  const getPathWithoutLocale = (path: string | null) => {
    if (!path) return '';
    let pathWithoutLocale = path;
    locales.forEach((loc) => {
      if (path.startsWith(`/${loc}`)) {
        pathWithoutLocale = path.replace(`/${loc}`, '') || '/';
      }
    });
    return pathWithoutLocale;
  };
  
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  
  // Helper function to check if a route is active
  const isActiveRoute = (route: string) => {
    if (route === '/') {
      return pathWithoutLocale === '/' || pathWithoutLocale === '';
    }
    // For exact match (like /dashboard), only match if it's exactly that route
    // For nested routes (like /dashboard/cart), match if path starts with the route
    if (route === '/dashboard') {
      return pathWithoutLocale === '/dashboard';
    }
    return pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`);
  };

  const navItems = [
    {
      name: t('navigation.dashboard'),
      href: "/dashboard",
    },
    {
      name: t('navigation.shoppingCart'),
      href: "/dashboard/cart",
    },
    {
      name: t('navigation.paymentHistory'),
      href: "/dashboard/payment-history",
    },
    {
      name: t('navigation.profileSettings'),
      href: "/dashboard/profile",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-banner-background border-b border-primary sticky top-0 z-40">
        {/* Mobile/Tablet Header */}
        <div className="flex lg:hidden items-center justify-between px-4 py-4">
          {/* Mobile Logo */}
          <Link href="/dashboard">
            <MobileLogo />
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-3">
            {/* Home Icon */}
            <Link
              href="/"
              className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center bg-transparent hover:bg-primary/10 transition-colors"
            >
              <Home className="w-5 h-5 text-primary" />
            </Link>

           

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
            <Link
              href="/dashboard/profile"
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <User className="w-5 h-5 text-dark border border-dark rounded-full" />
            </Link>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block px-4 sm:px-6 lg:px-8">
          <div className="max-w-[130rem] mx-auto flex items-center justify-between">
            <div className="py-4 flex items-center gap-6 xl:gap-12">
              <Link href="/">
                <Logo />
              </Link>
              <nav className="flex items-center gap-3 xl:gap-8 text-smoky-white font-semibold">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-primary text-xs sm:text-sm xl:text-xl",
                      isActiveRoute(item.href) &&
                        "text-primary border-b-2 border-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href="/"
                className="text-primary transition-colors p-2"
                title={t('common.home')}
              >
                <Home size={20} />
              </Link>
              <Link
                href="/dashboard/profile"
                className="whitespace-nowrap flex items-center gap-3 font-semibold bg-primary text-dark px-4 py-1.5 rounded-3xl hover:bg-primary/90 transition-all"
              >
                {t('common.myAccount')}
                <span className="text-dark border border-dark rounded-full text-base">
                  <User size={16} />
                </span>
              </Link>
              <button className="text-primary hover:text-red-500 transition-colors p-2" title={t('common.logout')}>
                <LogOut size={20} />
              </button>
            </div>
          </div>
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
              damping: 50,
              duration: 0.3,
            }}
            className="fixed inset-0 z-50 bg-banner-background lg:hidden"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-primary">
              <Link href="/dashboard" onClick={closeMenu}>
                <MobileLogo />
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center bg-transparent hover:bg-primary/10 transition-colors"
                >
                  <Home className="w-5 h-5 text-primary" />
                </Link>
                
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <Link
                  href="/dashboard/profile"
                  onClick={closeMenu}
                  className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <User className="w-5 h-5 text-dark border border-dark rounded-full" />
                </Link>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col px-6 sm:px-10 md:px-14 py-6 sm:py-8 md:py-10">
              {/* Main Navigation Links */}
              <nav className="flex-1 flex flex-col gap-6 sm:gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "text-smoky-white text-xl sm:text-2xl font-semibold hover:text-primary transition-colors flex items-center gap-3",
                      isActiveRoute(item.href) && "text-primary"
                    )}
                  >
                    {item.name}
                    {isActiveRoute(item.href) && (
                      <span className="text-primary">→</span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* User Info and Logout */}
              <div className="space-y-4 pt-8 sm:pt-12">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
                    <User size={20} className="text-dark sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">John Doe</p>
                    <p className="text-gray-400 text-xs sm:text-sm lg:text-base">john@example.com</p>
                  </div>
                </div>
                <button className="flex items-center gap-3 text-red-500 hover:text-red-400 font-semibold text-base sm:text-lg transition-colors">
                  <LogOut size={18} className="sm:w-5 sm:h-5" />
                  {t('common.logout')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Container className="max-w-[118.75rem] w-[95%] sm:w-[90%] lg:w-[85%] mx-auto">
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="px-2 py-4 sm:px-4 sm:py-6 lg:p-8">{children}</div>
        </main>
      </Container>
    </div>
  );
}
