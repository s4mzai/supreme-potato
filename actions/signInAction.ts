"use server"

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function signInWithCredentials(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    console.log("Attempting sign in with:", email)
    
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    console.log("Sign in successful!")
    // If we reach here, sign in was successful
    return { 
      success: true, 
      message: "Welcome! Signed in successfully." 
    }
    
  } catch (error) {
    console.error("Sign in error:", error)
    console.error("Error type:", error?.constructor?.name)
    
    if (error instanceof AuthError) {
      console.log("It's an AuthError, type:", error.type)
      switch (error.type) {
        case "CredentialsSignin":
          return { 
            success: false, 
            error: "Invalid email or password. Please try again." 
          }
        case "CallbackRouteError":
          return { 
            success: false, 
            error: "Authentication failed. Please try again." 
          }
        default:
          return { 
            success: false, 
            error: "Something went wrong. Please try again." 
          }
      }
    }
    
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again." 
    }
  }
}