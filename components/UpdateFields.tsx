"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { checkPassword } from "@/actions/checkPassword";
import DeleteAccountComp from "@/components/DeleteAccountComp"
import { useRouter } from "next/navigation";

const UpdateFields = ({ name,provider }: { name: string,provider:string }) => {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [isNamePending, startNameTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  const [updateName, setUpdateName] = useState(false);
  const [newName, setNewName] = useState(name);

  const [updatePassword, setUpdatePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const handleSubmitName = async (formData: FormData) => {
    startNameTransition(async () => {
      const name = formData.get("name");

      const res = await fetch("/api/user/update/updateName", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) toast.error("Update failed");
      else {
        toast.success("Name updated!");
        router.push("/")
      }
      setUpdateName(false);
    });
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) return toast.error("Enter a new password");

    startPasswordTransition(async () => {
      const res = await fetch("/api/user/update/updatePassword", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (!res.ok) toast.error("Password update failed");
      else {
        toast.success("Password updated!");
        resetPasswordFields();
        router.push("/")
      }
    });
  };

  const handleCheckPassword = async () => {
    startPasswordTransition(async () => {
      const res = await checkPassword(currentPassword);

      if (!res?.success) {
        toast.error("Incorrect current password");
      } else {
        toast.success("Password verified!");
        setIsPasswordVerified(true);
      }
    });
  };

  const resetPasswordFields = () => {
    setUpdatePassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setIsPasswordVerified(false);
  };

  const toggleEditName = () => {
    if (updateName) {
      setNewName(name);
      setUpdateName(false);
    } else setUpdateName(true);
  };

  const toggleEditPassword = () => {
    if (updatePassword) {
      resetPasswordFields();
    } else setUpdatePassword(true);
  };
  return (
    <div className="h-screen bg-[#fcf5e5] flex flex-col items-center justify-center text-center p-5">

      <div className="flex md:w-1/2 lg:w-1/2 p-5 m-auto border-black border-3 shadow-[6px_6px_0_#2e2e2e] rounded-xl flex-col items-center space-y-2">
      <h1 className="font-bold text-3xl">
        Update Information
      </h1>

      {/* --- NAME FORM --- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmitName(formData);
          }}
          className="w-full"
        >
          <label className="flex gap-2 items-center font-semibold">Name:</label>
          <div className="flex sm:gap-5 flex-col sm:flex-row">
            <input
              disabled={!updateName}
              name="name"
              type="text"
              required
              className=" active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100
            disabled:bg-gray-300 outline-none w-full bg-white text-black rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e]"
              placeholder="Jon Doe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              type="button"
              disabled={isNamePending}
              onClick={toggleEditName}
              className="mt-4 rounded-lg border-2 border-black p-3 px-4 shadow-[6px_6px_0_#2e2e2e] bg-white text-black hover:bg-gray-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
            >
              {updateName ? "Cancel" : "Edit Name"}
            </button>
          </div>

          {updateName && (
            <button
              type="submit"
              disabled={isNamePending}
              className="mt-2 w-full rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e] bg-white text-black hover:bg-gray-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
            >
              {isNamePending ? "Updating..." : "Save Name"}
            </button>
          )}
        </form>

        {/* --- PASSWORD FORM --- */}
        {/* IF THE USER IF FROM CREDENTIALS THEN TO SHOW THEM OR IF FROM PROVIDER THEN NO */}
        {provider==="credentials"?
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdatePassword();
            }}
            className="w-full"
          >
            <label className="flex gap-2 items-center font-semibold">Password:</label>
            <div className="flex sm:gap-5 flex-col sm:flex-row">
              <input
                type="password"
                disabled={!updatePassword || isPasswordVerified}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className=" active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100
              disabled:bg-gray-300 outline-none w-full bg-white text-black rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e]"
                placeholder="Current password"
              />
              <button
                type="button"
                disabled={isPasswordPending}
                onClick={toggleEditPassword}
                className="mt-4 rounded-lg border-2 border-black p-3 px-4 shadow-[6px_6px_0_#2e2e2e] bg-white text-black hover:bg-gray-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
              >
                {updatePassword ? "Cancel" : "Edit Password"}
              </button>
            </div>

            {updatePassword && !isPasswordVerified && (
              <button
                type="button"
                onClick={handleCheckPassword}
                disabled={isPasswordPending || !currentPassword}
                className="mt-2 w-full rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e] bg-white text-black hover:bg-gray-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
              >
                {isPasswordPending ? "Checking..." : "Verify Password"}
              </button>
            )}

            {isPasswordVerified && (
              <>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-3 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100
                  outline-none w-full bg-white text-black rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e]"
                />
                <button
                  type="submit"
                  disabled={isPasswordPending}
                  className="mt-2 w-full rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e] bg-white text-black hover:bg-gray-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
                >
                  {isPasswordPending ? "Updating..." : "Save Password"}
                </button>
              </>
            )}
          </form>
          :""}

      </div>
      {!showConfirm ? (
          <button className="mt-2 bg-red-300 rounded-lg border-2 border-black p-3 px-6 shadow-[6px_6px_0_#2e2e2e] text-black hover:bg-red-200 disabled:opacity-50 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100" onClick={() => setShowConfirm(true)}>
            Delete My Account
          </button>
        ) : (
          <DeleteAccountComp onCancel={() => setShowConfirm(false)} />
        )}
      </div>
    
  );
};

export default UpdateFields;
