// Tilbod Platform Types
export type UserRole = 'admin' | 'company_user' | 'end_user';

export interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  verificationMethod?: 'email' | 'google';
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  logo?: string;
  description?: string;
  governmentRegistrationNumber: string;
  taxIdentityNumber: string;
  category: CompanyCategory;
  status: 'pending' | 'approved' | 'rejected' | 'revision_required';
  ownerId: string;
  rejectionReason?: string;
  revisionAttempts: number;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
}

export interface CompanyCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  parentId?: string;
  isActive: boolean;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Offer Types
export type OfferType = 'active_offer' | 'weekdays_offer' | 'happy_hour_offer' | 'gift_card' | 'seasonal_offer';

export interface Offer {
  id: string;
  title: string;
  description: string;
  type: OfferType;
  companyId: string;
  productCategory: ProductCategory;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'revision_required' | 'active' | 'expired';
  pricing: OfferPricing;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  timeConstraints?: {
    startTime: string;
    endTime: string;
    days: string[];
  };
  extensions: number;
  maxExtensions: number;
  revisionAttempts: number;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  activatedAt?: string;
}

export interface OfferPricing {
  basePrice: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    label?: string;
  };
  finalPrice: number;
  commission: {
    type: 'fixed' | 'percentage';
    value: number;
  };
}

// Commission Types
export interface CommissionStructure {
  activeOffer: { type: 'fixed'; value: 1; period: 'day' };
  weekdaysOffer: { type: 'fixed'; value: 4; period: 'week' };
  happyHourOffer: { type: 'fixed'; value: 10; period: 'month' };
  giftCard: { type: 'percentage'; value: number };
}

// Gift Card Types
export interface GiftCard {
  id: string;
  offerId: string;
  userId: string;
  companyId: string;
  otp: string;
  value: number;
  status: 'active' | 'used' | 'expired';
  purchasedAt: string;
  usedAt?: string;
  expiresAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  offerId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}

// Invoice Types
export interface Invoice {
  id: string;
  offerId: string;
  companyId: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  paymentLink?: string;
  dueDate: string;
  createdAt: string;
  paidAt?: string;
}

// Analytics Types
export interface DashboardStats {
  totalCompanies: number;
  totalOffers: number;
  totalRevenue: number;
  totalCommissions: number;
  activeOffers: number;
  pendingApprovals: number;
  recentSales: number;
  growthRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  roles?: UserRole[];
  badge?: number;
}

// Theme Types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

// Approval Types
export interface ApprovalAction {
  type: 'approve' | 'reject' | 'revision_required';
  reason?: string;
  notes?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}
