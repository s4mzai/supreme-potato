
import { signIn } from "@/lib/auth"
import { GitHub } from "@mui/icons-material"
import { toast } from "sonner"

export default function GithubSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
        toast.success("Welcome!")
        
      }}
    >
      <button className="border-2 border-black p-3 flex bg-white text-black gap-2 rounded-full cursor-pointer shadow-[6px_6px_0_#2e2e2e] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100" type="submit">
        <GitHub/>
      </button>
    </form>
  )
} 