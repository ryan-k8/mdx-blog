"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdCloud, MdDashboard, MdNewspaper } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

type SideNavProps = {};

const NavLink = ({
  children,
  href,
  active,
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
}) => {
  let style = `flex flex-row gap-x-2  
  py-3 px-2 items-center transition-colors duration-150 hover:bg-light-grey dark:hover:bg-dark-grey rounded-md`;
  if (active) {
    style += " border-l-[4px] border-l-washed-teal-alt dark:border-l-neon-pink";
  }
  return (
    <Link href={href} className={style}>
      {children}
    </Link>
  );
};

export default function SideNav({}: SideNavProps) {
  const pathname = usePathname(); //TODO: add active highlight later
  console.log(pathname);

  return (
    <div className="min-h-[90vh] min-w-auto xl:min-w-[15%] max-w-[20%] no-scrollbar overflow-hidden py-2 pl-1 xl:pr-2">
      <div className="flex flex-col gap-y-1">
        <NavLink href="/dashboard" active>
          <MdDashboard size={25} />
          <span className="hidden xl:block">Content</span>
        </NavLink>
        <NavLink href="/cloudinary">
          <MdCloud size={25} />
          <span className="hidden xl:block">Cloudinary</span>
        </NavLink>
        <NavLink href="/mdx-playground">
          <FaEdit size={25} />
          <span className="hidden xl:block">MDX Playground</span>
        </NavLink>
        <NavLink href="/local-mdx">
          <MdNewspaper size={25} />
          <span className="hidden xl:block">NewsLetter</span>
        </NavLink>
        <NavLink href="/dashboard/gallery">
          <GrGallery size={25} />
          <span className="hidden xl:block">Gallery</span>
        </NavLink>
      </div>
    </div>
  );
}
