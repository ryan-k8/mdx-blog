"use server";

import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";

type ServerImageProps = {
  source: string;
  alt: string;
  priority?: boolean;
  blurUrl?: string;
};

export const getImage = async (src: string) => {
  const buffer = await fetch(src, { cache: "no-store" }).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export default async function ServerImage({
  source,
  alt,
  priority,
  blurUrl,
}: ServerImageProps) {
  let dataBlurUrl = blurUrl;
  let config = {
    src: source,
    width: 1280,
    height: 630,
  };

  if (!blurUrl) {
    try {
      const { base64, img } = await getImage(source);
      console.log({ base64, img });
      dataBlurUrl = base64;
      config = img;
    } catch (err: any) {
    }
  }

  let blurConfig: any = { placeholder: "blur", blurDataURL: dataBlurUrl };
  if (dataBlurUrl) {
    return (
      <div className="mb-2 relative max-w-full aspect-auto overflow-hidden">
        <Image
          {...config}
          alt={alt}
          priority={priority}
          className="mx-auto rounded-md object-contain"
          {...blurConfig}
        />
      </div>
    );
  }

  return (
    <div className="mb-2 relative max-w-full aspect-auto overflow-hidden">
      <Image
        {...config}
        alt={alt}
        priority={priority}
        className="mx-auto rounded-md object-contain"
      />
    </div>
  );
}
