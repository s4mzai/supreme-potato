import SignInPage from '@/components/SignInPage'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const signInPage = async() => {
    const session = await auth()
    if(session) redirect("/")
  return (
    <SignInPage/>
  )
}

export default signInPage