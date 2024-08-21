import { cloneElement } from "react";
import { FiExternalLink } from "react-icons/fi";

type HighlightLinkProps = {
  text: string;
  href?: string;
  target?: "_blank" | "_self";
  icon?: boolean;
};

export default function HighlightLink({
  text,
  href,
  icon,
  target,
}: HighlightLinkProps) {
  let result = (
    <a
      href={href}
      className={`${
        icon && "inline-flex flex-row items-center"
      } mx-1 cursor-pointer text-washed-teal-alt   dark:text-neon-pink no-underline hover:underline`}
    >
      {text}
      {icon && <FiExternalLink />}
    </a>
  );

  if (href && !target) {
    result = cloneElement(result, { href: href, target: "_blank" });
  }
  if (href && target) {
    result = cloneElement(result, { href: href, target: target });
  }

  return result;
}
