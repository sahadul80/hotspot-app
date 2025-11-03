// src/app/[lang]/layout.tsx
import { locales, type Locale } from '../lib/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Change to string instead of Locale
}

export default async function LangLayout({
  children,
  params
}: LangLayoutProps) {
  const { lang } = await params;
  
  // Validate and type-cast the lang parameter
  const validatedLang = locales.includes(lang as Locale) ? (lang as Locale) : 'en';

  return (
    <div className="relative">
      <LanguageSwitcher currentLang={validatedLang} />
      {children}
    </div>
  );
}