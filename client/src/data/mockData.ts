import type { Product, Order, User, Coupon, AnalyticsData } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 299.99,
    originalPrice: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 234,
    stock: 45,
    vendor: 'TechStore',
    vendorId: 'v1',
    tags: ['wireless', 'audio', 'premium'],
    featured: true
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 449.99,
    originalPrice: 549.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'
    ],
    category: 'Wearables',
    rating: 4.6,
    reviews: 189,
    stock: 32,
    vendor: 'WearTech',
    vendorId: 'v2',
    tags: ['smartwatch', 'fitness', 'health'],
    featured: true
  },
  {
    id: '3',
    name: 'Minimalist Backpack',
    description: 'Sleek laptop backpack with USB charging port and water-resistant material',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    rating: 4.7,
    reviews: 312,
    stock: 67,
    vendor: 'UrbanGear',
    vendorId: 'v3',
    tags: ['backpack', 'travel', 'laptop']
  },
  {
    id: '4',
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical gaming keyboard with customizable RGB lighting',
    price: 159.99,
    originalPrice: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Electronics',
    rating: 4.9,
    reviews: 421,
    stock: 28,
    vendor: 'GameGear',
    vendorId: 'v4',
    tags: ['keyboard', 'gaming', 'rgb'],
    featured: true
  },
  {
    id: '5',
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID protection',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    category: 'Accessories',
    rating: 4.5,
    reviews: 156,
    stock: 89,
    vendor: 'LeatherCraft',
    vendorId: 'v5',
    tags: ['wallet', 'leather', 'rfid']
  },
  {
    id: '6',
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with 360° sound and 12-hour battery',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    rating: 4.4,
    reviews: 267,
    stock: 54,
    vendor: 'AudioPro',
    vendorId: 'v1',
    tags: ['speaker', 'bluetooth', 'waterproof']
  },
  {
    id: '7',
    name: 'Sunglasses Classic',
    description: 'UV protection polarized sunglasses with premium metal frame',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Accessories',
    rating: 4.6,
    reviews: 198,
    stock: 73,
    vendor: 'EyeWear',
    vendorId: 'v6',
    tags: ['sunglasses', 'uv', 'fashion']
  },
  {
    id: '8',
    name: 'Fitness Tracker Band',
    description: 'Slim fitness band with sleep tracking and heart rate monitoring',
    price: 99.99,
    originalPrice: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    category: 'Wearables',
    rating: 4.3,
    reviews: 143,
    stock: 41,
    vendor: 'FitTech',
    vendorId: 'v2',
    tags: ['fitness', 'tracker', 'health']
  },
  {
    id: '9',
    name: 'Desk Lamp LED',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home',
    rating: 4.7,
    reviews: 289,
    stock: 96,
    vendor: 'HomeLight',
    vendorId: 'v7',
    tags: ['lamp', 'led', 'desk']
  },
  {
    id: '10',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning',
    price: 139.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Footwear',
    rating: 4.8,
    reviews: 512,
    stock: 34,
    vendor: 'SportGear',
    vendorId: 'v8',
    tags: ['shoes', 'running', 'sports'],
    featured: true
  },
  {
    id: '11',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-brew',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home',
    rating: 4.5,
    reviews: 176,
    stock: 62,
    vendor: 'KitchenPro',
    vendorId: 'v9',
    tags: ['coffee', 'kitchen', 'appliance']
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with carrying strap',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Fitness',
    rating: 4.6,
    reviews: 234,
    stock: 118,
    vendor: 'FitLife',
    vendorId: 'v10',
    tags: ['yoga', 'fitness', 'exercise']
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user1',
    items: [
      { id: '1', product: mockProducts[0], quantity: 1, name: mockProducts[0].name, imageUrl: mockProducts[0].imageUrl, price: mockProducts[0].price },
      { id: '2', product: mockProducts[2], quantity: 2, name: mockProducts[2].name, imageUrl: mockProducts[2].imageUrl, price: mockProducts[2].price }
    ],
    total: 479.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'

    },
    trackingNumber: 'TRK123456789',
    tracking: 'Delivered on May 15, 2026',
    orderNumber: '1001',
    date: '2026-05-10T10:30:00Z',
    createdAt: '2026-05-10T10:30:00Z',
    updatedAt: '2026-05-15T14:20:00Z'
  },
  {
    id: 'ORD-002',
    userId: 'user1',
    items: [
      { id: '3', product: mockProducts[1], quantity: 1, name: mockProducts[1].name, imageUrl: mockProducts[1].imageUrl, price: mockProducts[1].price }
    ],
    total: 449.99,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    trackingNumber: 'TRK987654321',
    tracking: 'Shipped on May 14, 2026',
    orderNumber: '1002',
    date: '2026-05-12T14:45:00Z',
    createdAt: '2026-05-14T15:45:00Z',
    updatedAt: '2026-05-16T09:10:00Z'
  },
  {
    id: 'ORD-003',
    userId: 'user2',
    items: [
      { id: '4', product: mockProducts[3], quantity: 1, name: mockProducts[3].name, imageUrl: mockProducts[3].imageUrl, price: mockProducts[3].price },
      { id: '5', product: mockProducts[5], quantity: 1, name: mockProducts[5].name, imageUrl: mockProducts[5].imageUrl, price: mockProducts[5].price }
    ],
    total: 239.98,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Jane Smith',
      address: '456 Oak Ave',
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    tracking: 'Processing',
    orderNumber: '1003',
    date: '2026-05-16T08:20:00Z',
    createdAt: '2026-05-16T08:20:00Z',
    updatedAt: '2026-05-16T10:30:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'super_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    createdAt: '2025-12-01T10:00:00Z'
  },
  {
    id: 'vendor1',
    name: 'Vendor Store',
    email: 'vendor@example.com',
    role: 'vendor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vendor',
    createdAt: '2026-02-10T10:00:00Z'
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: 'coup1',
    code: 'SUMMER25',
    description: '25% off on all products',
    discount: 25,
    discountType: 'percentage',
    minPurchase: 100,
    expiryDate: '2026-08-31',
    isActive: true,
    usageCount: 145,
    maxUsage: 500
  },
  {
    id: 'coup2',
    code: 'SAVE50',
    description: '$50 off on orders above $200',
    discount: 50,
    discountType: 'fixed',
    minPurchase: 200,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 89,
    maxUsage: 200
  },
  {
    id: 'coup3',
    code: 'WELCOME10',
    description: '10% off for new customers',
    discount: 10,
    discountType: 'percentage',
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 312,
    maxUsage: 1000
  }
];

export const mockAnalytics: AnalyticsData = {
  totalRevenue: 125420.50,
  totalOrders: 1247,
  totalCustomers: 3892,
  totalProducts: 156,
  revenueChange: 12.5,
  ordersChange: 8.3,
  customersChange: 15.7,
  productsChange: 4.2
};

export const revenueChartData = [
  { month: 'Jan', revenue: 45000, orders: 420 },
  { month: 'Feb', revenue: 52000, orders: 490 },
  { month: 'Mar', revenue: 48000, orders: 450 },
  { month: 'Apr', revenue: 61000, orders: 570 },
  { month: 'May', revenue: 55000, orders: 520 },
  { month: 'Jun', revenue: 67000, orders: 630 }
];

export const categoryData = [
  { name: 'Electronics', value: 45, sales: 45000 },
  { name: 'Accessories', value: 25, sales: 25000 },
  { name: 'Wearables', value: 15, sales: 15000 },
  { name: 'Home', value: 10, sales: 10000 },
  { name: 'Others', value: 5, sales: 5000 }
];

export const categories = [
  'Electronics',
  'Accessories',
  'Wearables',
  'Home',
  'Footwear',
  'Fitness'
];