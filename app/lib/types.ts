// src/lib/types.ts
export interface User {
  username: string;
  ip: string;
  mac: string;
  bytesIn: string;
  bytesOut: string;
  uptime: string;
  remainBytesTotal?: string;
  sessionTimeLeft?: string;
}

export interface LoginData {
  username: string;
  password: string;
  mode: 'voucher' | 'member';
}

export interface HotspotConfig {
  chapId?: string;
  chapChallenge?: string;
  trial: boolean;
  error?: string | null;
}

export interface PricingPlan {
  duration: string;
  price: string;
  speed: string;
}

export interface HomePackage {
  speed: string;
  price: string;
  color: string;
  originalPrice?: string;
  features?: string[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PaymentData {
  package: HomePackage;
  method: string;
  amount: string;
  phone?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

// Messages interfaces for TypeScript
export interface CommonMessages {
  login: string;
  logout: string;
  username: string;
  password: string;
  submit: string;
  cancel: string;
  success: string;
  error: string;
  welcome: string;
  loading: string;
}

export interface LoginMessages {
  title: string;
  voucher: string;
  member: string;
  trial: string;
  here: string;
  qrCode: string;
}

export interface HomeMessages {
  connection: string;
  callForConnection: string;
  office: string;
  packages: string;
}

export interface PricingMessages {
  title: string;
  duration: string;
  price: string;
  speed: string;
  locations: string;
  validity: string;
}

export interface StatusMessages {
  title: string;
  ipAddress: string;
  macAddress: string;
  upload: string;
  download: string;
  uptime: string;
  remainingData: string;
  remainingTime: string;
  logout: string;
}

export interface LogoutMessages {
  title: string;
  success: string;
  loginAgain: string;
}

export interface PaymentMessages {
  title: string;
  selectMethod: string;
  card: string;
  mobile: string;
  internetBanking: string;
  phoneNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  proceed: string;
  cancel: string;
  processing: string;
  success: string;
  error: string;
}

// Main Messages interface
export interface Messages {
  common: CommonMessages;
  login: LoginMessages;
  home: HomeMessages;
  pricing: PricingMessages;
  status: StatusMessages;
  logout: LogoutMessages;
  payment: PaymentMessages;
}