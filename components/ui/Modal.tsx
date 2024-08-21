"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

export const SpringModal = ({
  isOpen,
  setIsOpen,
  children,
  coverWholeScreen,
  dontCloseOnClick,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  coverWholeScreen?: boolean;
  dontCloseOnClick?: boolean;
}) => {
  const handleClick = (e: any) => {
    if (dontCloseOnClick) return;

    setIsOpen(false);
  };
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
          className={`bg-slate-900/20 backdrop-blur fixed inset-0 z-[999] grid place-items-center overflow-y-scroll`}
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            className={`text-white p-2 mx-auto w-full ${
              coverWholeScreen
                ? "max-w-screen-xl  h-[100vh]"
                : "max-w-3xl grid place-items-center "
            } rounded-xl`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
