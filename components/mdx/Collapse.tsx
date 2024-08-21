"use client";
import { useState } from "react";

type CollapseProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Collapse({ title, children }: CollapseProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="collapse mt-5 collapse-arrow bg-light dark:bg-dark
      border-[1.25px] border-light-grey dark:border-dark-grey">
      <input
        type="radio"
        name="my-accordion-2"
        checked={checked}
        onChange={(e) => setChecked(!!e?.target.value)}
        onClick={() => setChecked((prev) => !prev)}
      />
      <div className="collapse-title text-gray-700 dark:text-white text-lg font-medium
        after:text-gray-500">
        {title ?? "Click Me"}
      </div>
      <div
        data-collapse-content
        className="collapse-content text-gray-700 dark:text-white"
      >
        {children}
      </div>
    </div>
  );
}
