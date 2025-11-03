// src/components/payment/PaymentModal.tsx
'use client';

import { useState } from 'react';
import { HomePackage, PaymentMethod, PaymentData, PaymentMessages } from '../lib/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: HomePackage;
  messages: PaymentMessages;
  onPaymentSubmit: (data: PaymentData) => Promise<void>;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    description: 'Pay with Visa, MasterCard, or American Express'
  },
  {
    id: 'mobile',
    name: 'Mobile Banking',
    icon: '📱',
    description: 'Pay with bKash, Nagad, or Rocket'
  },
  {
    id: 'internet',
    name: 'Internet Banking',
    icon: '🏦',
    description: 'Pay through your bank account'
  }
];

export default function PaymentModal({ isOpen, onClose, package: pkg, messages, onPaymentSubmit }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const paymentData: PaymentData = {
        package: pkg,
        method: selectedMethod,
        amount: pkg.price,
        ...(selectedMethod === 'mobile' && { phone: phoneNumber }),
        ...(selectedMethod === 'card' && {
          cardNumber,
          expiry: expiryDate,
          cvv
        })
      };

      await onPaymentSubmit(paymentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : messages.error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setSelectedMethod('');
    setPhoneNumber('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="bg-primary p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold text-shadow">{messages.title}</h4>
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-200 text-2xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label="Close payment modal"
              disabled={isProcessing}
            >
              ×
            </button>
          </div>
          <div className="text-start">
            {pkg.speed} Package <br/> {pkg.price}/month
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-2 sm:p-4 space-y-2">
          {/* Payment Methods */}
          <div>
            <h4 className="text-text-primary high-contrast">
              {messages.selectMethod}
            </h4>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`w-full text-left p-2 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'border-primary bg-background elevation-1'
                      : 'border-border bg-surface hover:border-primary hover:elevation-1'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={isProcessing}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${
                        selectedMethod === method.id ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {method.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {method.description}
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Banking Form */}
          {selectedMethod === 'mobile' && (
            <div className="animate-fade-in space-y-3">
              <label htmlFor="phoneNumber" className="form-label">
                {messages.phoneNumber}
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="form-input"
                required
                disabled={isProcessing}
                aria-describedby="phone-help"
              />
              <p id="phone-help" className="text-text-secondary text-sm">
                Enter your bKash, Nagad, or Rocket mobile number
              </p>
            </div>
          )}

          {/* Card Form */}
          {selectedMethod === 'card' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="cardNumber" className="form-label">
                  {messages.cardNumber}
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="1234 5678 9012 3456"
                  className="form-input"
                  required
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="form-label">
                    {messages.expiryDate}
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{0,2})/, '$1/$2'))}
                    placeholder="MM/YY"
                    className="form-input"
                    required
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="form-label">
                    {messages.cvv}
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    className="form-input"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <p className="text-text-secondary text-sm">
                Your card details are secure and encrypted
              </p>
            </div>
          )}

          {/* Internet Banking Info */}
          {selectedMethod === 'internet' && (
            <div className="p-4 bg-warning rounded-lg animate-fade-in">
              <div className="flex items-start space-x-3">
                <span className="text-lg">ℹ️</span>
                <div>
                  <h5 className="font-medium">Internet Banking</h5>
                  <h6 className="font-base">
                    You will be redirected to your bank's secure payment gateway to complete the transaction.
                  </h6>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div 
              className="p-4 bg-error text-white rounded-lg elevation-1 animate-fade-in"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 btn btn-outline py-3 font-semibold"
              disabled={isProcessing}
            >
              {messages.cancel}
            </button>
            <button
              type="submit"
              disabled={!selectedMethod || isProcessing}
              className="flex-1 btn btn-success py-3 font-semibold hover:elevation-1 transition-all"
              aria-busy={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="spinner border-white border-t-transparent"></div>
                  <span>{messages.processing}</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>💰</span>
                  <span>{messages.proceed}</span>
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="px-6 pb-6 border-t border-border pt-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-success">
              <span className="text-lg">🔒</span>
              <span className="text-sm font-medium">Secure Payment Encrypted</span>
            </div>
            <p className="text-text-secondary text-xs">
              Your payment information is protected with bank-level SSL encryption and never stored on our servers
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
              <span>PCI DSS Compliant</span>
              <span>•</span>
              <span>256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}