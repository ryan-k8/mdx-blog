import { FiExternalLink } from "react-icons/fi";

type MetaBoxProps = {
  title?: string;
  children: React.ReactNode;
  list?: boolean;
};

type MetaFieldProps = {
  field: string;
  children: string | JSX.Element;
};

type LinkProps = {
  children: string;
  href?: string;
};

export const Link = ({ children, href }: LinkProps) => {
  return (
    <a
      href={href ? href : "#"}
      target="_blank"
      className="inline-flex  items-center gap-x-1 mx-1 cursor-pointer 
      prose-a:text-pastel-blue dark:text-neon-pink no-underline hover:underline"
    >
      {children}
      <FiExternalLink />
    </a>
  );
};

export const MetaField = ({ field, children }: MetaFieldProps) => {
  return (
    <p className="flex flex-row items-center gap-x-2">
      <span
        className="badge transition-none outline-none border-none font-semibold text-gray-700 rounded-sm dark:bg-[#33403B] dark:text-[#9AE6B4]
      bg-[#C6F6D4]"
      >
        {field.toUpperCase()}
      </span>
      <span>{children}</span>
    </p>
  );
};

export default function MetaBox({ list, title, children }: MetaBoxProps) {
  let childToRender = children;
  if (list) childToRender = <ul className="list-disc">{children}</ul>;

  return (
    <div className="prose-p:m-0 my-10 prose-a:text-pastel-blue p-2 flex flex-col justify-center">
      {title && (
        <p className="mb-1 mt-0 text-center font-bold text-gray-700 dark:text-white">
          {title}
        </p>
      )}
      {childToRender}
    </div>
  );
}
