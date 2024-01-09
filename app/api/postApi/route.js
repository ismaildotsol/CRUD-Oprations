// /api/user/add-user
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

  
// Handles POST requests to /api
export async function POST(request) {
    const body = await request.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
          },
    });

    console.log('user created:', user);

    
    return NextResponse.json({ body });
}