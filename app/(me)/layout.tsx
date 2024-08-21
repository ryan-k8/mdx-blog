import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "../globals.css";
import Container from "@/components/spacing/Container";
import ClientWrapper from "@/components/pages/ClientWrapper";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import Link from "next/link";
import { auth } from "@/auth";
import NotAuthorized from "@/components/pages/NotAuthorized";
import Profile from "@/components/Profile";
import SideNav from "@/components/pages/dashboard/SideNav";

const inter = Inter({ subsets: ["latin"] });

type ThemeModeType = "light" | "dark";

export const metadata: Metadata = {
  title: "~/Ryan K.",
  description: "student github:ryan-k8",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (cookies().get("theme")?.value || "light") as ThemeModeType;
  const session = await auth();

  return (
    <html lang="en" className={`${theme}`}>
      <body
        className={`${inter.className} justify-center items-center w-full 
min-h-screen overflow-hidden no-scrollbar
bg-light dark:bg-dark text-gray-700 dark:text-white 
`}
      >
        <ClientWrapper notifications theme={theme}>
          <Container maxWidth={1600}>
            {session?.user?.role! === "ADMIN"
              ? (
                <div className="w-full h-full max-h-[90vh] no-scrollbar">
                  <div className="p-3 flex flex-row items-center justify-between">
                    <div className="px-2 flex flex-row items-center gap-x-3">
                      <ThemeSwitcher initial={theme} />
                      <div className="py-2">
                        <Link
                          className="cursor-pointer py-2 px-6 rounded-md  text-md font-[400] text-washed-teal-alt dark:text-neon-pink  dark:hover:bg-dark-grey hover:bg-washed-teal transition-all duration-100"
                          href="/"
                        >
                          ← Home
                        </Link>
                      </div>
                    </div>
                    <div className="mr-[85px]">
                      <Profile session={session} />
                    </div>
                  </div>
                  <main className="flex">
                    <SideNav />
                    <div className="max-h-[90vh] overflow-y-scroll no-scrollbar w-full">
                      {children}
                    </div>
                  </main>
                </div>
              )
              : <NotAuthorized />}
          </Container>
        </ClientWrapper>
      </body>
    </html>
  );
}
