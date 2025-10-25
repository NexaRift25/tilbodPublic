import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Offer, ProductCategory, OfferPricing, ApprovalAction } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const offerApi = createApi({
  reducerPath: 'offerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/offers`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Offer', 'ProductCategory'],
  endpoints: (builder) => ({
    // Get offers for a company
    getCompanyOffers: builder.query<Offer[], string>({
      query: (companyId) => `?companyId=${companyId}`,
      providesTags: ['Offer'],
    }),
    
    // Get all offers (for admin)
    getAllOffers: builder.query<Offer[], { status?: string; type?: string }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.append('status', params.status);
        if (params.type) searchParams.append('type', params.type);
        return `?${searchParams.toString()}`;
      },
      providesTags: ['Offer'],
    }),
    
    // Create new offer
    createOffer: builder.mutation<Offer, Partial<Offer>>({
      query: (offer) => ({
        url: '/',
        method: 'POST',
        body: offer,
      }),
      invalidatesTags: ['Offer'],
    }),
    
    // Update offer
    updateOffer: builder.mutation<Offer, { id: string; updates: Partial<Offer> }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Offer'],
    }),
    
    // Extend offer
    extendOffer: builder.mutation<Offer, { id: string; extensionDays: number }>({
      query: ({ id, extensionDays }) => ({
        url: `/${id}/extend`,
        method: 'POST',
        body: { extensionDays },
      }),
      invalidatesTags: ['Offer'],
    }),
    
    // Get product categories
    getProductCategories: builder.query<ProductCategory[], void>({
      query: () => '/categories',
      providesTags: ['ProductCategory'],
    }),
    
    // Calculate offer pricing
    calculatePricing: builder.mutation<OfferPricing, { type: string; basePrice: number; discount?: any }>({
      query: (pricing) => ({
        url: '/calculate-pricing',
        method: 'POST',
        body: pricing,
      }),
    }),
    
    // Admin approval actions
    approveOffer: builder.mutation<Offer, { id: string; action: ApprovalAction }>({
      query: ({ id, action }) => ({
        url: `/${id}/approve`,
        method: 'POST',
        body: action,
      }),
      invalidatesTags: ['Offer'],
    }),
    
    // Get pending approvals (admin)
    getPendingApprovals: builder.query<Offer[], void>({
      queryFn: async () => {
        // Mock data for development
        const mockPendingOffers = [
          {
            id: '1',
            title: 'Summer Fashion Sale - 50% Off',
            description: 'Get 50% off on all summer clothing items. Valid for 30 days.',
            type: 'active_offer',
            pricing: { finalPrice: 25.99, originalPrice: 51.98 },
            createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            company: 'Fashion Forward Ltd',
            category: 'Clothing',
            status: 'pending',
            timeRemaining: 15
          },
          {
            id: '2',
            title: 'Tuesday 2-for-1 Pizza Deal',
            description: 'Buy one pizza, get one free every Tuesday from 5-9 PM.',
            type: 'weekdays_offer',
            pricing: { finalPrice: 12.99, originalPrice: 25.98 },
            createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
            company: 'Mario\'s Pizza',
            category: 'Restaurant',
            status: 'pending',
            timeRemaining: 5
          },
          {
            id: '3',
            title: 'Happy Hour Cocktails - 30% Off',
            description: 'Enjoy 30% off all cocktails during happy hour 4-7 PM.',
            type: 'happy_hour_offer',
            pricing: { finalPrice: 8.99, originalPrice: 12.99 },
            createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            company: 'The Golden Bar',
            category: 'Bar & Restaurant',
            status: 'pending',
            timeRemaining: 20
          },
          {
            id: '4',
            title: 'Luxury Spa Gift Card',
            description: 'Premium spa experience with massage and facial treatment.',
            type: 'gift_card',
            pricing: { finalPrice: 150.00, originalPrice: 200.00 },
            createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            company: 'Serenity Spa',
            category: 'Wellness',
            status: 'pending',
            timeRemaining: 25
          }
        ] as any[];
        
        return { data: mockPendingOffers };
      },
      providesTags: ['Offer'],
    }),
    
    // Get offer details
    getOfferDetails: builder.query<Offer, string>({
      query: (id) => `/${id}`,
      providesTags: ['Offer'],
    }),
  }),
});

export const {
  useGetCompanyOffersQuery,
  useGetAllOffersQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useExtendOfferMutation,
  useGetProductCategoriesQuery,
  useCalculatePricingMutation,
  useApproveOfferMutation,
  useGetPendingApprovalsQuery,
  useGetOfferDetailsQuery,
} = offerApi;
