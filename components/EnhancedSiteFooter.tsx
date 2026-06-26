'use client';

import { useTranslations } from 'next-intl';

export default function EnhancedSiteFooter() {
  const t = useTranslations();

  return (
    <footer id="helpline" className="bg-[#1A1A1A] text-gray-300 pt-12 pb-32 md:pb-8 border-t-[6px] border-brand-saffron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full border-2 border-brand-saffron relative">
                <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-brand-forest rounded-full" />
              </div>
              <h3 className="font-bold text-white text-lg">{t('portal_name')}</h3>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              ग्राम पंचायत सूर्यपुरा का आधिकारिक ई-गवर्नेंस पोर्टल। पारदर्शिता, जवाबदेही और जन-सहभागिता से गाँव का विकास।
            </p>
          </div>

          {/* Helpline Section */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-white mb-3">जन-सुनवाई / Helpline</h4>
            <p className="text-sm opacity-70 mb-3">{t('footer_sub')}</p>

            {/* Phone - Fixed responsive sizing */}
            <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
              <div className="bg-brand-saffron text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold text-white font-['Inter']">+91 98765-4321</span>
            </div>

            <div className="mt-3">
              <a href="tel:1076" className="text-sm text-brand-saffron hover:underline">सीएम हेल्पलाइन: 1076</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs opacity-50 font-medium tracking-wide pt-6 border-t border-white/10">
          <p>&copy; 2026 {t('portal_name')} | राष्ट्रीय सूचना विज्ञान केंद्र</p>
        </div>
      </div>
    </footer>
  );
}
