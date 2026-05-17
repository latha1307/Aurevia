import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
}