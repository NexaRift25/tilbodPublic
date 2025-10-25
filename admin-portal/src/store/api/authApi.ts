import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { LoginRequest, LoginResponse, User } from '../../types';
import { mockLogin, mockLogout, mockGetCurrentUser } from '../../services/mockAuth';

// Define the base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_MOCK_API = true; // Set to true for development

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/auth`,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Custom base query that handles mock API
const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  if (USE_MOCK_API) {
    // Handle mock API calls
    const { endpoint } = api;
    
    if (endpoint === 'login') {
      console.log('Custom base query - login endpoint, args:', args);
      try {
        // Extract the body from args since RTK Query passes the full request object
        const credentials = (args as any).body as LoginRequest;
        console.log('Extracted credentials:', credentials);
        const result = await mockLogin(credentials);
        console.log('Login successful in base query');
        return { data: result };
      } catch (error: any) {
        console.log('Login failed in base query:', error.message);
        return { error: { status: 401, data: { message: error.message } } };
      }
    }
    
    if (endpoint === 'logout') {
      await mockLogout();
      return { data: undefined };
    }
    
    if (endpoint === 'getCurrentUser') {
      const token = (api.getState() as any).auth.token;
      if (!token) {
        return { error: { status: 401, data: { message: 'No token found' } } };
      }
      
      try {
        const user = await mockGetCurrentUser(token);
        return { data: user };
      } catch (error: any) {
        return { error: { status: 401, data: { message: error.message } } };
      }
    }
  }
  
  // Fall back to the real API
  return baseQuery(args, api, extraOptions);
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    refreshToken: builder.mutation<{ token: string; refreshToken: string }, { refreshToken: string }>({
      query: (body) => ({
        url: '/refresh',
        method: 'POST',
        body,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/me',
      }),
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: '/profile',
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApi;
