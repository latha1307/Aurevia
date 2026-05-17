import { Outlet, Link } from "react-router";
import { ShoppingCart } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ShoppingCart className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl">Aurevia</span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
