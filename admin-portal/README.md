# Tilboo Admin Portal

A comprehensive admin portal for the Tilboo platform, built with React, TypeScript, and modern web technologies. This portal provides role-based access for administrators and company users to manage offers, companies, users, and analytics.

## 🚀 Features

### Admin Features
- **Dashboard**: Overview of platform statistics and key metrics
- **Company Management**: Approve, reject, and manage company registrations
- **Offer Management**: Review and approve offers from companies
- **User Management**: Manage user accounts and permissions
- **Analytics & Reports**: Comprehensive reporting and analytics
- **Commission Management**: Track and manage commission structures
- **Category Management**: Organize product and company categories
- **Event Management**: Manage platform events and notifications
- **Settings**: Platform configuration and system settings

### Company Features
- **Company Dashboard**: Overview of company performance and metrics
- **Offer Creation**: Create and manage various types of offers
- **Analytics**: Track offer performance and user engagement
- **Revenue Tracking**: Monitor revenue and commission earnings
- **Buyer Management**: Track and manage customer interactions
- **Gift Card Management**: Create and manage gift card offerings
- **Profile Management**: Update company information and settings

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM 7.9.1
- **Forms**: React Hook Form with Zod validation
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-portal
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── company/        # Company-specific components
│   └── shared/         # Shared components
├── contexts/           # React contexts (Theme, etc.)
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   └── company/        # Company pages
├── services/           # API services and utilities
├── store/              # Redux store configuration
│   ├── api/            # RTK Query API slices
│   └── slices/         # Redux slices
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔐 Authentication & Authorization

The application implements role-based access control with three user roles:

- **Admin**: Full access to all admin features
- **Company User**: Access to company-specific features
- **End User**: Basic user access (handled by other parts of the platform)

### Protected Routes

Routes are protected using the `ProtectedRoute` component, which checks user authentication and role permissions.

## 🎨 Theming

The application supports both light and dark themes with a customizable color system. Theme preferences are persisted using Redux Persist.

## 📊 State Management

The application uses Redux Toolkit for state management with the following features:

- **Redux Persist**: Persists authentication state and user preferences
- **RTK Query**: Handles API calls and caching
- **Slices**: Organized state management for different features

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=Tilboo Admin Portal
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary to Tilboo.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ by the Tilboo team