'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative bg-brand-forest pt-12 pb-16 md:pt-20 md:pb-24 border-b-[6px] border-brand-saffron overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/woven-light.png')"}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 text-center md:text-left order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-brand-sand text-[11px] font-bold px-4 py-1.5 rounded-sm mb-6 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-saffron animate-pulse"></span>
            <span>{t('hero_badge')}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            <span>{t('hero_title1')}</span><br />
            <span className="text-brand-saffron">{t('hero_title2')}</span>
          </h2>

          <p className="text-brand-sand/90 text-[1.1rem] md:text-xl mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
            {t('hero_desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button className="w-full sm:w-auto bg-brand-saffron hover:bg-[#C8491A] text-white font-bold text-[15px] py-3.5 px-6 rounded-md shadow-[0_4px_14px_0_rgba(226,88,34,0.39)] transform transition active:translate-y-1 flex justify-center items-center gap-2">
              <span>{t('btn_id')}</span>
            </button>
            <a href="tel:1076" className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border border-white/30 font-semibold text-[15px] py-3.5 px-6 rounded-md transition text-center flex justify-center items-center gap-2">
              <span>📞</span> <span>{t('btn_call')}</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center relative order-1 md:order-2 px-6">
          <div className="relative bg-[#FFFDF9] p-3 shadow-2xl transform rotate-2 max-w-sm w-full">
            <div className="border border-brand-earth/20 p-1">
              {/*
                PRADHAN PHOTO:
                Official Gram Pradhan photo from /public/pradhan_DP.png
              */}
              <Image
                src="/pradhan_DP.png"
                alt="श्री रामनाथ चौधरी - ग्राम प्रधान सूर्यपुरा"
                width={400}
                height={500}
                className="w-full aspect-[4/5] object-cover filter contrast-125 sepia-[.2]"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 bg-white border-l-4 border-brand-saffron px-5 py-3 shadow-lg">
              <p className="font-extrabold text-brand-forest text-[1.1rem]">{t('leader_name')}</p>
              <p className="text-[11px] text-brand-earth font-bold uppercase tracking-wide mt-0.5">{t('leader_role')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
