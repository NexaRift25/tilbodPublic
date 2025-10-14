"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  LogOut,
  Home,
  LayoutDashboard,
  Building2,
  Tag,
  Users,
  BarChart3,
  Settings,
  Calendar,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import { Logo, MobileLogo } from "@/components/ui/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Approval Queue",
      href: "/admin/approvals",
      icon: Shield,
      badge: "30min",
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: Building2,
    },
    {
      name: "Offers",
      href: "/admin/offers",
      icon: Tag,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Commission & Pricing",
      href: "/admin/pricing",
      icon: DollarSign,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Events & Seasons",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-banner-background border-b border-red-500 sticky top-0 z-40">
          {/* Mobile/Tablet Header */}
          <div className="flex lg:hidden items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
            {/* Mobile Logo */}
            <Link href="/admin/dashboard" className="flex-shrink-0">
              <MobileLogo />
            </Link>

            {/* Mobile Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Home Icon */}
              <Link
                href="/"
                className="w-8 h-8 sm:w-10 sm:h-10 border border-red-500 rounded-lg flex items-center justify-center bg-transparent hover:bg-red-500/10 transition-colors"
                title="Go to Home"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </Link>

              {/* Menu Icon */}
              <button
                onClick={toggleMenu}
                className="w-8 h-8 sm:w-10 sm:h-10 border border-red-500 rounded-lg flex items-center justify-center bg-transparent hover:bg-red-500/10 transition-colors"
                title="Open Menu"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                )}
              </button>

              {/* Admin Icon */}
              <Link
                href="/admin/settings"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Admin Settings"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block px-4 sm:px-6 lg:px-8">
            <div className="max-w-[130rem] mx-auto">
              {/* Top Row - Logo and Actions */}
              <div className="flex items-center justify-between py-4">
                <Link href="/">
                  <Logo />
                </Link>
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-red-500 transition-colors p-2"
                    title="Go to Home"
                  >
                    <Home size={20} />
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="whitespace-nowrap flex items-center gap-3 font-semibold bg-red-500 text-white px-4 py-1.5 rounded-3xl hover:bg-red-600 transition-all"
                  >
                    Admin Panel
                    <span className="text-white border border-white rounded-full text-base">
                      <Shield size={16} />
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation Row */}
              <div className="border-t border-red-500/20 pt-4 pb-4">
                <nav className="flex items-center justify-center gap-2 xl:gap-4 text-smoky-white font-semibold overflow-x-auto">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-1.5 xl:gap-2 transition-colors hover:text-red-500 text-xs xl:text-sm whitespace-nowrap px-2 py-1.5 rounded-lg hover:bg-red-500/10 relative",
                          pathname === item.href &&
                            "text-red-500 bg-red-500/10"
                        )}
                      >
                        <Icon size={16} className="xl:w-5 xl:h-5" />
                        <span className="hidden xl:inline">{item.name}</span>
                        <span className="xl:hidden text-[10px]">{item.name.split(' ')[0]}</span>
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
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
              <div className="flex items-center justify-between px-4 py-4 border-b border-red-500">
                <Link href="/admin/dashboard" onClick={closeMenu}>
                  <MobileLogo />
                </Link>
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="w-10 h-10 border border-red-500 rounded-lg flex items-center justify-center bg-transparent hover:bg-red-500/10 transition-colors"
                  >
                    <Home className="w-5 h-5 text-red-500" />
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <Link
                    href="/admin/settings"
                    onClick={closeMenu}
                    className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </Link>
                </div>
              </div>

              {/* Menu Content */}
              <div className="flex flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
                {/* Main Navigation Links */}
                <nav className="flex-1 flex flex-col gap-4 sm:gap-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "text-smoky-white text-lg sm:text-xl font-semibold hover:text-red-500 transition-colors flex items-center gap-3 relative py-2 px-3 rounded-lg hover:bg-red-500/10",
                          pathname === item.href && "text-red-500 bg-red-500/10"
                        )}
                      >
                        <Icon size={20} className="sm:w-6 sm:h-6" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {pathname === item.href && (
                          <span className="text-red-500 text-lg">→</span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* User Info and Logout */}
                <div className="space-y-4 pt-6 sm:pt-8">
                  <div className="flex items-center space-x-3 p-3 bg-red-500/10 rounded-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-semibold text-sm sm:text-base truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Administrator
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 text-red-500 hover:text-red-400 font-semibold text-base sm:text-lg transition-colors w-full p-3 rounded-lg hover:bg-red-500/10"
                  >
                    <LogOut size={18} className="sm:w-5 sm:h-5" />
                    Logout
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
    </ProtectedRoute>
  );
}

