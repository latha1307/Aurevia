import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { mockUsers } from '../../data/mockData';
import { Search, UserPlus, Edit, Trash2, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Extended user list for demo
  const allUsers = [
    ...mockUsers,
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      phone: '+1 (555) 987-6543',
      createdAt: '2026-02-20T10:00:00Z'
    },
    {
      id: 'user3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'customer' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      createdAt: '2026-03-10T10:00:00Z'
    },
    {
      id: 'vendor2',
      name: 'Tech Supplies Co',
      email: 'tech@example.com',
      role: 'vendor' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechSupplies',
      createdAt: '2026-01-05T10:00:00Z'
    },
    {
      id: 'delivery1',
      name: 'Delivery Pro',
      email: 'delivery@example.com',
      role: 'delivery_partner' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Delivery',
      createdAt: '2026-02-01T10:00:00Z'
    }
  ];

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { variant: any; className?: string; label: string }> = {
      super_admin: { variant: 'default', label: 'Super Admin' },
      admin: { variant: 'default', label: 'Admin' },
      vendor: { variant: 'outline', className: 'border-purple-500 text-purple-600', label: 'Vendor' },
      delivery_partner: { variant: 'outline', className: 'border-blue-500 text-blue-600', label: 'Delivery' },
      customer: { variant: 'outline', className: 'border-gray-500 text-gray-600', label: 'Customer' }
    };

    const config = variants[role] || variants.customer;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button>
          <UserPlus className="size-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allUsers.filter(u => u.role === 'customer').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allUsers.filter(u => u.role === 'vendor').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allUsers.filter(u => u.role === 'delivery_partner').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allUsers.filter(u => u.role === 'admin' || u.role === 'super_admin').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User List</CardTitle>
              <CardDescription>A list of all registered users</CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Shield className="size-4" />
                      </Button>
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
