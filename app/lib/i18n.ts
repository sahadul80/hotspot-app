// src/lib/i18n.ts
export const locales = ['en', 'bn'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];

export const messages = {
  en: {
    common: {
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      submit: 'Submit',
      cancel: 'Cancel',
      success: 'Success',
      error: 'Error',
      welcome: 'Welcome',
      loading: 'Loading...'
    },
    login: {
      title: 'Internet Login',
      voucher: 'Voucher',
      member: 'Member',
      trial: 'Free trial click',
      here: 'here',
      qrCode: 'QR Code'
    },
    pricing: {
      title: 'Wifi Card Prices and Validity',
      duration: 'Duration',
      price: 'Price',
      speed: 'Speed',
      locations: 'Card Purchase Locations',
      validity: 'Validity'
    },
    home: {
      connection: 'We also Provide Home connection',
      callForConnection: 'Call for home WiFi connection',
      office: 'Our Office',
      packages: 'Home Connection Packages'
    },
    status: {
      title: 'Hotspot Status',
      ipAddress: 'IP Address',
      macAddress: 'MAC Address',
      upload: 'Upload',
      download: 'Download',
      uptime: 'Uptime',
      remainingData: 'Remaining Data',
      remainingTime: 'Remaining Time',
      logout: 'Logout'
    },
    logout: {
      title: 'Logout',
      success: 'Logout Successful',
      loginAgain: 'Login Again'
    },
    payment: {
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
    }
  },
  bn: {
    common: {
      login: 'লগইন',
      logout: 'লগআউট',
      username: 'ইউজারনেম',
      password: 'পাসওয়ার্ড',
      submit: 'জমা দিন',
      cancel: 'বাতিল',
      success: 'সফল',
      error: 'ত্রুটি',
      welcome: 'স্বাগতম',
      loading: 'লোড হচ্ছে...'
    },
    login: {
      title: 'ইন্টারনেট লগইন',
      voucher: 'ভাউচার',
      member: 'মেম্বার',
      trial: 'বিনামূল্যে ভাউচার জন্য করুন ক্লিক করুন',
      here: 'এখানে',
      qrCode: 'QR কোড'
    },
    pricing: {
      title: 'ওয়াইফাই কার্ডের দাম এবং মেয়াদ',
      duration: 'মেয়াদ',
      price: 'দাম',
      speed: 'স্পীড',
      locations: 'কার্ড প্রাপ্তির স্থানসমূহ',
      validity: 'মেয়াদ'
    },
    home: {
      connection: 'আমরা বাসার কানেকশনও দেই',
      callForConnection: 'বাসায় ওয়াইফাই কানেকশন নিতে কল করুন',
      office: 'আমাদের অফিস',
      packages: 'বাসা বাড়ির জন্য কানেকশন প্যাকেজ সমুহ'
    },
    status: {
      title: 'হটস্পট স্ট্যাটাস',
      ipAddress: 'আইপি ঠিকানা',
      macAddress: 'ম্যাক ঠিকানা',
      upload: 'আপলোড',
      download: 'ডাউনলোড',
      uptime: 'অ্যাক্টিভ সময়',
      remainingData: 'অবশিষ্ট ডেটা',
      remainingTime: 'অবশিষ্ট সময়',
      logout: 'লগআউট'
    },
    logout: {
      title: 'লগআউট',
      success: 'লগআউট সফল',
      loginAgain: 'আবার লগইন করুন'
    },
    payment: {
      title: 'আপনার ক্রয় সম্পূর্ণ করুন',
      selectMethod: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
      card: 'ক্রেডিট/ডেবিট কার্ড',
      mobile: 'মোবাইল ব্যাংকিং',
      internetBanking: 'ইন্টারনেট ব্যাংকিং',
      phoneNumber: 'মোবাইল নম্বর',
      cardNumber: 'কার্ড নম্বর',
      expiryDate: 'মেয়াদ শেষ হওয়ার তারিখ',
      cvv: 'সিভিভি',
      proceed: 'পেমেন্ট করুন',
      cancel: 'বাতিল',
      processing: 'প্রক্রিয়াকরণ...',
      success: 'পেমেন্ট সফল!',
      error: 'পেমেন্ট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।'
    }
  }
};

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}