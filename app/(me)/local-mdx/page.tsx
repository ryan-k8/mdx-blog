import { compileMDXFromFile } from "@/lib/posts";

import "katex/dist/katex.min.css";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import MarkDownView from "@/components/ui/MarkdownView";

type Props = {};

export const metadata: Metadata = {
  title: "~/local-mdx",
  description: "only to be run in dev mode",
};

export default async function page({}: Props) {
  const env: ENV = process.env.NODE_ENV;

  if (env !== "development") {
    return notFound();
  }

  const post = await compileMDXFromFile("local.mdx");
  if (!post) return <h1>something went wrong!</h1>;

  const { meta, content } = post;

  return (
    <>
      <MarkDownView type="ssr" meta={meta} source={content} />
    </>
  );
}
