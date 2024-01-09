// /api/user/add-user
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

  
// Handles POST requests to /api
export async function PUT(request) {
    const body = await request.json();
    console.log(body.name)
    console.log(body.id)
    const user = await prisma.user.update({
       
        where: {
            id: body.id,
          },
        data: {
            name: body.name,
            email: body.email,

          },
    });

    console.log('user created:', user);

    
    return NextResponse.json({ body });
}