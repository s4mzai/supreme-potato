import CredentialsSignIn  from "@/components/CredentialsSignIn";
import GithubSignIn from "@/components/GithubSignIn";
import GoogleSignIn from "@/components/GoogleSignIn";
import Link from "next/link";

const SignInPage = async() => {
  return (
    <div className="h-screen bg-[#fcf5e5] flex flex-col items-center justify-center text-center p-5">
      <div className="w-full">
          <div className="flex md:w-1/2 lg:w-1/3 m-auto border-black border-3 shadow-[6px_6px_0_#2e2e2e] rounded-xl flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold p-5">Sign In</h1>
            <div className="w-full flex flex-col items-center space-y-2 bg-[#b8f3d7] rounded-b-xl">
              <CredentialsSignIn/>
              <h1 className="text-2xl font-bold">or</h1>
              <div className="flex gap-2">
                <GoogleSignIn/>
                <GithubSignIn/>
              </div>
              <div className="mb-3">
                <span className="flex gap-1">
                    <Link className="text-green-600 hover:underline" href={"signup"}>SignUp</Link>
                    Instead
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SignInPage