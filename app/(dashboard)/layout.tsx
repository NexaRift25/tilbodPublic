"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, LogOut, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Shopping Cart",
      href: "/dashboard/cart",
    },
    {
      name: "Payment History",
      href: "/dashboard/payment-history",
    },
    {
      name: "Profile Settings",
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
                      "transition-colors hover:text-primary",
                      pathname === item.href &&
                        "text-primary border-b-2 border-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/profile"
                className="whitespace-nowrap flex items-center gap-3 font-semibold bg-primary text-dark px-4 py-1.5 rounded-3xl hover:bg-primary/90 transition-all"
              >
                My Account
                <span className="text-dark border border-dark rounded-full text-base">
                  <User size={16} />
                </span>
              </Link>
              <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
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
                <button className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center bg-transparent hover:bg-primary/10 transition-colors">
                  <Search className="w-5 h-5 text-primary" />
                </button>
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
            <div className="flex flex-col px-14 py-10">
              {/* Main Navigation Links */}
              <nav className="flex-1 flex flex-col gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "text-smoky-white text-2xl font-semibold hover:text-primary transition-colors flex items-center gap-3",
                      pathname === item.href && "text-primary"
                    )}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <span className="text-primary">→</span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* User Info and Logout */}
              <div className="space-y-4 pt-12 border-t border-primary/30">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User size={24} className="text-dark" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">John Doe</p>
                    <p className="text-gray-400 text-sm">john@example.com</p>
                  </div>
                </div>
                <button className="flex items-center gap-3 text-red-500 hover:text-red-400 font-semibold text-lg transition-colors">
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Container className="max-w-[118.75rem] w-[85%] mx-auto">
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </Container>
    </div>
  );
}

// Desktop Logo
const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`bg-primary inline-flex items-center justify-center pr-5 ${className}`}
      style={{
        height: "2.125rem",
        width: "8.125rem",
        clipPath:
          "polygon(0 0, calc(100% - 1.875rem) 0, 100% 50%, calc(100% - 1.875rem) 100%, 0 100%)",
      }}
    >
      <span className="text-dark font-extrabold whitespace-nowrap flex items-center justify-center w-full h-full text-center">
        Tilboð.is
      </span>
    </div>
  );
};

// Mobile Logo
const MobileLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`bg-primary inline-flex items-center justify-center pr-4 ${className}`}
      style={{
        height: "2rem",
        width: "6.875rem",
        clipPath:
          "polygon(0 0, calc(100% - 1.25rem) 0, 100% 50%, calc(100% - 1.25rem) 100%, 0 100%)",
      }}
    >
      <span className="text-dark font-extrabold whitespace-nowrap flex items-center justify-center w-full h-full text-center text-sm">
        Tilboð.is
      </span>
    </div>
  );
};
