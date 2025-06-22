import SignOut from "@/components/SignOut";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth()
  if(!session) redirect("/signin")
  return (
    <div className="h-screen bg-[#fcf5e5] flex flex-col items-center justify-center text-center">
      <div className="h-[600px] sm:h-auto w-[300px] flex md:w-1/2 bg-[#b8f3d7]  lg:w-1/3 m-auto p-5 border-black border-3 shadow-[6px_6px_0_#2e2e2e] rounded-xl flex-col items-center justify-around space-y-2 ">
        <h1 className="font-bold text-3xl">Profile</h1>
        <div className="w-[170px h-[170px] rounded-full overflow-hidden">
          <Image 
            src={session.user?.image || ""} 
            alt="User profile image"
            width={170}
            height={170}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-semibold text-2xl">{session?.user?.name}</p>
          <p className="">{`${session?.user?.email}` }</p>
        </div>
        <div className="flex gap-5">
          <SignOut/>
          <Link href={"/update"}>
            <button className="border-2 border-black p-3 flex bg-white text-black gap-2 rounded-full cursor-pointer shadow-[6px_6px_0_#2e2e2e] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100">Update</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
