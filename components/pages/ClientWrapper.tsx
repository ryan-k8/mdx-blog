"use client";
import ThemeContextProvider, { ThemeContext } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { useCtx } from "@/hooks/useContext";

type ClientWrapperProps = {
  children: React.ReactNode;
  notifications?: boolean;
  theme?: ThemeMode;
};

const NotifcationWrapper = () => {
  const { theme } = useCtx(ThemeContext);

  return (
    <Toaster
      toastOptions={{
        duration: 5000,
        style: {
          maxWidth: 450,
          color: theme === "light" ? "black" : "white",
          backgroundColor: theme === "light" ? "#f1e6db" : "#202023",
        },
      }}
    />
  );
};

export default function ClientWrapper({
  children,
  notifications = false,
}: ClientWrapperProps) {
  return (
    <ThemeContextProvider>
      {children} {notifications && <NotifcationWrapper />}
    </ThemeContextProvider>
  );
}
