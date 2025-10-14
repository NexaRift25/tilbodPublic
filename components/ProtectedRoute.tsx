"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireVerification?: boolean;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requireVerification = false,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // Not logged in - redirect to login
      if (!user) {
        router.push(`/login?redirect=${pathname}`);
        return;
      }

      // Check if user role is allowed
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case "admin":
            router.push("/admin/dashboard");
            break;
          case "company":
            router.push("/company/dashboard");
            break;
          default:
            router.push("/dashboard");
            break;
        }
        return;
      }

      // Check verification requirement
      if (requireVerification && !user.isVerified) {
        router.push("/verify-email");
        return;
      }
    }
  }, [user, isLoading, router, pathname, allowedRoles, requireVerification]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    return null;
  }

  // User not authorized for this role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  // User not verified when verification is required
  if (requireVerification && !user.isVerified) {
    return null;
  }

  return <>{children}</>;
}

