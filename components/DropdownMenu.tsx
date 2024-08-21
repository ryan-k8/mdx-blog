"use client";
import { useState } from "react";
import { FaAlignJustify, FaBook, FaImage, FaPencil } from "react-icons/fa6";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

type ListProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDownList: React.FC<ListProps> = (
  { setShow },
) => {
  return (
    <motion.div
      key="drop-down-list"
      initial={{ x: 150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, type: "spring" }}
      exit={{ x: 250, transition: { duration: 0.2 } }}
      className="z-auto"
    >
      <ul
        tabIndex={0}
        className="text-md font-medium dropdown-content z-[99] menu p-3 shadow bg-light  dark:bg-zinc-800 rounded-box w-60
        brightness-105 dark:brightness-100
        "
      >
        <li onClick={() => setShow((prev) => !prev)}>
          <Link href="/">
            <FaHome /> ~/Home
          </Link>
        </li>
        <li onClick={() => setShow((prev) => !prev)}>
          <Link href="/posts">
            <FaBook /> ~/Posts
          </Link>
        </li>
        <li onClick={() => setShow((prev) => !prev)}>
          <Link href="/works">
            <FaPencil /> ~/Works
          </Link>
        </li>
        <li onClick={() => setShow((prev) => !prev)}>
          <Link href="/gallery">
            <FaImage /> ~/Gallery
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

const DropDownMenu: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="dropdown dropdown-end">
      <button
        className="md:hidden btn btn-square btn-ghost"
        tabIndex={0}
        role="button"
        onClick={() => setShow((prev) => !prev)}
      >
        <FaAlignJustify />
      </button>
      <AnimatePresence>
        {show && <DropDownList show={show} setShow={setShow} />}
      </AnimatePresence>
    </div>
  );
};

export default DropDownMenu;
