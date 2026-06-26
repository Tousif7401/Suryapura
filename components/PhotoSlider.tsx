'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export default function PhotoSlider() {
  const locale = useLocale();
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const photos = [
    {
      src: '/photos/Gemini_Generated_Image_k79nskk79nskk79n.png',
      alt: 'Suryapura Village - सूर्यपुरा ग्राम',
      caption: 'सूर्यपुरा ग्राम',
      captionEn: 'Suryapura Village'
    },
    {
      src: '/photos/Gemini_Generated_Image_83g1ny83g1ny83g1.png',
      alt: 'Education in Suryapura - सूर्यपुरा में शिक्षा',
      caption: 'शिक्षा की किरण',
      captionEn: 'Education for All'
    },
    {
      src: '/photos/Gemini_Generated_Image_bs5izobs5izobs5i.png',
      alt: 'Farmer with crops - किसान और फसल',
      caption: 'समृद्ध कृषि',
      captionEn: 'Prosperous Agriculture'
    },
    {
      src: '/photos/Gemini_Generated_Image_qhoujrqhoujrqhou.png',
      alt: 'PM Awas Yojana House Distribution - पीएम आवास योजना',
      caption: 'आवास वितरण',
      captionEn: 'Housing for All'
    },
    {
      src: '/photos/Gemini_Generated_Image_odmvmbodmvmbodmv.png',
      alt: 'Village Development - ग्राम विकास कार्य',
      caption: 'ग्रामोन्नति',
      captionEn: 'Village Progress'
    },
    {
      src: '/photos/Gemini_Generated_Image_rfzd68rfzd68rfzd.png',
      alt: 'Women Empowerment - महिला सशक्तिकरण',
      caption: 'नारी शक्ति',
      captionEn: 'Women Empowerment'
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section className="relative bg-brand-forest py-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white ink-underline inline-block">
            {t('slider_title')}
          </h2>
          <p className="text-brand-sand/80 mt-3 text-lg font-medium">
            {t('slider_sub')}
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Image */}
          <div className="relative aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />

            {/* Dark overlay for caption readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                    {locale === 'en' ? photos[currentIndex].captionEn : photos[currentIndex].caption}
                  </h3>
                  <p className="text-brand-sand/90 text-sm md:text-base">
                    {locale === 'en' ? photos[currentIndex].caption : photos[currentIndex].captionEn}
                  </p>
                </div>
                <div className="hidden md:block text-brand-saffron text-5xl opacity-50">
                  {String(currentIndex + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 group"
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6 text-brand-forest group-hover:text-brand-saffron transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 group"
            aria-label="Next photo"
          >
            <svg className="w-6 h-6 text-brand-forest group-hover:text-brand-saffron transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators with Play/Pause Button */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Dots */}
            <div className="flex justify-center gap-3">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-12 h-1.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-brand-saffron w-16'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition hover:scale-110 group"
              aria-label={isPaused ? t('slider_play') : t('slider_pause')}
              title={isPaused ? t('slider_play') : t('slider_pause')}
            >
              {isPaused ? (
                <svg className="w-5 h-5 text-brand-forest group-hover:text-brand-saffron transition" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-brand-forest group-hover:text-brand-saffron transition" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p className="text-brand-sand/80 text-sm leading-relaxed">
            {t('slider_desc')}
          </p>
          <p className="text-brand-sand/60 text-xs mt-2">
            {t('slider_desc_en')}
          </p>
        </div>
      </div>
    </section>
  );
}
