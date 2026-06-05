import { useState } from "react";
import { Package, Truck, CheckCircle2, XCircle, Search, Eye } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { mockOrders } from "../data/mockData";
import { Separator } from "../components/ui/separator";

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      delivered: "default",
      shipped: "secondary",
      processing: "outline",
      cancelled: "destructive",
    };
    return (
      <Badge variant={variants[status] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">
          Track and manage your orders
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by order number or product name"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Orders List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground">
                    You haven't placed any orders yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(order.status)}
                          <span className="font-semibold">{order.orderNumber}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Order Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Order Number
                                  </p>
                                  <p className="font-semibold">{order.orderNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Status</p>
                                  {getStatusBadge(order.status)}
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Date</p>
                                  <p className="font-semibold">
                                    {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Total</p>
                                  <p className="font-semibold">
                                    ${order.total.toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              <Separator />

                              {/* Items */}
                              <div>
                                <h4 className="font-semibold mb-4">Order Items</h4>
                                <div className="space-y-4">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                        <img
                                          src={item.imageUrl}
                                          alt={item.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Qty: {item.quantity}
                                        </p>
                                      </div>
                                      <p className="font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <Separator />

                              {/* Shipping */}
                              <div>
                                <h4 className="font-semibold mb-2">Shipping Address</h4>
                                <p className="text-sm">
                                  {order.shippingAddress.name}
                                  <br />
                                  {order.shippingAddress.address}
                                  <br />
                                  {order.shippingAddress.city}, {order.shippingAddress.zip}
                                  <br />
                                  {order.shippingAddress.country}
                                </p>
                                {order.tracking && (
                                  <div className="mt-4">
                                    <p className="text-sm text-muted-foreground">
                                      Tracking Number
                                    </p>
                                    <p className="font-mono text-sm">
                                      {order.tracking}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {order.tracking && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Tracking: <span className="font-mono">{order.tracking}</span>
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <p className="font-semibold">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {filteredOrders
              .filter((order) => order.status === "delivered")
              .map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Delivered on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {filteredOrders
              .filter((order) => ["processing", "shipped"].includes(order.status))
              .map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Status: {order.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
