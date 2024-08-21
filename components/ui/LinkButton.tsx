import { cloneElement } from "react";
import Link from "next/link";

type LinkButtonProps = {
  icon?: React.JSX.Element;
  title: string;
  href?: string;
};

type LinkButtonAltProps = {
  title: string | React.JSX.Element;
  href: string;
};

export default function LinkButton({ icon, title, href }: LinkButtonProps) {
  const style =
    "cursor-pointer py-2 px-6 rounded-md  text-md font-[400] text-washed-teal-alt dark:text-washed-teal  dark:hover:bg-dark-grey hover:bg-washed-teal transition-all duration-100 delay-[5ms]";
  return (
    <div className="p-2 ">
      {href
        ? (
          <Link href={href} className={style}>
            {icon ? cloneElement(icon, { className: "inline text-md" }) : null}
            {" " + title}
          </Link>
        )
        : (
          <a className={style}>
            {icon ? cloneElement(icon, { className: "inline text-md" }) : null}
            {" " + title}
          </a>
        )}
    </div>
  );
}

export const LinkButtonAlt = ({ title, href }: LinkButtonAltProps) => {
  return (
    <Link
      href={href}
      className="ml-3 btn btn-primary text-white bg-washed-teal-alt dark:bg-washed-teal dark:text-gray-700 border-none hover:bg-teal-700
                      dark:hover:bg-teal-300"
    >
      {title}
    </Link>
  );
};
