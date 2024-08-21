"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import ClipboardButton from "../ui/ClipboardButton";
import { FileIcon } from "../ui/FileIcon";

type Props = {
  fileName?: string;
  children: ReactElement<
    { "data-rehype-pretty-code-figure": string },
    "figure"
  >;
};

export default function Code({ fileName, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [codeString, setSetCodeString] = useState<string>("");

  if (!children) throw Error("Component requires children");

  if (
    !Object.keys(children.props).includes("data-rehype-pretty-code-figure") &&
    !(children.type === "figure")
  ) {
    throw Error("Component works only with valid code blocks");
  }

  useEffect(() => {
    if (ref.current) {
      const query = ref.current.querySelector("code")?.innerText.trim();
      setSetCodeString(query!);
    }
  }, [children]);

  const themes = "bg-solarized-bg  dark:bg-dracula-bg";

  return (
    <div className="my-5">
      <div
        className={`border-[0.2px] border-gray-700 inline-flex items-center justify-between gap-x-1 w-full p-2 pb-0 rounded-t-md text-white ${themes}`}
      >
        <FileIcon fileName={fileName ?? "code "} />
        <ClipboardButton text={codeString} />
      </div>
      <div data-component ref={ref} >
        {children}
      </div>
    </div>
  );
}
