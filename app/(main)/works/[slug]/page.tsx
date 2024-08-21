import { getPostByName, getPostsMetaData } from "@/lib/posts";
import { notFound } from "next/navigation";

import "katex/dist/katex.min.css";
import "@/styles/mdx.css";
import { cookies } from "next/headers";
import MarkDownView from "@/components/ui/MarkdownView";
import HighlightNavLink from "@/components/ui/HighlightNavLink";
import BreadCrumbs from "@/components/BreadCrumbs";

export const revalidate = 0;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const works = await getPostsMetaData();

  if (!works) return [];

  return works.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params: { slug } }: Props) {
  const work = await getPostByName(`${slug}.mdx`, "works");

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: work.meta.title,
    description: work.meta.description ?? "ryan-k8's work",
  };
}

export default async function Work({ params: { slug } }: Props) {
  const theme = (cookies().get("theme")?.value || "light") as ThemeMode;

  const work = await getPostByName(`${slug}.mdx`, "works", theme);

  if (!work) notFound();

  const { meta, content } = work;

  return (
    <>
      <BreadCrumbs
        contents={[
          <HighlightNavLink href="/works" text="Works" />,
          <p className="inline-flex items-center gap-x-2 text-lg">
            {meta.title}
            <span className=" transition-none badge outline-none border-none font-semibold text-gray-700 bg-zinc-200  dark:bg-dark-grey dark:text-white rounded-sm">
              {meta.date.slice(0, 4)}
            </span>
          </p>,
        ]}
      />
      <MarkDownView type="ssr" meta={meta} source={content} dontRenderMeta />
    </>
  );
}
