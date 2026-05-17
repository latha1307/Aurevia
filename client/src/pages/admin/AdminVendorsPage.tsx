import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Store, DollarSign, Package, TrendingUp } from 'lucide-react';

const vendors = [
  {
    id: 'v1',
    name: 'TechStore',
    email: 'tech@store.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechStore',
    products: 24,
    revenue: 45600,
    commission: 15,
    status: 'active',
    joinedAt: '2025-11-15'
  },
  {
    id: 'v2',
    name: 'WearTech',
    email: 'wear@tech.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WearTech',
    products: 18,
    revenue: 32400,
    commission: 15,
    status: 'active',
    joinedAt: '2025-12-01'
  },
  {
    id: 'v3',
    name: 'UrbanGear',
    email: 'urban@gear.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UrbanGear',
    products: 15,
    revenue: 18900,
    commission: 12,
    status: 'active',
    joinedAt: '2026-01-10'
  },
  {
    id: 'v4',
    name: 'GameGear',
    email: 'game@gear.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GameGear',
    products: 22,
    revenue: 41200,
    commission: 18,
    status: 'active',
    joinedAt: '2025-10-20'
  },
  {
    id: 'v5',
    name: 'LeatherCraft',
    email: 'leather@craft.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LeatherCraft',
    products: 12,
    revenue: 15300,
    commission: 10,
    status: 'pending',
    joinedAt: '2026-05-01'
  }
];

export function AdminVendorsPage() {
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const totalRevenue = vendors.reduce((sum, v) => sum + v.revenue, 0);
  const totalProducts = vendors.reduce((sum, v) => sum + v.products, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendors</h1>
        <p className="text-muted-foreground mt-1">Manage vendor partners and their performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Vendors
            </CardTitle>
            <Store className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVendors}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeVendors} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From all vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="size-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Listed products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Commission
            </CardTitle>
            <TrendingUp className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(vendors.reduce((sum, v) => sum + v.commission, 0) / vendors.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Commission rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
          <CardDescription>Overview of all vendor partners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={vendor.avatar} alt={vendor.name} />
                        <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{vendor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {vendor.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.products}</TableCell>
                  <TableCell>${vendor.revenue.toLocaleString()}</TableCell>
                  <TableCell>{vendor.commission}%</TableCell>
                  <TableCell>
                    {vendor.status === 'active' ? (
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(vendor.joinedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Manage</Button>
                    </div>
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
