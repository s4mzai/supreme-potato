"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"


export async function checkPassword(currentPassword:string) {
    const session = await auth()
    if(!session) return { success: false, error: "Unauthorized" };

    const existingUser = await prisma.user.findUnique({
      where:{email: session.user?.email || ""}   
    })

    if (!existingUser || !existingUser.password) {
    return { success: false, error: "User not found or invalid auth method" };
  }

  const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
  if (!isMatch) {
    return { success: false, error: "Incorrect current password" };
  }
  return { success: true, message: "Password matched successfully" };
}