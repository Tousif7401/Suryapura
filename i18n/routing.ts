import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['hi', 'en', 'kn'],

  // Used when no locale matches
  defaultLocale: 'hi',

  // Always show locale prefix
  localePrefix: 'always',

  // Don't detect locale from browser headers
  localeDetection: false
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
