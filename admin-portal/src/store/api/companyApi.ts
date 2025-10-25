import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Company, CompanyCategory, DashboardStats, ChartData } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/company`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Company', 'CompanyStats'],
  endpoints: (builder) => ({
    // Get user's companies
    getMyCompanies: builder.query<Company[], void>({
      query: () => '/my-companies',
      providesTags: ['Company'],
    }),
    
    // Create new company
    createCompany: builder.mutation<Company, Partial<Company>>({
      query: (company) => ({
        url: '/',
        method: 'POST',
        body: company,
      }),
      invalidatesTags: ['Company'],
    }),
    
    // Update company
    updateCompany: builder.mutation<Company, { id: string; updates: Partial<Company> }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Company'],
    }),
    
    // Get company categories
    getCompanyCategories: builder.query<CompanyCategory[], void>({
      query: () => '/categories',
      providesTags: ['Company'],
    }),
    
    // Get company dashboard stats
    getCompanyStats: builder.query<DashboardStats, string>({
      query: (companyId) => `/${companyId}/stats`,
      providesTags: ['CompanyStats'],
    }),
    
    // Get company revenue chart data
    getCompanyRevenueChart: builder.query<ChartData, { companyId: string; period: string }>({
      query: ({ companyId, period }) => `/${companyId}/revenue-chart?period=${period}`,
      providesTags: ['CompanyStats'],
    }),
    
    // Get company offers performance
    getCompanyOffersPerformance: builder.query<ChartData, { companyId: string; period: string }>({
      query: ({ companyId, period }) => `/${companyId}/offers-performance?period=${period}`,
      providesTags: ['CompanyStats'],
    }),
  }),
});

export const {
  useGetMyCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompanyCategoriesQuery,
  useGetCompanyStatsQuery,
  useGetCompanyRevenueChartQuery,
  useGetCompanyOffersPerformanceQuery,
} = companyApi;
