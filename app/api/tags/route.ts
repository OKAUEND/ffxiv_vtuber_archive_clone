import { prisma } from '@/_utile/prisma';

export async function GET() {
  const response = await prisma.tags.findMany();
  return new Response(JSON.stringify(response));
}
