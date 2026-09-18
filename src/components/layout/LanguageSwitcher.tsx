'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as 'en' | 'hi' | 'mr' | 'ur';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative inline-block">
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="appearance-none bg-transparent text-sm uppercase tracking-wider px-3 py-1 border border-atelier-soft rounded text-foreground focus:outline-none focus:border-gold transition-colors cursor-pointer disabled:opacity-50"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
        <option value="ur">اردو</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/50">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
