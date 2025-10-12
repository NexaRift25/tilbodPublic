"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, ArrowRight, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "One number", met: /\d/.test(formData.password) },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div
                className="bg-primary inline-flex items-center justify-center pr-5 mb-6"
                style={{
                  height: "2.5rem",
                  width: "10rem",
                  clipPath:
                    "polygon(0 0, calc(100% - 2rem) 0, 100% 50%, calc(100% - 2rem) 100%, 0 100%)",
                }}
              >
                <span className="text-dark font-extrabold whitespace-nowrap flex items-center justify-center w-full h-full text-center text-lg">
                  Tilboð.is
                </span>
              </div>
            </Link>
          </div>

          {/* Success Message */}
          <div className="bg-card-background border border-primary rounded-2xl p-6 lg:p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Password Reset Successful!
            </h1>
            
            <p className="text-gray-400 text-sm lg:text-base mb-8">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              Continue to Login
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div
              className="bg-primary inline-flex items-center justify-center pr-5 mb-6"
              style={{
                height: "2.5rem",
                width: "10rem",
                clipPath:
                  "polygon(0 0, calc(100% - 2rem) 0, 100% 50%, calc(100% - 2rem) 100%, 0 100%)",
              }}
            >
              <span className="text-dark font-extrabold whitespace-nowrap flex items-center justify-center w-full h-full text-center text-lg">
                Tilboð.is
              </span>
            </div>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm lg:text-base">
            Enter your new password below
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-card-background border border-primary rounded-2xl p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label htmlFor="password" className="text-gray-400 text-sm mb-2 block">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-primary/30 focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="bg-background border border-primary/20 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-2">Password requirements:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle 
                        size={14} 
                        className={req.met ? "text-green-500" : "text-gray-500"} 
                      />
                      <span className={`text-xs ${req.met ? "text-green-500" : "text-gray-500"}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="text-gray-400 text-sm mb-2 block">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-primary/30 focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Reset Password
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-semibold transition-colors text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
