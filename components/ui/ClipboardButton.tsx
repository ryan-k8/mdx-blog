"use client";
import { useState } from "react";
import { FaClipboardCheck, FaCopy } from "react-icons/fa6";

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button disabled={isCopied} onClick={copy}>
      {!isCopied ? <FaCopy /> : <FaClipboardCheck />}
    </button>
  );
};

export default CopyButton;
