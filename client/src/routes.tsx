import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Customer Pages
import { LandingPage } from "./pages/LandingPage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { OrdersPage } from "./pages/OrdersPage";
import { WishlistPage } from "./pages/WishlistPage";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { OTPVerificationPage } from "./pages/auth/OTPVerificationPage";
import { TwoFactorAuthPage } from "./pages/auth/TwoFactorAuthPage";
import { AdminLoginPage } from "./pages/auth/AdminLoginPage";

// Admin Pages
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminInventoryPage } from "./pages/admin/AdminInventoryPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminVendorsPage } from "./pages/admin/AdminVendorsPage";
import { AdminCouponsPage } from "./pages/admin/AdminCouponsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

// Not Found
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "products", Component: ProductListingPage },
      { path: "products/:id", Component: ProductDetailsPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "profile", Component: UserProfilePage },
      { path: "orders", Component: OrdersPage },
      { path: "wishlist", Component: WishlistPage },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      { path: "otp-verification", Component: OTPVerificationPage },
      { path: "2fa", Component: TwoFactorAuthPage },
      { path: "admin-login", Component: AdminLoginPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboardPage },
      { path: "products", Component: AdminProductsPage },
      { path: "orders", Component: AdminOrdersPage },
      { path: "inventory", Component: AdminInventoryPage },
      { path: "users", Component: AdminUsersPage },
      { path: "vendors", Component: AdminVendorsPage },
      { path: "coupons", Component: AdminCouponsPage },
      { path: "settings", Component: AdminSettingsPage },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
