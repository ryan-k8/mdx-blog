"use client";

import Signature from "./Signature";
import Container from "./spacing/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropDownMenu from "./DropdownMenu";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import { Session } from "next-auth";
import Profile from "./Profile";

type NavbarProps = {
  initialTheme: "light" | "dark";
  session: Session | null;
};

const Navbar: React.FC<NavbarProps> = ({ initialTheme, session }) => {
  const pathname = usePathname();
  return (
    <div className="backdrop-filter backdrop-blur-md sticky top-0 z-[999]">
      <Container>
        <div className="navbar flex flex-row justify-between items-center">
          <div>
            <Link href="/">
              <Signature width={104} height={40} />
            </Link>
          </div>
          <div className="hidden md:block">
            <Link
              className={`btn btn-ghost text-lg  ${
                pathname === "/works"
                  ? "bg-light-grey dark:bg-light dark:text-black dark:brightness-100"
                  : ""
              }`}
              href="/works"
            >
              ~/Works
            </Link>
            <Link
              className={`btn btn-ghost  text-lg mx-2 ${
                pathname === "/posts"
                  ? "bg-light-grey dark:bg-light dark:text-black dark:brightness-100"
                  : ""
              }`}
              href="/posts"
            >
              ~/Posts
            </Link>
            <Link
              className={`btn btn-ghost  text-lg mx-2 ${
                pathname === "/gallery"
                  ? "bg-light-grey dark:bg-light dark:text-black dark:brightness-100"
                  : ""
              }`}
              href="/gallery"
            >
              ~/Gallery
            </Link>
          </div>
          <div className="flex gap-x-2">
            <Profile session={session} />
            <ThemeSwitcher initial={initialTheme} />
            <div>
              <DropDownMenu />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
