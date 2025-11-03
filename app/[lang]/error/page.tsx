// src/app/[lang]/error/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { getMessages } from '../../lib/i18n';
import { Locale } from '../../lib/i18n';

interface ErrorPageProps {
  params: {
    lang: Locale;
  };
  searchParams: {
    error?: string;
  };
}

export default function ErrorPage({ params, searchParams }: ErrorPageProps) {
  const router = useRouter();
  const messages = getMessages(params.lang);
  const errorMessage = searchParams.error || 'An unexpected error occurred';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-red-600 p-4 text-center">
              <h1 className="text-xl font-bold text-white">Hotspot Error</h1>
            </div>
            
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-gray-700 mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
                {errorMessage}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/${params.lang}/login`)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Go to Login Page
                </button>
                
                <button
                  onClick={() => router.back()}
                  className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}