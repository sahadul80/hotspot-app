// src/app/[lang]/logout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMessages } from '../../lib/i18n';
import { Locale } from '../../lib/i18n';
import { User } from '../../lib/types';

interface LogoutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default function LogoutPage({ params }: LogoutPageProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Locale>('en');
  const [messages, setMessages] = useState(getMessages('en'));
  const [user, setUser] = useState<User | null>(null);
  const [isParamsResolved, setIsParamsResolved] = useState(false);

  // Handle the async params in useEffect
  useEffect(() => {
    let isMounted = true;

    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        if (isMounted) {
          setLang(resolvedParams.lang);
          setMessages(getMessages(resolvedParams.lang));
          setIsParamsResolved(true);
        }
      } catch (error) {
        console.error('Error resolving params:', error);
        if (isMounted) {
          setIsParamsResolved(true);
        }
      }
    };

    resolveParams();

    return () => {
      isMounted = false;
    };
  }, [params]);

  useEffect(() => {
    if (!isParamsResolved) return;

    // Simulate getting user data before logout
    // In real app, this would come from session
    setUser({
      username: 'user123',
      ip: '192.168.1.100',
      mac: '00:1A:2B:3C:4D:5E',
      bytesIn: '15.2 MB',
      bytesOut: '45.7 MB',
      uptime: '02:15:30'
    });

    // Simulate logout process
    const logoutTimer = setTimeout(() => {
      // Clear session data here in real app
      console.log('User logged out successfully');
    }, 1000);

    return () => clearTimeout(logoutTimer);
  }, [isParamsResolved]);

  const handleLoginAgain = () => {
    router.push(`/${lang}/login`);
  };

  if (!isParamsResolved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-4 text-center">
              <h1 className="text-xl font-bold text-white">{messages.logout.title}</h1>
            </div>
            
            <div className="p-6">
              {/* Success Message */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">{messages.logout.success}</h2>
              </div>

              {/* Session Summary */}
              {user && (
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">User</div>
                      <div className="font-semibold">{user.username}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">IP Address</div>
                      <div className="font-semibold">{user.ip}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">MAC Address</div>
                    <div className="font-semibold">{user.mac}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Upload | Download</div>
                    <div className="font-semibold">{user.bytesIn} | {user.bytesOut}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Session Duration</div>
                    <div className="font-semibold">{user.uptime}</div>
                  </div>
                </div>
              )}

              {/* Login Again Button */}
              <div className="text-center">
                <button
                  onClick={handleLoginAgain}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  {messages.logout.loginAgain}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Thank you for using SRJ Internet services</p>
                <p className="mt-1">We hope to see you again soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}