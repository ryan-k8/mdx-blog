import React from "react";

type BreadCrumbsProps = {
  contents: JSX.Element[];
  hideOnLargeScreens?: boolean;
};

export default function BreadCrumbs({
  hideOnLargeScreens,
  contents,
}: BreadCrumbsProps) {
  return (
    <div className={`ml-2 ${hideOnLargeScreens && "md:hidden"} py-2`}>
      <div className="text-base sm:text-lg breadcrumbs">
        <ul>
          {contents.map((content) => (
            <li>{content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
