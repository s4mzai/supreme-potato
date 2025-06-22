"use server"

import { signIn } from "@/lib/auth"
import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt';
import { signUpSchema, SignUpSchemaType } from "../lib/signUpSchema";

export async function signUpWithCredentials(formData: FormData) {
    
    try {
        const data ={
            name: formData.get("name"),
            email: formData.get("email"), 
            password: formData.get("password")
        }
        const { name, email, password } = signUpSchema.parse(data) as SignUpSchemaType

        const existingUser = await prisma.user.findUnique({
            where:{email}   
        })
        if(existingUser) {
            return { 
                success: false, 
                error: "User already exist!" 
            }

        }
        
        const hashPassword = await bcrypt.hash(password,10)

        await prisma.user.create({
            data:{
                name,
                email,
                ...(hashPassword && { password: hashPassword }),
                image: "/profile.jpg"
            },
        })  
        
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        console.log("Sign Up successful!")

        return { 
            success: true, 
            message: "Welcome! Signed Up successfully." 
        }
     
  }catch (error) {
    // console.error("Internal Error. Try again!:", err)
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again." 
    }

  }
}
