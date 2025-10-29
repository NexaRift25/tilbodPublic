"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle resend logic
    } catch {
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
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
              Check Your Email
            </h1>
            
            <p className="text-gray-400 text-sm lg:text-base mb-6">
              We&apos;ve sent a password reset link to{" "}
              <span className="text-primary font-semibold">{email}</span>
            </p>
            
            <div className="bg-background border border-primary/30 rounded-lg p-4 mb-6">
              <p className="text-gray-400 text-sm">
                <strong>What&apos;s next?</strong>
              </p>
              <ul className="text-gray-400 text-sm mt-2 space-y-1 text-left">
                <li>• Check your email inbox</li>
                <li>• Look for an email from Tilboð.is</li>
                <li>• Click the reset link in the email</li>
                <li>• Create your new password</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Resend Email
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
              
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-background border border-primary/30 text-white font-semibold rounded-lg hover:bg-primary/10 transition-all"
              >
                <ArrowLeft size={20} />
                Back to Login
              </Link>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm lg:text-base mt-6">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button
                onClick={handleResendEmail}
                className="text-primary hover:text-primary/80 font-medium"
              >
                try again
              </button>
            </p>
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
            Forgot Password?
          </h1>
          <p className="text-gray-400 text-sm lg:text-base">
            No worries! Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-card-background border border-primary rounded-2xl p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="text-gray-400 text-sm mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    error 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-primary/30 focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{error}</p>
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
                  Send Reset Link
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-background border border-primary/20 rounded-lg">
            <p className="text-gray-400 text-sm">
              <strong>Need help?</strong> If you&apos;re having trouble accessing your account, 
              please contact our support team for assistance.
            </p>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
