"use client";
import type { Session } from "next-auth";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";

import { signIn, signOut } from "@/actions";

import { PiSignOut } from "react-icons/pi";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ProfileProps = {
  session: Session | null;
};

type ProfileDropDownProps = {} & ProfileProps;

const ProfileDropDown = ({ session }: ProfileDropDownProps) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <motion.ul
      key="profile-drop-down"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: -1, opacity: 1 }}
      transition={{
        duration: 0.45,
        type: "spring",
      }}
      exit={{ y: -10, opacity: 0 }}
      className="p-1 shadow menu dropdown-content z-[1] bg-light dark:bg-dark-grey  rounded-box w-[160px]"
    >
      {!session && (
        <li>
          <form
            action={signIn}
            className="w-full hover:bg-light-grey dark:hover:bg-dark-grey"
          >
            <button
              type="submit"
              className="flex flex-row items-center gap-x-1 w-full"
            >
              <PiSignOut className="h-full" /> Sign In
            </button>
          </form>
        </li>
      )}
      {session && (
        <>
          {!pathname.includes("dashboard") && (
            <li>
              <Link
                href="/dashboard"
                className="flex flex-row items-center gap-x-1 w-full"
              >
                <MdAdminPanelSettings size={24} className="h-full" /> Dashboard
              </Link>
            </li>
          )}
          <li>
            <form action={signOut} className="w-full">
              <button
                type="submit"
                className="flex flex-row items-center gap-x-1 w-full"
              >
                <PiSignOut size={24} className="h-full" /> Sign Out
              </button>
            </form>
          </li>
        </>
      )}
    </motion.ul>
  );
};

export default function Profile({ session }: ProfileProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="dropdown transition-none" tabIndex={0}>
      <summary
        className="m-1 btn btn-ghost transition-none shadow-none border-none
        "
        onClick={() => setShow((prev) => !prev)}
      >
        {session
          ? (
            <img
              src={session.user?.image!}
              className="w-[40px] h-[40px] rounded-full"
            />
          )
          : <CgProfile className="w-[40px] h-[40px] font-bold" />}
      </summary>
      <AnimatePresence>
        {show && <ProfileDropDown session={session} />}
      </AnimatePresence>
    </div>
  );
}
