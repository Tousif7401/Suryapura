import { Noto_Sans_Devanagari, Noto_Sans_Kannada, Inter } from 'next/font/google';

export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

export const notoSansKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-noto-kannada',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
