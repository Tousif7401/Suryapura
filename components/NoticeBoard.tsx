'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function NoticeBoard() {
  const t = useTranslations();

  const notices = [
    {
      image: "/photos/Gemini_Generated_Image_5gp5cp5gp5cp5gp5.png",
      alt: "Agriculture Meeting",
      badge: t('badge_urgent'),
      badgeColor: "bg-red-600",
      tagKey: "tag_meeting",
      titleKey: "news1_title",
      descKey: "news1_desc"
    },
    {
      image: "/photos/Gemini_Generated_Image_rij25xrij25xrij2.png",
      alt: "CC Road Construction",
      badge: null,
      badgeColor: null,
      tagKey: "tag_infra",
      titleKey: "news2_title",
      descKey: "news2_desc"
    },
  ];

  return (
    <section id="updates" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mb-8 ink-underline">
          {t('sec_news_title')}
        </h3>

        <div className="flex overflow-x-auto gap-5 pb-8 no-scrollbar snap-x">
          {notices.map((notice, index) => (
            <div key={index} className="snap-center shrink-0 w-[85vw] sm:w-80 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-gray-100 relative">
                <Image
                  src={notice.image}
                  alt={notice.alt}
                  fill
                  className="w-full h-full object-cover"
                />
                {notice.badge && (
                  <div className={`absolute top-2 right-2 ${notice.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                    {notice.badge}
                  </div>
                )}
              </div>
              <div className="p-5 flex-1">
                <span className="text-brand-forest text-xs font-bold">{t(notice.tagKey)}</span>
                <h4 className="font-bold text-gray-900 mt-2 leading-snug">{t(notice.titleKey)}</h4>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{t(notice.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
