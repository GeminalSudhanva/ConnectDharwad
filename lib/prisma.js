import { PrismaClient } from '@prisma/client';

let prisma;
function get() {
  if (!process.env.DATABASE_URL) return null;
  if (!global.__prisma) global.__prisma = new PrismaClient();
  return global.__prisma;
}
export default get();
export { get as getPrisma };
