import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useApp } from "../contexts/AppContext";
import { mockProducts } from "../data/mockData";
import { toast } from "sonner";

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const wishlistProducts = mockProducts.filter((p) => wishlist.includes(p.id));

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast.success("Added to cart");
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite items for later
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden h-full">
            <Link to={`/products/${product.id}`}>
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 left-2"
                  >
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </Badge>
                )}
                {!product.stock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
              </div>
            </Link>
            <CardContent className="p-4">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold mb-1 line-clamp-2 hover:text-primary">
                  {product.name}
                </h3>
              </Link>
              {/* <p className="text-sm text-muted-foreground mb-2">
                {product.brand}
              </p> */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.stock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemove(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
