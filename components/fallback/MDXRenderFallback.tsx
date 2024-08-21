import React from "react";
import Button from "../ui/Button";
import useErrorBoundary from "@/hooks/useErrorBoundary";

type Props = {};

export default function MDXRenderFallback({}: Props) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg text-center">Couldn't Render Markdown</p>
        <Button title="Retry" onClick={resetBoundary} />
      </div>
    </div>
  );
}
