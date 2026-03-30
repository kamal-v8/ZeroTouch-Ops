const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { Queue } = require('bullmq');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Queue setup
const orderQueue = new Queue('order_processing', {
  connection: {
    host: process.env.REDIS_HOST || 'redis',
    port: 6379
  }
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- ROUTES ---

// Products
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

// Auth
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    res.json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email } });
});

// Orders
app.post('/api/orders', authenticate, async (req, res) => {
  const { items } = req.body; // [{ productId, quantity }]
  
  const productDetails = await prisma.product.findMany({
    where: { id: { in: items.map(i => i.productId) } }
  });

  const total = items.reduce((acc, item) => {
    const product = productDetails.find(p => p.id === item.productId);
    return acc + (product.price * item.quantity);
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: req.userId,
      total,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    },
    include: { items: true }
  });

  // Add to background queue
  await orderQueue.add('process_order', { orderId: order.id });

  res.status(201).json(order);
});

app.get('/api/orders', authenticate, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { items: { include: { product: true } } }
  });
  res.json(orders);
});

// Seed some data (for development)
app.post('/api/seed', async (req, res) => {
  const products = [
    { name: 'Arabica Premium', description: 'Smooth, balanced, and perfectly roasted Arabica beans.', price: 18.5, image: '/assets/coffee-1.jpg' },
    { name: 'Dark Roast Bold', description: 'Intense flavor with smoky notes for a morning kick.', price: 21.0, image: '/assets/coffee-2.jpg' },
    { name: 'Ethiopian Single Origin', description: 'Bright and fruity profile with a floral aroma.', price: 24.5, image: '/assets/coffee-3.jpg' },
    { name: 'Columbian Classic', description: 'Medium roast with a clean finish and caramel sweetness.', price: 19.9, image: '/assets/coffee-4.jpg' },
    { name: 'Decaf Delight', description: 'All the flavor without the jitters, Swiss water processed.', price: 17.0, image: '/assets/coffee-5.jpg' },
    { name: 'Espresso Blend', description: 'Fine grind for the perfect crema and rich body.', price: 22.5, image: '/assets/coffee-6.jpg' },
  ];
  await prisma.product.deleteMany(); // Clear old data
  await prisma.product.createMany({ data: products });
  res.json({ message: 'Seeded' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
