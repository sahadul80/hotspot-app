// src/components/common/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, Locale } from '../lib/i18n';
import { useState, useRef, useEffect } from 'react';

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="fixed top-2 right-2 z-50" ref={dropdownRef}>
      {/* Unified Dropdown for both mobile and desktop */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="btn btn-outline flex items-center space-x-2 bg-surface border border-border text-text-primary font-medium p-2 rounded-lg shadow-sm backdrop-blur-sm"
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          <span className="text-base">{languageFlags[currentLang]}</span>
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
          <div className="absolute right-0 top-full mt-1 origin-top-right animate-scale-in bg-surface border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50">
            <div className="p-1" role="menu" aria-orientation="vertical">
              {locales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`w-full text-left p-2 text-sm transition-colors flex items-center space-x-3 rounded ${
                    currentLang === lang 
                      ? 'bg-primary' 
                      : 'hover:bg-secondary'
                  }`}
                  role="menuitem"
                  type="button"
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
    </div>
  );
}