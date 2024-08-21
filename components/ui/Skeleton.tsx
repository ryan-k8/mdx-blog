import React from "react";

type SkeletonProps = {
  styles?: string;
};

export default function Skeleton({ styles }: SkeletonProps) {
  let style =
    "rounded-lg animate-pulse  bg-light brightness-[0.88] dark:brightness-150  dark:bg-dark ";

  if (styles) style += styles;
  return <div className={style}></div>;
}
