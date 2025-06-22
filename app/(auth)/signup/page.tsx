
import SignUpPage from '@/components/SignUpPage'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const signUnPage = async() => {
    const session = await auth()
    if(session) redirect("/")
  return (
    <SignUpPage/>
  )
}

export default signUnPage
