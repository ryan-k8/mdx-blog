import Link from "next/link";

export const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="badge transition-none bg-[#C6F6D4] outline-none border-none font-semibold text-gray-700 rounded-sm dark:bg-[#33403B] dark:text-[#9AE6B4]
      ">
      {children}
    </span>
  );
};

export const Tags = ({ meta }: { meta: MetaData }) => {
  return (
    meta?.tags &&
    meta.tags.map((tag, i) => (
      <Link
        className="m-0 uppercase font-[400] badge outline-none border-none bg-washed-teal text-gray-700"
        key={i}
        href={`/posts?tag=${tag}`}
      >
        {tag}
      </Link>
    ))
  );
};
