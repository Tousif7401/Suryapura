'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export default function VillageGallery() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentLocale] = useState(locale);

  const galleryImages = [
    {
      id: 'wheat-crop',
      src: "/anurag-gautam-wE3JiWG54G0-unsplash.jpg",
      alt: "Farmer checking wheat crop in golden field",
      title: 'गेहूं की फसल',
      titleEn: 'Wheat Crop'
    },
    {
      id: 'green-harvest',
      src: "/rajat-sarki-AOhcR6l-KQM-unsplash.jpg",
      alt: "Farmer holding fresh green crops",
      title: 'हरी फसल',
      titleEn: 'Green Harvest'
    },
    {
      id: 'farm-tools',
      src: "/rajesh-ram-HOOKgN_zIY8-unsplash.jpg",
      alt: "Agricultural field with farming tools",
      title: 'कृषि उपकरण',
      titleEn: 'Farm Tools'
    },
    {
      id: 'rice-farming',
      src: "/swastik-arora-N4gyTXi99Zk-unsplash.jpg",
      alt: "Farmer standing in rice paddy field",
      title: 'धान की खेती',
      titleEn: 'Rice Farming'
    },
    {
      id: 'village-scene',
      src: "/alka-jha-5xwBeArXd1E-unsplash.jpg",
      alt: "Rural village scene with traditional houses",
      title: 'ग्राम दृश्य',
      titleEn: 'Village Scene'
    },
    {
      id: 'farmland',
      src: "/darpan-sharma-VSPML6XFzjs-unsplash.jpg",
      alt: "Beautiful farmland with clear sky",
      title: 'खेह-खलिहान',
      titleEn: 'Farmland'
    },
  ];

  return (
    <section id="gallery" className="py-16 border-b border-brand-earth/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center md:text-left">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-forest ink-underline">
          {t('sec_gallery_title')}
        </h3>
        <p className="text-brand-earth/80 mt-2 font-medium">{t('sec_gallery_sub')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleryImages.map((img) => (
          <div key={img.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:border-brand-saffron transition-colors">
            <div className="w-full aspect-square bg-gray-100 overflow-hidden relative">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-3 text-center border-t border-gray-100">
              <p className="font-bold text-sm text-brand-forest">
                {currentLocale === 'en' ? img.titleEn : img.title}
              </p>
              <p className="text-xs text-gray-500">
                {currentLocale === 'en' ? img.title : img.titleEn}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
