// src/app/[lang]/advertisement/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMessages } from '../../lib/i18n';
import { Locale } from '../../lib/i18n';

interface AdvertisementPageProps {
  params: {
    lang: Locale;
  };
  searchParams: {
    redirect?: string;
  };
}

export default function AdvertisementPage({ params, searchParams }: AdvertisementPageProps) {
  const router = useRouter();
  const messages = getMessages(params.lang);

  useEffect(() => {
    // Redirect after 2 seconds as in original code
    const timer = setTimeout(() => {
      if (searchParams.redirect) {
        router.push(searchParams.redirect);
      } else {
        router.push('/');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, searchParams.redirect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Special Offer!</h1>
          <p className="text-gray-600 mb-6">
            Get 50% off on your first month of home internet connection. Limited time offer!
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 font-semibold">
              Contact: 01515-213101 or 01994-666595
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Redirecting in 2 seconds...
          </p>
          <button
            onClick={() => router.push(searchParams.redirect || '/')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}