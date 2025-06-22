import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const newPassword = body.newPassword;

  if (!newPassword) {
    return new Response("No password provided", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        password: hashedPassword, 
      },
    });

    return new Response("Updated successfully", { status: 200 });
  } catch (error) {
    console.error("[UPDATE_USER_PASSWORD]", error);
    return new Response("Server error", { status: 500 });
  }
}
