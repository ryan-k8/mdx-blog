import { createContext, useLayoutEffect, useState } from "react";

interface ITheme {
  theme: ThemeMode;
  mounted: boolean;
  toggleTheme: () => void;
  changeTheme: (arg0: ThemeMode) => void;
}
export const ThemeContext = createContext<ITheme | null>(null);

export default function ThemeContextProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState<boolean>(false);

  //before DOM paint?
  useLayoutEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const themeOnLocalStorage = window.localStorage.getItem("theme");
      if (!themeOnLocalStorage) {
        window.localStorage.setItem("theme", "light");
        setTheme("light");
      }
      setTheme(() => themeOnLocalStorage as ThemeMode);
    }

    (() => {
      setMounted(false);
    });
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    setTheme((prev) => {
      let nextTheme = (prev === "light" ? "dark" : "light") as ThemeMode;

      document.cookie = `theme=${nextTheme};path=/`;
      window.localStorage.setItem("theme", nextTheme);
      document.querySelector("html")!.setAttribute("class", nextTheme);
      return nextTheme;
    });
  };
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, changeTheme: (t) => setTheme(t), mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
