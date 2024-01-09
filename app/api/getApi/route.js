// getApi.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {

  const users = await prisma.user.findMany()
  return NextResponse.json({users});
}