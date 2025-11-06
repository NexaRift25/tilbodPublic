"use client";

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { locales } from '@/i18n';

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    setIsOpen(false);
    
    // Remove current locale from pathname
    let pathWithoutLocale = pathname;
    locales.forEach((loc) => {
      if (pathname.startsWith(`/${loc}`)) {
        pathWithoutLocale = pathname.replace(`/${loc}`, '') || '/';
      }
    });
    
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    router.refresh();
  };
  
  // Reset loading state when locale changes
  useEffect(() => {
    setIsLoading(false);
  }, [locale]);

  const languageNames: Record<string, string> = {
    en: 'English',
    is: 'Íslenska'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        disabled={isLoading}
        className="relative flex items-center gap-2 px-3 py-2 border border-primary rounded-lg bg-transparent hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Switch language"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-spin" />
        ) : (
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        )}
        <span className="text-primary text-xs sm:text-sm font-semibold hidden sm:inline">
          {isLoading ? t('common.loading') : (languageNames[locale] || locale.toUpperCase())}
        </span>
        {/* Language Code Badge */}
        {!isLoading && (
          <span className="absolute -top-1.5 -right-1.5 bg-primary text-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
            {locale.toUpperCase()}
          </span>
        )}
      </button>

      {isOpen && !isLoading && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-20 bg-card-background border border-primary rounded-lg shadow-lg min-w-[120px]">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors first:rounded-t-lg last:rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  locale === loc
                    ? 'bg-primary text-dark'
                    : 'text-smoky-white hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {languageNames[loc]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

