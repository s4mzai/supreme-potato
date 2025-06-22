
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const dataToUpdate: any = {};

  dataToUpdate.name = body.name;

  if (Object.keys(dataToUpdate).length === 0) {
    return new Response("No data to update", { status: 400 });
  }
  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: dataToUpdate,
    });

    return new Response("Updated successfully", { status: 200 });
  } catch (error) {
    console.error("[UPDATE_USER]", error);
    return new Response("Server error", { status: 500 });
  }
}
