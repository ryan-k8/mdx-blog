type SubHeadingProps = {
  title: string | React.JSX.Element;
  children: React.ReactNode;
};

export default function SubHeading(
  { title, children }: SubHeadingProps,
) {
  return (
    <div className="my-2 md:my-3 py-3 w-full rounded-xl">
      <div className="px-3 py-2">
        <p className="text-lg font-semibold inline-block my-1 border-b-gray-600 border-b-[4px]">
          {title}
        </p>
      </div>
      <div className="px-3 py-2">
        {children}
      </div>
    </div>
  );
}
