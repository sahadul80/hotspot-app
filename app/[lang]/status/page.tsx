// src/app/[lang]/status/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMessages } from '../../lib/i18n';
import { Locale } from '../../lib/i18n';
import { User } from '../../lib/types';

interface StatusPageProps {
  params: Promise<{ lang: Locale }>;
}

export default function StatusPage({ params }: StatusPageProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Locale>('en');
  const [messages, setMessages] = useState(getMessages('en'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

    // Simulate fetching user status
    const fetchUserStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      setUser({
        username: 'user123',
        ip: '192.168.1.100',
        mac: '00:1A:2B:3C:4D:5E',
        bytesIn: '15.2 MB',
        bytesOut: '45.7 MB',
        uptime: '02:15:30',
        remainBytesTotal: '1.2 GB',
        sessionTimeLeft: '05:30:00'
      });
      setIsLoading(false);
    };

    fetchUserStatus();
  }, [isParamsResolved]);

  const handleLogout = async () => {
    // Simulate logout
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/${lang}/logout`);
  };

  if (!isParamsResolved || isLoading) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-4 text-center">
              <h1 className="text-xl font-bold text-white">{messages.status.title}</h1>
            </div>
            
            <div className="p-6">
              {/* Welcome Message */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-green-600 mb-2">{messages.common.welcome}!</h2>
                <h3 className="text-lg font-semibold text-gray-800" id="user">
                  {user?.username}
                </h3>
              </div>

              {/* Status Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">{messages.status.ipAddress}</div>
                    <div className="font-semibold">{user?.ip}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">{messages.status.macAddress}</div>
                    <div className="font-semibold">{user?.mac}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">{messages.status.upload} | {messages.status.download}</div>
                  <div className="font-semibold">{user?.bytesIn} | {user?.bytesOut}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">{messages.status.uptime}</div>
                  <div className="font-semibold">{user?.uptime}</div>
                </div>

                {user?.remainBytesTotal && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600">{messages.status.remainingData}</div>
                    <div className="font-semibold text-blue-700">{user.remainBytesTotal}</div>
                  </div>
                )}

                {user?.sessionTimeLeft && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600">{messages.status.remainingTime}</div>
                    <div className="font-semibold text-green-700">{user.sessionTimeLeft}</div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <div className="mt-6">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  {messages.status.logout}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}