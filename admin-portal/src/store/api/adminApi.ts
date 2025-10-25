import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DashboardStats, ChartData, Company, User, Notification } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/admin`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AdminStats', 'Company', 'Offer', 'User', 'Notification'],
  endpoints: (builder) => ({
    // Get admin dashboard stats
    getAdminStats: builder.query<DashboardStats, void>({
      query: () => '/stats',
      providesTags: ['AdminStats'],
    }),
    
    // Get revenue chart data
    getRevenueChart: builder.query<ChartData, { period: string }>({
      query: ({ period }) => `/revenue-chart?period=${period}`,
      providesTags: ['AdminStats'],
    }),
    
    // Get commission chart data
    getCommissionChart: builder.query<ChartData, { period: string }>({
      query: ({ period }) => `/commission-chart?period=${period}`,
      providesTags: ['AdminStats'],
    }),
    
    // Get offers performance chart
    getOffersPerformanceChart: builder.query<ChartData, { period: string }>({
      query: ({ period }) => `/offers-performance-chart?period=${period}`,
      providesTags: ['AdminStats'],
    }),
    
    // Get all companies
    getAllCompanies: builder.query<Company[], { status?: string; search?: string }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.append('status', params.status);
        if (params.search) searchParams.append('search', params.search);
        return `/companies?${searchParams.toString()}`;
      },
      providesTags: ['Company'],
    }),
    
    // Approve company
    approveCompany: builder.mutation<Company, { id: string; action: 'approve' | 'reject' | 'revision_required'; reason?: string }>({
      query: ({ id, action, reason }) => ({
        url: `/companies/${id}/approve`,
        method: 'POST',
        body: { action, reason },
      }),
      invalidatesTags: ['Company'],
    }),
    
    // Get all users
    getAllUsers: builder.query<User[], { role?: string; search?: string }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.role) searchParams.append('role', params.role);
        if (params.search) searchParams.append('search', params.search);
        return `/users?${searchParams.toString()}`;
      },
      providesTags: ['User'],
    }),
    
    // Get notifications
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications',
      providesTags: ['Notification'],
    }),
    
    // Mark notification as read
    markNotificationAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'POST',
      }),
      invalidatesTags: ['Notification'],
    }),
    
    // Get financial reports
    getFinancialReports: builder.query<any, { startDate: string; endDate: string; filters?: any }>({
      query: ({ startDate, endDate, filters }) => ({
        url: '/financial-reports',
        method: 'POST',
        body: { startDate, endDate, filters },
      }),
      providesTags: ['AdminStats'],
    }),
    
    // Create seasonal event
    createSeasonalEvent: builder.mutation<any, { name: string; startDate: string; endDate: string; description?: string }>({
      query: (event) => ({
        url: '/seasonal-events',
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Offer'],
    }),
    
    // Get company performance metrics
    getCompanyPerformance: builder.query<any, string>({
      query: (companyId) => `/companies/${companyId}/performance`,
      providesTags: ['Company'],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetRevenueChartQuery,
  useGetCommissionChartQuery,
  useGetOffersPerformanceChartQuery,
  useGetAllCompaniesQuery,
  useApproveCompanyMutation,
  useGetAllUsersQuery,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useGetFinancialReportsQuery,
  useCreateSeasonalEventMutation,
  useGetCompanyPerformanceQuery,
} = adminApi;
