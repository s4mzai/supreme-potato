// /lib/getProvider.ts
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getUserAuthProvider() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { accounts: true },
  });

  // If no accounts = credentials login
  if (!user) return null;

  const provider = user.accounts[0]?.provider || "credentials"; // fallback
  return provider;
}
