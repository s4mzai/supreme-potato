import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    return new Response("Account deleted", { status: 200 });
  } catch (error) {
    console.error("[DELETE_USER]", error);
    return new Response("Server error", { status: 500 });
  }
}
