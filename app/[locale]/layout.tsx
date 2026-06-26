import type { Metadata } from "next";
import { notoSansDevanagari, notoSansKannada, inter } from "@/lib/fonts";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const metadata: Metadata = {
  title: "सूर्यपुरा ग्राम विकास पोर्टल",
  description: "ग्राम पंचायत सूर्यपुरा का आधिकारिक ई-गवर्नेंस पोर्टल",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${notoSansDevanagari.variable} ${notoSansKannada.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
