import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tj', 'ru', 'en'],
  defaultLocale: 'tj'
});

// export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);