import Link from "next/link";

type HighlightNavLinkProps = {
  text: string;
  href: string;
};

export default function HighlightNavLink({
  text,
  href,
}: HighlightNavLinkProps) {
  let result = (
    <Link
      href={href}
      className={`text-sm mx-1 cursor-pointer text-washed-teal-alt   dark:text-neon-pink no-underline hover:underline`}
    >
      {text}
    </Link>
  );
  return result;
}
