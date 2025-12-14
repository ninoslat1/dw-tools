// import { PrismaMariaDb } from '@prisma/adapter-mariadb'
// import { PrismaClient } from '@prisma/client'

// const adapter = new PrismaMariaDb({
//   host: process.env.DB_HOST!,
//   port: Number(process.env.DB_PORT!),
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASSWORD!,
//   database: process.env.DB_NAME!,
//   connectionLimit: Number(process.env.DB_CONNECTION_LIMIT!),
//   acquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT!),
//   connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT!)
// })

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
//   adapter,
//   log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
// })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma