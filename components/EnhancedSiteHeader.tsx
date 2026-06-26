'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '../i18n/routing';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AccessibilityTools from './AccessibilityTools';

export default function EnhancedSiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState(locale);

  useEffect(() => {
    setCurrentLang(locale);
  }, [locale]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setCurrentLang(newLocale);
    // Use router.push to preserve current path and scroll position
    router.push(pathname, { locale: newLocale, scroll: false });
  };

  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-brand-forest text-white text-xs py-1.5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="opacity-80">भारत सरकार</span>
            <span className="opacity-60">|</span>
            <span className="font-semibold">Government of India</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="opacity-80">Skip to Main Content</span>
            <span className="opacity-80">|</span>
            <span className="opacity-80">Screen Reader</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-[#F7F4EF]/95 backdrop-blur-md border-b border-brand-earth/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">

          {/* Logo Section with Government Emblem */}
          <div className="flex items-center gap-3">
            {/* Official Emblem of India - SVG from public folder */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <Image
                src="/Emblem_of_India.svg"
                alt="Emblem of India | भारत का प्रतीक चिह्न"
                width={48}
                height={48}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="font-extrabold text-lg md:text-xl text-brand-forest leading-tight tracking-tight">
                {t('portal_name')}
              </h1>
              <span className="text-[0.65rem] sm:text-[11px] font-bold text-brand-saffron tracking-widest uppercase">
                {t('portal_sub')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 font-medium text-brand-forest/80">
            <Link href="#services" className="hover:text-brand-saffron transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('nav_schemes')}
            </Link>
            <Link href="#gallery" className="hover:text-brand-saffron transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('nav_gallery')}
            </Link>
            <Link href="#updates" className="hover:text-brand-saffron transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              {t('nav_updates')}
            </Link>
            <Link href="#helpline" className="hover:text-brand-saffron transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('nav_contact')}
            </Link>
          </nav>

          {/* Language & Accessibility */}
          <div className="flex items-center gap-3">
            <select
              value={currentLang}
              onChange={handleLanguageChange}
              className="bg-white border border-gray-200 text-sm font-semibold text-brand-forest py-1.5 px-3 rounded-md shadow-sm focus:ring-2 focus:ring-brand-saffron outline-none cursor-pointer hover:border-brand-saffron transition"
            >
              <option value="hi">हिंदी</option>
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
            <AccessibilityTools />
          </div>
        </div>
      </header>
    </>
  );
}
