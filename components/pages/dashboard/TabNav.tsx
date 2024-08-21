"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabNavProps = {
  children?: React.ReactNode;
};

type TabProps = {
  name: string;
  href: string;
};

type ClickableTabProps = {
  name: string;
  selected: boolean;
  onClick: (arg0: string) => void;
};

export const ClickableTab = ({
  name,
  selected,
  onClick,
}: ClickableTabProps) => {
  const handleClick = (_: React.SyntheticEvent) => {
    onClick(name);
  };

  const activeStyle =
    "font-bold bg-light-grey dark:bg-dark-grey text-washed-teal-alt dark:text-neon-pink";
  return (
    <li className="me-2 cursor-pointer" onClick={handleClick}>
      <span
        className={`inline-block dark:text-gray-400 px-10 py-4 rounded-t-lg hover:text-washed-teal-alt dark:hover:text-neon-pink hover:bg-light-grey  dark:hover:bg-dark-grey
        ${selected ? activeStyle : "yosh"}`}
      >
        {name}
      </span>
    </li>
  );
};

export const Tab = ({ name, href }: TabProps) => {
  const pathname = usePathname();
  console.log(pathname === href);

  const activeStyle =
    "font-bold bg-light-grey dark:bg-dark-grey text-washed-teal-alt dark:text-neon-pink";
  return (
    <li className="me-2">
      <Link
        href={href}
        aria-current="page"
        className={`inline-block dark:text-gray-400 px-10 py-4 rounded-t-lg hover:text-washed-teal-alt dark:hover:text-neon-pink hover:bg-light-grey  dark:hover:bg-dark-grey
        ${pathname.includes(href) ? activeStyle : "yosh"}`}
      >
        {name}
      </Link>
    </li>
  );
};

export default function TabNav({ children }: TabNavProps) {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:border-b-[1.25px] dark:border-gray-700 dark:text-gray-400">
      {children}
    </ul>
  );
}
