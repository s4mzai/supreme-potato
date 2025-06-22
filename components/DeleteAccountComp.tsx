// components/ConfirmDelete.tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { signOut } from "next-auth/react"

export default function DeleteAccountComp({ onCancel }: { onCancel: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleDeleteAccount = async () => {
    setLoading(true)
    const res = await fetch("/api/user/deleteAccount", {
      method: "DELETE",
    })

    if (!res.ok) {
      toast.error("Account deletion failed")
      setLoading(false)
      return
    }

    toast.success("Account deleted")
    await signOut({ callbackUrl: "/signin" })
  }

  return (
    <div className="border border-red-500 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 space-y-4 max-w-sm">
      <p className="text-red-700 dark:text-red-300 font-semibold">
        Are you sure you want to delete your account? This cannot be undone.
      </p>
      <div className="flex gap-4 items-center justify-center">
        <button
        className="mt-2 rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e] bg-red-300 text-black hover:bg-red-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Yes, delete it"}
        </button>
        <button className="mt-2 rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e] bg-white text-black hover:bg-gray-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"  onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
