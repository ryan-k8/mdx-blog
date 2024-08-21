"use client";

import { motion } from "framer-motion";

// In app directory
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <ProgressBar
        height="4px"
        color="#319795"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </motion.div>
  );
}
