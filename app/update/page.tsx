import UpdateFields from "@/components/UpdateFields";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { getUserAuthProvider } from "@/lib/getProvider";

export default async function UpdatePage() {
  const session = await auth()   
  if(!session) redirect("/signin")
  const provider = await getUserAuthProvider(); 
  
  return <UpdateFields name={session.user?.name || ""} provider={provider || ""} />;
}