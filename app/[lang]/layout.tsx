// src/app/[lang]/layout.tsx
import { locales } from '../lib/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Locale } from '../lib/i18n';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function LangLayout({
  children,
  params
}: LangLayoutProps) {
  // Await the params in server component
  const { lang } = await params;

  return (
    <div className="relative">
      <LanguageSwitcher currentLang={lang} />
      {children}
    </div>
  );
}