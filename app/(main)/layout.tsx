import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/spacing/Container";
import ClientWrapper from "@/components/pages/ClientWrapper";
import { auth } from "@/auth";

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
min-h-screen
bg-light dark:bg-dark text-gray-700 dark:text-white 
`}
      >
        <ClientWrapper>
          <Navbar initialTheme={theme} session={session} />
          <Container>
            <main>{children}</main>
            <Footer />
          </Container>
        </ClientWrapper>
      </body>
    </html>
  );
}
