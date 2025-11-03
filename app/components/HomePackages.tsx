// src/components/login/HomePackages.tsx
'use client';

import { useState } from 'react';
import { HomePackage, PaymentData, HomeMessages, PaymentMessages } from '../lib/types';
import PaymentModal from '../components/PaymentModal';

interface HomePackagesProps {
  messages: HomeMessages;
}

export default function HomePackages({ messages }: HomePackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<HomePackage | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const packages: HomePackage[] = [
    { 
      speed: '4Mbps', 
      price: 'TK 399', 
      color: 'bg-pink-500',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation']
    },
    { 
      speed: '7Mbps', 
      price: 'TK 499', 
      color: 'bg-red-500',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation', 'Static IP']
    },
    { 
      speed: '11Mbps', 
      price: 'TK 699', 
      color: 'bg-blue-500',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation', 'Static IP']
    },
    { 
      speed: '15Mbps', 
      price: 'TK 899', 
      color: 'bg-purple-500',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation', 'Static IP', 'Priority Support']
    },
    { 
      speed: '20Mbps', 
      price: 'TK 1149', 
      color: 'bg-green-500',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation', 'Static IP', 'Priority Support']
    },
    { 
      speed: '25Mbps', 
      price: 'TK 1299', 
      color: 'bg-indigo-500',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation', 'Static IP', 'Priority Support']
    },
    { 
      speed: '30Mbps', 
      price: 'TK 1499', 
      color: 'bg-red-600',
      features: ['Unlimited Data', '24/7 Support', 'Free Installation', 'Static IP', 'Priority Support', 'Dedicated Line']
    }
  ];

  // Payment messages - in a real app, these would come from the i18n system
  const paymentMessages: PaymentMessages = {
    title: 'Complete Your Purchase',
    selectMethod: 'Select Payment Method',
    card: 'Credit/Debit Card',
    mobile: 'Mobile Banking',
    internetBanking: 'Internet Banking',
    phoneNumber: 'Mobile Number',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    proceed: 'Proceed to Pay',
    cancel: 'Cancel',
    processing: 'Processing...',
    success: 'Payment Successful!',
    error: 'Payment failed. Please try again.'
  };

  const handlePackageClick = (pkg: HomePackage) => {
    setSelectedPackage(pkg);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call to process payment
      console.log('Processing payment:', paymentData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      alert(`Payment successful! ${paymentData.package.speed} package activated.`);
      setIsPaymentModalOpen(false);
      
      // Reset selected package
      setSelectedPackage(null);
    } catch (error) {
      console.error('Payment failed:', error);
      throw new Error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <>
      <div className="card overflow-hidden elevation-2">
        <div className="bg-accent p-4">
          <h3 className="text-lg font-bold text-white text-center text-shadow">
            {messages.packages}
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {packages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => handlePackageClick(pkg)}
                className={`
                  ${pkg.color} 
                  text-white 
                  rounded-lg 
                  p-4 
                  min-h-[80px] 
                  transform 
                  hover:scale-105 
                  transition-all 
                  duration-200 
                  elevation-2 
                  hover:elevation-3
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-white 
                  focus:ring-opacity-50
                  focus-visible:ring-4
                  focus-visible:ring-opacity-70
                  btn
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between h-full w-full px-8">
                  <div className="">
                    <div className="text-lg font-bold high-contrast">{pkg.speed}</div>
                    <div className="text-sm opacity-90 mt-1">Unlimited Data</div>
                  </div>
                  <div className="">
                    <div className="text-xl font-bold high-contrast">{pkg.price}</div>
                    <div className="text-sm opacity-90">per month</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 text-center text-text-secondary">
            <p className="text-sm">
              <span className="inline-block mr-2">💡</span>
              Click on any package to subscribe instantly
            </p>
          </div>
        </div>
        <div className="bg-accent p-3 text-center">
          <div className="text-white text-sm">
            SRJ Internet - Reliable connectivity for your home
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPackage && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleCloseModal}
          package={selectedPackage}
          messages={paymentMessages}
          onPaymentSubmit={handlePaymentSubmit}
        />
      )}
    </>
  );
}