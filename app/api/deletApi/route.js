// /api/user/delete-user
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function DELETE(request) {

  const body = await request.json();
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(body.id)
    },
  })
    return NextResponse.json({ message: deleteUser });
}
  