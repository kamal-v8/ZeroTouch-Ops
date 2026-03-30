const { Worker } = require('bullmq');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const worker = new Worker('order_processing', async job => {
  console.log(`Processing order: ${job.data.orderId}`);
  
  // Simulate heavy processing (e.g., payment, stock check)
  await new Promise(resolve => setTimeout(resolve, 5000));

  await prisma.order.update({
    where: { id: job.data.orderId },
    data: { status: 'COMPLETED' }
  });

  console.log(`Order ${job.data.orderId} completed!`);
}, {
  connection: {
    host: process.env.REDIS_HOST || 'redis',
    port: 6379
  }
});

console.log('Worker listening for jobs...');
