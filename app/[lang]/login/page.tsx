// src/app/[lang]/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMessages } from '../../lib/i18n';
import LoginForm from '../../components/LoginForm';
import PricingTable from '../../components/PricingTable';
import HomePackages from '../../components/HomePackages';
import { Locale } from '../../lib/i18n';
import { LoginData, HotspotConfig } from '../../lib/types';
import Image from 'next/image';

interface LoginPageProps {
  params: Promise<{ lang: Locale }>;
}

export default function LoginPage({ params }: LoginPageProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Locale>('en');
  const [messages, setMessages] = useState(getMessages('en'));
  const [isParamsResolved, setIsParamsResolved] = useState(false);

  // mobile slide-over state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Simulate hotspot configuration - in real app, this would come from API
  const [config] = useState<HotspotConfig>({
    chapId: 'chap123',
    chapChallenge: 'challenge456',
    trial: true,
    error: ''
  });

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

  const handleLogin = async (loginData: LoginData) => {
    console.log('Login attempt:', loginData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, always succeed and redirect to status page
    router.push(`/${lang}/status`);
  };

  // Show loading state until params are resolved
  if (!isParamsResolved) {
    return (
      <div className="min-h-screen background flex items-center justify-center">
        <div className="card p-8 text-center animate-fade-in">
          <div className="spinner border-primary border-t-transparent h-12 w-12 mx-auto mb-4"></div>
          <p className="text-text-secondary">{messages.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky highlighted mobile button (top-left) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden flex items-center space-x-2 px-4 py-3 rounded-full shadow-xl ring-2 ring-primary/60 animate-pulse bg-primary text-white font-semibold"
        aria-label="Open login options"
      >
        <span>🔐</span>
        <span>Login</span>
      </button>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          {/* slide-over panel */}
          <div className="absolute left-0 top-0 bottom-0 right-0 w-full max-w-md bg-background shadow-2xl overflow-auto">
            <div className="p-4 flex items-center justify-between border-b border-muted">
              <h3 className="text-lg font-bold">Login</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn btn-ghost"
                aria-label="Close login panel"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <LoginForm
                lang={lang}
                messages={messages}
                config={config}
                onLogin={async (data) => {
                    setMobileOpen(false);
                    await handleLogin(data);
                }}
              />
              {/* Logos (mobile) */}
              <div className="flex items-center justify-center space-x-4 mt-2">
                <div className="rounded-lg w-32 h-14 flex items-center justify-center bg-surface p-2">
                  <Image src="/img/logo.png" alt="SRJ Internet Logo" width={160} height={48} className="object-contain" />
                </div>
                <div className="rounded-lg w-32 h-14 flex items-center justify-center bg-surface p-2">
                  <Image src="/img/logo2.png" alt="SRJ Internet Logo 2" width={160} height={48} className="object-contain" />
                </div>
              </div>

              {/* Contact quick links */}
              <div className="mt-4">
                <a href="tel:+8801515213101" className="btn btn-outline w-full mb-2">
                  📞 +880 151 521 3101
                </a>
                <a href="tel:+8801994666595" className="btn btn-outline w-full">
                  📞 +880 199 466 6595
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto"> {/* reserve space for fixed right sidebar on md+ */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center animate-fade-in m-2 sm:m-4">
            <h1 className="text-4xl font-bold text-shadow">
              SRJ Internet
            </h1>
            <p className="text-lg">
              Reliable High-Speed Internet Services
            </p>
            <div className="flex justify-center space-x-2 text-sm">
              <span>⚡ Fast</span>
              <span>•</span>
              <span>🔒 Secure</span>
              <span>•</span>
              <span>📶 Reliable</span>
            </div>
          </div>
        <div>
            
        <div className='flex justify-center sm:justify-between'>
            <div className="md:w-2/3">
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <HomePackages messages={messages.home} />
          </div>

          {/* Main Content Grid (left/main content) */}
          <div className="grid grid-cols-1 gap-4">
            {/* Main area - Pricing / Packages */}
            <div className="animate-slide-in-right">
              <PricingTable messages={messages.pricing} />
            </div>
          </div>

          {/* Contact Section - Moved from sticky sidebar to just above footer */}
          <div className="mt-8 animate-fade-in">
            <div className="card overflow-hidden">
              <div className="bg-success p-2 text-center">
                <h3 className="text-xl font-bold text-text-primary text-shadow">
                  {messages.home.connection}
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-text-primary mb-4">
                    {messages.home.callForConnection}
                  </h4>

                  <div className="flex flex-col md:flex-row justify-center">
                    {/* Phone Numbers */}
                  <div className="card bg-primary bg-opacity-10 border-primary border-opacity-20 p-2">
                    <div className="flex flex-col justify-center">
                      <a
                        href="tel:+8801515213101"
                        className="btn btn-outline justify-center text-lg font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        <span className="flex items-center">
                          <span>📞</span>
                          <span>+880 151 521 3101</span>
                        </span>
                      </a>
                      <a
                        href="tel:+8801994666595"
                        className="btn btn-outline justify-center text-lg font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        <span className="flex items-center">
                          <span>📞</span>
                          <span>+880 199 466 6595</span>
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Office Location */}
                  <div className="card bg-surface p-2">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary text-lg mt-1">🏢</span>
                      <div className="text-left">
                        <p className="font-semibold text-text-primary">{messages.home.office}</p>
                        <p className="text-text-secondary text-sm">
                          খান পাড়া রোড, ঠেঙামারা অফিসের পাশে
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center rounded-lg p-2">
                    <Image
                        src="/img/logo.png"
                        alt="brand logo"
                        width={220}
                        height={0}
                    />
                    <Image
                        src="/img/logo2.png"
                        alt="brand logo"
                        width={220}
                        height={0}
                    />
                  </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center justify-center space-x-2 p-2 bg-success bg-opacity-10 rounded-lg">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      <span className="text-text-primary">24/7 Support</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-2 bg-success bg-opacity-10 rounded-lg">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      <span className="text-text-primary">Free Installation</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-2 bg-success bg-opacity-10 rounded-lg">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      <span className="text-text-primary">Unlimited Data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
            

          {/* RIGHT SIDEBAR - fixed on md+ (login form and logos only) */}
            <aside
                className="hidden md:block md:fixed md:top-[10%] md:right-0 md:w-1/3 md:h-screen overflow-auto z-40"
                aria-label="Login sidebar"
            >
                <div className="space-y-2">
                {/* Card with login form */}
                <div className="card p-2 sticky">
                    <LoginForm
                    lang={lang}
                    messages={messages}
                    config={config}
                    onLogin={handleLogin}
                    />
                    {/* Logos */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <div className="card p-2 sm:p-4 flex-1 max-w-xs">
                        <div className="rounded-lg w-full h-24 flex items-center justify-center bg-surface">
                            <Image
                            src="/img/logo.png"
                            alt="SRJ Internet Logo"
                            width={200}
                            height={60}
                            className="rounded-lg object-contain"
                            priority
                            />
                        </div>
                        </div>
                        <div className="card p-2 sm:p-4 flex-1 max-w-xs">
                        <div className="rounded-lg w-full h-24 flex items-center justify-center bg-surface">
                            <Image
                            src="/img/logo2.png"
                            alt="SRJ Internet Logo 2"
                            width={200}
                            height={60}
                            className="rounded-lg object-contain"
                            priority
                            />
                        </div>
                        </div>
                    </div>

                    <div className="text-center text-sm text-muted">
                        <p>© {new Date().getFullYear()} SRJ Internet</p>
                    </div>
                </div>
                </div>
            </aside>

        </div>
          
    </div>

          {/* Footer */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-white text-opacity-80 space-y-2">
              <p className="text-sm">
                © {new Date().getFullYear()} SRJ Internet. All rights reserved.
              </p>
              <p className="text-xs text-blue-200">
                Providing reliable internet services since 2010 • Connecting communities with high-speed internet
              </p>
              <div className="flex justify-center space-x-4 text-xs text-blue-200 mt-2">
                <span>📧 support@srjinternet.com</span>
                <span>•</span>
                <span>🌐 www.srjinternet.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}