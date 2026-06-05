import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from './ui/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300",
        className
      )}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            {discount}% OFF
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-primary">
            Featured
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background",
            product.featured && "top-12"
          )}
          onClick={handleToggleWishlist}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isInWishlist(product.id) && "fill-destructive text-destructive"
            )}
          />
        </Button>
        {product.stock < 10 && product.stock > 0 && (
          <Badge variant="outline" className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm">
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute bottom-2 left-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};
