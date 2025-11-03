// src/components/login/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hexMD5 } from '../lib/md5';
import { LoginData, HotspotConfig, Messages } from '../lib/types';

interface LoginFormProps {
  lang: string;
  messages: Messages;
  config: HotspotConfig;
  onLogin?: (data: LoginData) => Promise<void>;
}

export default function LoginForm({ lang, messages, config, onLogin }: LoginFormProps) {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState<'voucher' | 'member'>('voucher');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (mode: 'voucher' | 'member') => {
    setLoginMode(mode);
    setError(null);
    if (mode === 'voucher') {
      setFormData(prev => ({ ...prev, password: prev.username }));
    } else {
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      username: value,
      password: loginMode === 'voucher' ? value : prev.password
    }));
    setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, password: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let passwordToSubmit = formData.password;

      // Handle CHAP authentication if configured
      if (config.chapId && config.chapChallenge && loginMode === 'member') {
        passwordToSubmit = hexMD5(config.chapId + formData.password + config.chapChallenge);
      }

      const loginData: LoginData = {
        username: formData.username,
        password: passwordToSubmit,
        mode: loginMode
      };

      // If custom onLogin handler is provided, use it
      if (onLogin) {
        await onLogin(loginData);
      } else {
        // Default behavior: simulate login and redirect
        console.log('Login attempt:', loginData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push(`/${lang}/status`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card elevation-2 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-primary p-6 text-center">
        <h2 className="text-2xl font-bold text-white text-shadow">
          {messages.login.title}
        </h2>
        <p className="text-blue-100 mt-2 text-sm">
          {loginMode === 'voucher' ? 'Use your voucher code' : 'Enter your credentials'}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mode Selector */}
          <div className="flex space-x-3 mb-2">
            <button
              type="button"
              className={`flex-1 btn text-center font-medium ${
                loginMode === 'voucher' 
                  ? 'btn-primary shadow-md' 
                  : 'btn-outline text-text-secondary hover:bg-surface-dark'
              }`}
              onClick={() => handleModeChange('voucher')}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>🎫</span>
                <span>{messages.login.voucher}</span>
              </span>
            </button>
            <button
              type="button"
              className={`flex-1 btn text-center font-medium ${
                loginMode === 'member' 
                  ? 'btn-primary shadow-md' 
                  : 'btn-outline text-text-secondary hover:bg-surface-dark'
              }`}
              onClick={() => handleModeChange('member')}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>👤</span>
                <span>{messages.login.member}</span>
              </span>
            </button>
            <button
              type="button"
              className="flex-1 btn btn-outline text-center font-medium hover:bg-surface-dark"
              onClick={() => window.open('https://laksa19.github.io/myqr', '_blank')}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>{messages.login.qrCode}</span>
              </span>
            </button>
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <label htmlFor="username" className="form-label sr-only">
              {loginMode === 'voucher' ? messages.login.voucher : messages.common.username}
            </label>
            <input
              id="username"
              className="form-input text-center text-lg py-3"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleUsernameChange}
              placeholder={loginMode === 'voucher' ? messages.login.voucher : messages.common.username}
              required
              disabled={isLoading}
              aria-describedby={loginMode === 'voucher' ? 'voucher-help' : 'username-help'}
            />
            {loginMode === 'voucher' && (
              <p id="voucher-help" className="text-text-secondary text-sm text-center">
                Enter your voucher code to login
              </p>
            )}
          </div>
          
          {/* Password Input (only for member mode) */}
          {loginMode === 'member' && (
            <div className="space-y-2 animate-fade-in">
              <label htmlFor="password" className="form-label sr-only">
                {messages.common.password}
              </label>
              <input
                id="password"
                className="form-input text-center text-lg py-3"
                name="password"
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder={messages.common.password}
                required
                disabled={isLoading}
                aria-describedby="password-help"
              />
              <p id="password-help" className="text-text-secondary text-sm text-center">
                Enter your password for member access
              </p>
            </div>
          )}

          {/* Error Display */}
          {(error || config.error) && (
            <div 
              className="p-4 bg-error text-white rounded-lg text-center animate-fade-in elevation-1"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">{error || config.error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn btn-success text-lg py-3 font-bold hover:elevation-2 transition-all duration-200"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="spinner border-white border-t-transparent"></div>
                  <span>{messages.common.loading}</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>🔐</span>
                  <span>{messages.common.login}</span>
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Trial Link */}
        {config.trial && (
          <div className="mt-6 p-4 bg-primary text-white rounded-lg text-center animate-fade-in elevation-1">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <span className="text-blue-100">{messages.login.trial}</span>
              <button 
                type="button"
                className="text-yellow-300 font-bold hover:text-yellow-200 underline transition-colors"
                onClick={() => {
                  setFormData({ 
                    username: `T-${Math.random().toString(36).substr(2, 9)}`, 
                    password: '' 
                  });
                  setLoginMode('voucher');
                }}
                disabled={isLoading}
              >
                {messages.login.here}
              </button>
            </div>
            <p className="text-blue-100 text-xs mt-2">
              Experience our service with a free trial account
            </p>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="text-text-secondary text-sm flex items-center justify-center space-x-2">
            <span className="text-green-500">🔒</span>
            <span>Secure SSL Encrypted Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}