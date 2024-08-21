import { getPostByName, getPostsMetaData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

import "katex/dist/katex.min.css";
import "@/styles/mdx.css";
import { cookies } from "next/headers";
import MarkDownView from "@/components/ui/MarkdownView";

export const revalidate = 0;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMetaData();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params: { slug } }: Props) {
  const post = await getPostByName(`${slug}.mdx`, "posts");

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { slug } }: Props) {
  const theme = (cookies().get("theme")?.value || "light") as ThemeMode;

  const post = await getPostByName(`${slug}.mdx`, "posts", theme);

  if (!post) notFound();

  const { meta, content } = post;

  return (
    <>
      <MarkDownView type="ssr" meta={meta} source={content} />
      <div className="py-2">
        <Link
          className="cursor-pointer py-2 px-6 rounded-md  text-md font-[400] text-washed-teal-alt dark:text-neon-pink  dark:hover:bg-dark-grey hover:bg-washed-teal transition-all duration-100"
          href="/posts"
        >
          ← Posts
        </Link>
      </div>
    </>
  );
}
