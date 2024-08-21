"use client";
import { FaMoon, FaSun } from "react-icons/fa6";

import { motion, Variants } from "framer-motion";
import { useCtx } from "@/hooks/useContext";
import { ThemeContext } from "@/context/ThemeContext";

type ThemeSwitcherProps = {
  initial: ThemeMode;
};

const variants: Variants = {
  jump: {
    y: -15,
    scaleY: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function ThemeSwitcher({}: ThemeSwitcherProps) {
  const { mounted, theme, toggleTheme } = useCtx(ThemeContext);

  if (!mounted) return <div className="h-[48px] w-[48px]"></div>; //placeholder

  return (
    <motion.button
      variants={variants}
      whileTap="jump"
      onClick={(_) => {
        toggleTheme();
      }}
      className={`btn btn-square btn-ghost  ${
        theme === "light"
          ? "bg-nice-purple hover:bg-nice-purple-alt bg text-white"
          : "text-dark bg-light hover:bg-light"
      }`}
    >
      {theme === "light" ? (
        <FaMoon className="text-sm" />
      ) : (
        <FaSun className="text-sm" />
      )}
    </motion.button>
  );
}
