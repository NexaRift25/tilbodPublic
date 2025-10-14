"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  FileText,
  CreditCard,
  Tag,
  AlertCircle,
  Check,
  ArrowLeft,
  Plus
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CompanyFormData {
  name: string;
  registrationNumber: string;
  taxId: string;
  category: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contactPerson: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
}

const companyCategories = [
  "Restaurant & Dining",
  "Hotels & Accommodation",
  "Wellness & Spa",
  "Activities & Entertainment",
  "Shopping & Retail",
  "Beauty & Personal Care",
  "Health & Fitness",
  "Transportation",
  "Education & Learning",
  "Professional Services",
  "Other"
];

export default function NewCompanyPage() {
  const router = useRouter();
  const { user, companies, addCompany } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CompanyFormData>({
    name: "",
    registrationNumber: "",
    taxId: "",
    category: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "Iceland"
    },
    contactPerson: {
      name: "",
      email: "",
      phone: "",
      position: ""
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.") || name.startsWith("contactPerson.")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
    if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.street.trim()) newErrors["address.street"] = "Street address is required";
    if (!formData.address.city.trim()) newErrors["address.city"] = "City is required";
    if (!formData.address.postalCode.trim()) newErrors["address.postalCode"] = "Postal code is required";
    if (!formData.contactPerson.name.trim()) newErrors["contactPerson.name"] = "Contact person name is required";
    if (!formData.contactPerson.email.trim()) newErrors["contactPerson.email"] = "Contact person email is required";
    if (!formData.contactPerson.phone.trim()) newErrors["contactPerson.phone"] = "Contact person phone is required";

    // Validation rules
    if (formData.registrationNumber && !/^\d{6,}$/.test(formData.registrationNumber)) {
      newErrors.registrationNumber = "Registration number must be at least 6 digits";
    }
    if (formData.taxId && !/^\d{6,}$/.test(formData.taxId)) {
      newErrors.taxId = "Tax ID must be at least 6 digits";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.contactPerson.email && !/\S+@\S+\.\S+/.test(formData.contactPerson.email)) {
      newErrors["contactPerson.email"] = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newCompany = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        registrationNumber: formData.registrationNumber,
        taxId: formData.taxId,
        category: formData.category,
        status: "pending" as const,
        revisionCount: 0,
        createdAt: new Date().toISOString(),
      };

      addCompany(newCompany);

      // Redirect to companies list
      router.push("/company/companies");
    } catch (error) {
      console.error("Company registration failed", error);
      setErrors({ general: "Failed to register company. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (companies.length >= 10) {
    return (
      <div className="space-y-6">
        <div className="bg-card-background border border-primary rounded-2xl p-8 text-center">
          <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-white mb-2">Company Limit Reached</h2>
          <p className="text-gray-400 mb-6">
            You have registered the maximum of 10 companies. You cannot register additional companies at this time.
          </p>
          <button
            onClick={() => router.push("/company/companies")}
            className="px-6 py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all"
          >
            View My Companies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-primary/10 rounded-lg transition-all"
        >
          <ArrowLeft className="text-primary" size={20} />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Register New Company
          </h1>
          <p className="text-gray-400 text-sm">
            Register your business ({companies.length}/10 companies registered)
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-card-background border border-primary rounded-2xl p-6 lg:p-8">
        {errors.general && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-500">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Building2 size={20} />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Enter company name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.registrationNumber ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Government registration number"
                />
                {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Tax ID *
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.taxId ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Tax identity number"
                />
                {errors.taxId && <p className="text-red-500 text-xs mt-1">{errors.taxId}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.category ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                >
                  <option value="">Select category</option>
                  {companyCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText size={20} />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Company Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="company@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="+354 XXX XXXX"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm mb-2 block">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="https://www.company.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm mb-2 block">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary transition-all resize-none"
                  placeholder="Brief description of your business..."
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Tag size={20} />
              Business Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm mb-2 block">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors["address.street"] ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Street name and number"
                />
                {errors["address.street"] && <p className="text-red-500 text-xs mt-1">{errors["address.street"]}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  City *
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors["address.city"] ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="City"
                />
                {errors["address.city"] && <p className="text-red-500 text-xs mt-1">{errors["address.city"]}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors["address.postalCode"] ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="XXX"
                />
                {errors["address.postalCode"] && <p className="text-red-500 text-xs mt-1">{errors["address.postalCode"]}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="Iceland"
                />
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Primary Contact Person
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="contactPerson.name"
                  value={formData.contactPerson.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors["contactPerson.name"] ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Contact person name"
                />
                {errors["contactPerson.name"] && <p className="text-red-500 text-xs mt-1">{errors["contactPerson.name"]}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Position
                </label>
                <input
                  type="text"
                  name="contactPerson.position"
                  value={formData.contactPerson.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="CEO, Manager, etc."
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Email *
                </label>
                <input
                  type="email"
                  name="contactPerson.email"
                  value={formData.contactPerson.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors["contactPerson.email"] ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="contact@company.com"
                />
                {errors["contactPerson.email"] && <p className="text-red-500 text-xs mt-1">{errors["contactPerson.email"]}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="contactPerson.phone"
                  value={formData.contactPerson.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors["contactPerson.phone"] ? "border-red-500 focus:border-red-500" : "border-primary/30 focus:border-primary"
                  }`}
                  placeholder="+354 XXX XXXX"
                />
                {errors["contactPerson.phone"] && <p className="text-red-500 text-xs mt-1">{errors["contactPerson.phone"]}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-primary/30">
            <p className="text-gray-400 text-sm">
              * Required fields
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus size={20} />
                  Register Company
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

