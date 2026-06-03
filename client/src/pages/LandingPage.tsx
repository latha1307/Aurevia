import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getProducts } from "../api/product.api";
import { getCategories } from "../api/category.api";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LandingPage() {
  const [featuredProducts, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.content);
      console.log(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchProducts();
  fetchCategories();
    }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit">New Collection 2026</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Premium Products for Your Lifestyle
              </h1>
              <p className="text-lg text-muted-foreground">
                Shop the latest trends in electronics, wearables, and accessories. Experience quality that exceeds expectations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/products?category=Electronics">Browse Electronics</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Over 10,000 5-star reviews</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758979792186-32a5da91f24d?w=800&q=80"
                  alt="Premium electronics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free delivery on all orders over $50
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  100% secure payment with SSL encryption
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Headphones className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team ready to help
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked items just for you</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
        {categories.map((category) => (
        
          <Link
            key={category.id}
            to={`/products?category=${category.name}`}
          >
          
            <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
        
              <div className="aspect-video overflow-hidden bg-muted">
        
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
      
              </div>
        
              <CardContent className="p-6">
        
                <h3 className="text-xl font-semibold mb-2">
                  {category.name}
                </h3>
        
                <p className="text-muted-foreground">
                  {category.description}
                </p>
        
              </CardContent>
        
            </Card>
        
          </Link>
        ))}
      </div>
      </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best online shopping experience.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products">
              Browse All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
