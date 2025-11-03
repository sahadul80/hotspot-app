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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white text-shadow mb-3">
              SRJ Internet
            </h1>
            <p className="text-blue-100 text-lg">
              Reliable High-Speed Internet Services
            </p>
            <div className="flex justify-center mt-4 space-x-2 text-blue-200 text-sm">
              <span>⚡ Fast</span>
              <span>•</span>
              <span>🔒 Secure</span>
              <span>•</span>
              <span>📶 Reliable</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
            {/* Left Column - Login Form & Logos */}
            <div className="xl:col-span-5 space-y-6">
              {/* Login Form */}
              <div className="animate-slide-in-left">
                <LoginForm 
                  lang={lang} 
                  messages={messages} 
                  config={config}
                  onLogin={handleLogin}
                />
              </div>
              
              {/* Logos */}
              <div className="flex flex-row justify-center items-center gap-4 animate-fade-in">
                <div className="card p-4 flex-1 max-w-xs">
                  <div className="rounded-lg w-full h-24 flex items-center justify-center bg-surface">
                    <Image
                      src="/img/logo.png"
                      alt="SRJ Internet Logo"
                      width={200}
                      height={80}
                      className="rounded-lg object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="card p-4 flex-1 max-w-xs">
                  <div className="rounded-lg w-full h-24 flex items-center justify-center bg-surface">
                    <Image
                      src="/img/logo2.png"
                      alt="SRJ Internet Logo 2"
                      width={200}
                      height={80}
                      className="rounded-lg object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* Contact Information */}
              <div className="animate-fade-in">
                <div className="card overflow-hidden">
                  <div className="bg-success p-6 text-center">
                    <h3 className="text-xl font-bold text-text-primary text-shadow">
                      {messages.home.connection}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-text-primary mb-4">
                        {messages.home.callForConnection}
                      </h4>
                      
                      {/* Phone Numbers */}
                      <div className="card bg-primary bg-opacity-10 border-primary border-opacity-20 p-4 mb-4">
                        <div className="flex flex-col space-y-3">
                          <a 
                            href="tel:+8801515213101"
                            className="btn btn-outline justify-center py-3 text-lg font-bold hover:bg-primary hover:text-white transition-all"
                          >
                            <span className="flex items-center space-x-2">
                              <span>📞</span>
                              <span>+880 151 521 3101</span>
                            </span>
                          </a>
                          <a 
                            href="tel:+8801994666595"
                            className="btn btn-outline justify-center py-3 text-lg font-bold hover:bg-primary hover:text-white transition-all"
                          >
                            <span className="flex items-center space-x-2">
                              <span>📞</span>
                              <span>+880 199 466 6595</span>
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Office Location */}
                      <div className="card bg-surface p-4 mb-4">
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
            
            {/* Right Column - Home Packages */}
            <div className="xl:col-span-7 animate-slide-in-right">
                <PricingTable messages={messages.pricing} />
            </div>
          </div>

          {/* Bottom Section - Contact & Pricing */}
          {/* Pricing Table */}
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <HomePackages messages={messages.home} />
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