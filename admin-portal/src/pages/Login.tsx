import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useLoginMutation } from '../store/api/authApi';
import { setCredentials, setError, clearError } from '../store/slices/authSlice';
import type { LoginRequest } from '../types';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { getMockUsers } from '../services/mockAuth';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error, user } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'company_user') {
        navigate('/company');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Debug: Check mock users on component mount
  useEffect(() => {
    getMockUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Login form submitted with data:', formData);
    
    if (!formData.email || !formData.password) {
      dispatch(setError('Please fill in all fields'));
      return;
    }

    try {
      console.log('Calling login mutation with:', formData);
      const result = await login(formData).unwrap();
      console.log('Login result:', result);
      dispatch(setCredentials(result));
      
      // Navigate based on user role
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'company_user') {
        navigate('/company');
      }
    } catch (err: any) {
      console.log('Login error:', err);
      dispatch(setError(err.data?.message || 'Login failed. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 dark:from-indigo-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Main card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Sign in to access your dashboard
              </p>
            </div>
          </div>
          
          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">!</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            {/* Forgot password link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </form>

          {/* Demo credentials */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
              Demo Credentials
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white dark:bg-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Admin:</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">admin@example.com</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white dark:bg-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Company:</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">company@example.com</span>
              </div>
              <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
                Password: <span className="font-mono">123456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
