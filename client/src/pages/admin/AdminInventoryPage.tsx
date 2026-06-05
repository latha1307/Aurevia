import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { mockProducts } from '../../data/mockData';
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from "../../components/ui/progress";

export function AdminInventoryPage() {
  const totalProducts = mockProducts.length;
  const lowStockProducts = mockProducts.filter(p => p.stock < 30 && p.stock > 0).length;
  const outOfStockProducts = mockProducts.filter(p => p.stock === 0).length;
  const inStockProducts = mockProducts.filter(p => p.stock >= 30).length;

  const stockPercentage = (inStockProducts / totalProducts) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage stock levels</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Stock
            </CardTitle>
            <TrendingUp className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">{stockPercentage.toFixed(0)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock
            </CardTitle>
            <AlertTriangle className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Out of Stock
            </CardTitle>
            <TrendingDown className="size-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Urgent restock required</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Status */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Status Overview</CardTitle>
          <CardDescription>Current inventory health across all products</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Stock Health</span>
              <span className="font-medium">{stockPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={stockPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Products */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Alert</CardTitle>
          <CardDescription>Products that need immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts
                .filter(p => p.stock < 30)
                .sort((a, b) => a.stock - b.stock)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="size-10 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            SKU: {product.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.stock}</span>
                        <span className="text-xs text-muted-foreground">units</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.stock === 0 ? (
                        <Badge variant="destructive">Out of Stock</Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-500 text-orange-600">
                          Low Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Restock</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
