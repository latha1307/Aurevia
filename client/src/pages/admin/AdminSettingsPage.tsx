import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";

export function AdminSettingsPage() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store configuration and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="My E-Commerce Store" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea 
                  id="storeDescription" 
                  defaultValue="Your one-stop shop for quality products"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="contact@store.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Store Address</Label>
                <Input id="address" defaultValue="123 Main Street, New York, NY 10001" />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="24-7">24/7 Operation</Label>
                <Switch id="24-7" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="openTime">Opening Time</Label>
                  <Input id="openTime" type="time" defaultValue="09:00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="closeTime">Closing Time</Label>
                  <Input id="closeTime" type="time" defaultValue="18:00" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure payment processing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Credit/Debit Cards</div>
                  <div className="text-sm text-muted-foreground">Accept Visa, Mastercard, Amex</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-muted-foreground">Accept PayPal payments</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-muted-foreground">Allow cash payment on delivery</div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-sm text-muted-foreground">Accept direct bank transfers</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency Settings</CardTitle>
              <CardDescription>Set your default currency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" defaultValue="USD ($)" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Options</CardTitle>
              <CardDescription>Configure shipping methods and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">Free shipping on orders over $100</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Express Delivery</div>
                  <div className="text-sm text-muted-foreground">1-2 business days</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Standard Delivery</div>
                  <div className="text-sm text-muted-foreground">3-5 business days</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">International Shipping</div>
                  <div className="text-sm text-muted-foreground">Worldwide delivery available</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order Confirmations</div>
                  <div className="text-sm text-muted-foreground">Send email when order is placed</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Shipping Updates</div>
                  <div className="text-sm text-muted-foreground">Notify customers about shipping status</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">Send promotional emails to customers</div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Low Stock Alerts</div>
                  <div className="text-sm text-muted-foreground">Alert when inventory is running low</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Require 2FA for admin access</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Login Alerts</div>
                  <div className="text-sm text-muted-foreground">Email alerts for new admin logins</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto Logout</div>
                  <div className="text-sm text-muted-foreground">Auto logout after 30 minutes of inactivity</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="grid gap-2 pt-4">
                <Label>Change Password</Label>
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm new password" />
                <Button className="mt-2">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
