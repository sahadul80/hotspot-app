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
      <div className="min-h-screen background flex items-center justify-center">
        <div className="card p-8 text-center">
          <div className="spinner border-primary border-t-transparent h-12 w-12 mx-auto mb-4"></div>
          <p className="text-text-secondary">{messages.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen background flex items-center justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="card overflow-hidden">
            <div className="bg-primary p-4 text-center">
              <h1 className="text-xl font-bold text-white">{messages.logout.title}</h1>
            </div>
            
            <div className="p-6">
              {/* Success Message */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-success">{messages.logout.success}</h2>
              </div>

              {/* Session Summary */}
              {user && (
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface p-3 rounded-lg">
                      <div className="text-sm text-text-secondary">User</div>
                      <div className="font-semibold text-text-primary">{user.username}</div>
                    </div>
                    <div className="bg-surface p-3 rounded-lg">
                      <div className="text-sm text-text-secondary">IP Address</div>
                      <div className="font-semibold text-text-primary">{user.ip}</div>
                    </div>
                  </div>
                  
                  <div className="bg-surface p-3 rounded-lg">
                    <div className="text-sm text-text-secondary">MAC Address</div>
                    <div className="font-semibold text-text-primary">{user.mac}</div>
                  </div>
                  
                  <div className="bg-surface p-3 rounded-lg">
                    <div className="text-sm text-text-secondary">Upload | Download</div>
                    <div className="font-semibold text-text-primary">{user.bytesIn} | {user.bytesOut}</div>
                  </div>
                  
                  <div className="bg-surface p-3 rounded-lg">
                    <div className="text-sm text-text-secondary">Session Duration</div>
                    <div className="font-semibold text-text-primary">{user.uptime}</div>
                  </div>
                </div>
              )}

              {/* Login Again Button */}
              <div className="text-center">
                <button
                  onClick={handleLoginAgain}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  {messages.logout.loginAgain}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center text-sm text-text-secondary">
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