
import { signIn } from "@/lib/auth"
import { Google } from "@mui/icons-material";
export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")

      }}
    >
      <button className="border-2 border-black p-3 flex bg-white text-black gap-2 rounded-full cursor-pointer shadow-[6px_6px_0_#2e2e2e] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100" type="submit">
        <Google/>
      </button>
    </form>
  )
} 