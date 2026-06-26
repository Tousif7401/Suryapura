import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher that excludes certain paths and only matches paths that need internationalization
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(hi|en|kn)/:path*',

    // Enable redirects that have missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // Regex matches: /pathnames, /pathnames/, /pathnames/foo
    // but not: /api, /_next, /favicon.ico, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
