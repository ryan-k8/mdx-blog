"use client";
import Image from "next/image";
import { useState } from "react";

type MyImageProps = {
  source: string | undefined;
  alt: string;
  priority?: boolean;
  styles?: string;
  blurUrl?: string;
};

export default function MyImage({
  source,
  alt,
  priority = false,
}: MyImageProps) {
  const [loading, setLoading] = useState<boolean>(true);

  const fallBackImage = "/fallback.png";

  return (
    <div className="flex relative max-w-full h-full aspect-auto overflow-hidden">
      <Image
        alt={alt}
        src={source ?? fallBackImage}
        width={650}
        height={650}
        priority={priority}
        className={`m-auto rounded-md max-w-full max-h-full transition-all duration-300 ${
          loading
            ? "scale-110 graycale blur-2xl"
            : " scale-100 grayscale-0 blur-0"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
