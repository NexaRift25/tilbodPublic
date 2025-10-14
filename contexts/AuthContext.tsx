"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "user" | "company" | "admin";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  phone?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  category: string;
  status: "pending" | "approved" | "rejected" | "revision";
  revisionCount: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  companies: Company[];
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  loginWithGoogle: (role?: UserRole) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  addCompany: (company: Company) => void;
  updateCompany: (companyId: string, data: Partial<Company>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("tilbod_user");
    const storedCompanies = localStorage.getItem("tilbod_companies");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("tilbod_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("tilbod_user");
    }
  }, [user]);

  // Save companies to localStorage when they change
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem("tilbod_companies", JSON.stringify(companies));
    }
  }, [companies]);

  const login = async (email: string, password: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data based on role
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstName: "John",
        lastName: "Doe",
        role: role || "user",
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);

      // Redirect based on role
      switch (mockUser.role) {
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
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (role?: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: "user@gmail.com",
        firstName: "Google",
        lastName: "User",
        role: role || "user",
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);

      // Redirect based on role
      switch (mockUser.role) {
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
    } catch (error) {
      console.error("Google login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompanies([]);
    localStorage.removeItem("tilbod_user");
    localStorage.removeItem("tilbod_companies");
    router.push("/login");
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        isVerified: false,
        phone: data.phone,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);

      // Redirect to verification page or dashboard
      router.push("/verify-email");
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const addCompany = (company: Company) => {
    if (companies.length < 10) {
      setCompanies([...companies, company]);
    } else {
      throw new Error("Maximum 10 companies allowed per user");
    }
  };

  const updateCompany = (companyId: string, data: Partial<Company>) => {
    setCompanies(
      companies.map((company) =>
        company.id === companyId ? { ...company, ...data } : company
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        companies,
        isLoading,
        login,
        loginWithGoogle,
        logout,
        register,
        updateUser,
        addCompany,
        updateCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

