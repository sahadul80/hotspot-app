// src/components/common/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, Locale } from '../lib/i18n';
import { useState } from 'react';

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLang: Locale) => {
    if (!pathname) return;
    
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const languageNames = {
    en: 'English',
    bn: 'বাংলা'
  };

  const languageFlags = {
    en: '🇺🇸',
    bn: '🇧🇩'
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Desktop/Tablet - Select Dropdown */}
      <div className="hidden sm:block">
        <select 
          value={currentLang} 
          onChange={(e) => switchLanguage(e.target.value as Locale)}
          className="form-input bg-surface border-border text-text-primary font-medium cursor-pointer pr-8 appearance-none"
          aria-label="Select language"
        >
          {locales.map((lang) => (
            <option key={lang} value={lang}>
              {languageFlags[lang]} {languageNames[lang]}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Mobile - Custom Dropdown */}
      <div className="sm:hidden relative">
        <button
          onClick={toggleDropdown}
          className="btn btn-outline flex items-center space-x-2 bg-surface border-border text-text-primary font-medium"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>{languageFlags[currentLang]}</span>
          <span className="text-sm">{languageNames[currentLang]}</span>
          <svg 
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right animate-scale-in card elevation-3 border-border overflow-hidden">
            <div className="py-1 bg-surface" role="menu" aria-orientation="vertical">
              {locales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center space-x-3 ${
                    currentLang === lang 
                      ? 'bg-primary text-white' 
                      : 'text-text-primary hover:bg-surface-dark'
                  }`}
                  role="menuitem"
                >
                  <span className="text-base">{languageFlags[lang]}</span>
                  <span className={currentLang === lang ? 'font-semibold' : ''}>
                    {languageNames[lang]}
                  </span>
                  {currentLang === lang && (
                    <span className="ml-auto">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 sm:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}