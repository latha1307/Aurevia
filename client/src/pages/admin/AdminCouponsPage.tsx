import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { mockCoupons } from '../../data/mockData';
import { Plus, Edit, Trash2, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";

export function AdminCouponsPage() {
  const [coupons] = useState(mockCoupons);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupons</h1>
          <p className="text-muted-foreground mt-1">Create and manage discount coupons</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>Set up a new discount coupon for customers.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input id="code" placeholder="e.g., SUMMER25" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Brief description of the offer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input id="discount" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minPurchase">Min. Purchase (Optional)</Label>
                  <Input id="minPurchase" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxUsage">Max Usage (Optional)</Label>
                  <Input id="maxUsage" type="number" placeholder="Unlimited" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Coupons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coupons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Coupons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {coupons.filter(c => c.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {coupons.reduce((sum, c) => sum + c.usageCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Discount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(coupons.reduce((sum, c) => sum + c.discount, 0) / coupons.length).toFixed(0)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon List</CardTitle>
          <CardDescription>All available discount coupons</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-muted rounded font-mono text-sm font-semibold">
                        {coupon.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-6 p-0"
                        onClick={() => handleCopyCode(coupon.code)}
                      >
                        <Copy className="size-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {coupon.description}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {coupon.discountType === 'percentage' 
                        ? `${coupon.discount}%` 
                        : `$${coupon.discount}`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{coupon.usageCount}</span>
                      {coupon.maxUsage && (
                        <span className="text-muted-foreground"> / {coupon.maxUsage}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(coupon.expiryDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    {coupon.isActive ? (
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-500 text-gray-600">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
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
