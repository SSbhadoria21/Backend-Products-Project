import { PrismaClient } from '@prisma/client';
import { decodeCursor, encodeCursor } from '../utils/cursor.js';
import { productQuerySchema } from '../types/index.js';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const query = productQuerySchema.parse(req.query);
    
    let whereClause = {};
    if (query.category) {
      whereClause.category = query.category;
    }

    if (query.cursor) {
      const decoded = decodeCursor(query.cursor);
      if (decoded) {
        whereClause = {
          ...whereClause,
          OR: [
            { createdAt: { lt: new Date(decoded.createdAt) } },
            {
              createdAt: new Date(decoded.createdAt),
              id: { lt: decoded.id },
            },
          ],
        };
      }
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      take: query.limit,
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        createdAt: true,
      }
    });

    let nextCursor = null;
    if (products.length === query.limit) {
      const lastProduct = products[products.length - 1];
      nextCursor = encodeCursor({
        createdAt: lastProduct.createdAt.toISOString(),
        id: lastProduct.id,
      });
    }

    res.json({
      data: products,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      orderBy: {
        category: 'asc'
      }
    });
    res.json(categories.map((c) => c.category));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const simulateInsert = async (req, res) => {
  try {
    const CATEGORIES = [
      'Electronics', 'Books', 'Fashion', 'Gaming', 'Home',
      'Sports', 'Beauty', 'Automotive', 'Office', 'Toys'
    ];

    const batch = Array.from({ length: 50 }).map(() => ({
      name: faker.commerce.productName() + ' (New)',
      category: faker.helpers.arrayElement(CATEGORIES),
      price: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
    }));

    await prisma.product.createMany({
      data: batch,
    });

    res.json({ status: 'ok', inserted: 50 });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalProducts = await prisma.product.count();
    const categoriesCount = await prisma.product.groupBy({
      by: ['category']
    });
    const latestProduct = await prisma.product.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      totalProducts,
      totalCategories: categoriesCount.length,
      latestProductDate: latestProduct?.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkHealth = (req, res) => {
  res.json({ status: 'ok' });
};
