import { MDXRemote } from "next-mdx-remote";
import React from "react";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

import { MDXComponents } from "../mdx";
import Image from "./Image";
import MyImage from "../mdx/MyImage";

type MarkDownViewProps = (
  | {
      type: "client";
      meta: MetaData;
      source: ClientSideMDXContent;
    }
  | {
      type: "ssr";
      meta: MetaData;
      source: ServerSideMDXContent;
    }
) & { dontRenderMeta?: boolean };

const Tags = ({ meta }: { meta: MetaData }) => {
  return (
    meta?.tags &&
    meta.tags.map((tag, i) => (
      <Link
        className="uppercase font-[400] badge outline-none border-none bg-washed-teal text-gray-700"
        key={i}
        href={`/posts?tag=${tag}`}
      >
        {tag}
      </Link>
    ))
  );
};

export default function MarkDownView({
  meta,
  type,
  dontRenderMeta,
  source,
}: MarkDownViewProps) {
  return (
    <>
      {meta && !dontRenderMeta && (
        <section className="p-2 mb-3">
          <div className="mt-3">
            {meta?.cover_image &&
              meta?.cover_image_url &&
              (type === "ssr" ? (
                <Image source={meta.cover_image_url} alt={meta.title} />
              ) : (
                <MyImage source={meta.cover_image_url} alt={meta.title} />
              ))}
          </div>
          <h2 className="prose text-gray-700 dark:text-white font-bold text-4xl mt-4 mb-2 ">
            {meta.title}
          </h2>
          <div>
            <p className="mt-0 text-sm md:text-lg">
              {getFormattedDate(meta.date)}
            </p>
            <div className="flex flex-row gap-4 p-1">
              <Tags meta={meta} />
            </div>
          </div>
        </section>
      )}
      <article
        className="
      p-2 prose dark:prose-invert 
      md:prose-base text-gray-700 dark:text-white
    prose-headings:text-gray-700 prose-headings:dark:text-white
      dark:prose-blockquote:text-white
      prose-blockquote:text-gray-500
      prose-strong:text-gray-700 
      dark:prose-strong:text-white
      prose-a:no-underline
      hover:prose-a:underline
      dark:prose-a:text-neon-pink
      prose-a:text-washed-teal 
      prose-code:prose-sm
      prose-p:m-0
      "
      >
        {type === "client" ? (
          <MDXRemote {...source} components={{ ...MDXComponents }} />
        ) : (
          source
        )}
      </article>
    </>
  );
}
