// Mock authentication service for development/testing
import type { LoginRequest, LoginResponse, User } from '../types';

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '',
    isVerified: true,
    verificationMethod: 'email',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Company User',
    email: 'company@example.com',
    role: 'company_user',
    avatar: '',
    isVerified: true,
    verificationMethod: 'email',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Debug function to check mock users
export const getMockUsers = () => {
  console.log('Mock users:', mockUsers);
  return mockUsers;
};

// Mock login function
export const mockLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { email, password } = credentials;
  
  // Debug logging
  console.log('Mock login attempt:', { email, password });
  console.log('Available users:', mockUsers.map(u => u.email));

  // Find user by email
  const user = mockUsers.find(u => u.email === email);

  console.log('Found user:', user);

  if (!user) {
    console.log('User not found for email:', email);
    throw new Error('Invalid email or password');
  }

  // Mock password validation - common password for all users
  const commonPassword = '123456';
  
  console.log('Password check:', { provided: password, expected: commonPassword, match: password === commonPassword });

  if (password !== commonPassword) {
    console.log('Password mismatch');
    throw new Error('Invalid email or password');
  }

  // Generate mock tokens
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  const refreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;

  console.log('Login successful, returning:', { user: user.email, token: token.substring(0, 20) + '...' });

  return {
    user,
    token,
    refreshToken,
  };
};

// Mock logout function
export const mockLogout = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, this would invalidate the token on the server
};

// Mock get current user function
export const mockGetCurrentUser = async (token: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Extract user ID from mock token
  const userId = token.split('-')[3];
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('Invalid token');
  }
  
  return user;
};
