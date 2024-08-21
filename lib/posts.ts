import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { readFileSync } from "fs";
import { join } from "path";

import { MDXComponents } from "@/components/mdx";
import ServerImage from "@/components/ui/Image";

export function CompileMDX(source: string | Buffer) {
  return compileMDX<MetaData>({
    source: source,
    components: { ...MDXComponents, Image: ServerImage },
    //prettier-ignore
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        //@ts-ignore
        rehypePlugins: [rehypeSlug,[rehypePrettyCode,{theme:{light:'solarized-dark',dark:'dracula'},grid:true}],rehypeKatex,[rehypeAutolinkHeadings]],
        remarkPlugins: [remarkMath],
      },
    },
  });
}

export async function compileMDXFromFile(
  filename: string
): Promise<BlogPost | undefined> {
  const FILE_PATH = join(process.cwd(), "mdx", filename);

  const rawMDX = readFileSync(FILE_PATH);
  const { frontmatter, content } = await CompileMDX(rawMDX);
  const id = filename.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
      cover_image: frontmatter.cover_image,
      cover_image_url: frontmatter.cover_image_url,
    },
    content,
  };

  return blogPostObj;
}

type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

type GithubRepoDir = "posts" | "works";

export async function getPostsMetaData(
  directory?: GithubRepoDir
): Promise<MetaData[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/ryan-k8/website-stuff-/git/trees/master?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) {
    console.warn("error while fetching posts metadata: ", res);
    return undefined;
  }

  const repoFiletree: Filetree = await res.json();
  console.log(repoFiletree.tree[0].path);

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter(
      (path) =>
        path.endsWith(".mdx") && path.startsWith(`${directory ?? "works"}/`)
    )
    .map((path) => path.slice(6, path.length));

  const posts: MetaData[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file, directory ?? "works");
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }
  console.log("posts finalized :", posts);

  return posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });
}

export async function getPostByName(
  fileName: string,
  directory: GithubRepoDir,
  theme: ThemeMode = "light"
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/ryan-k8/website-stuff-/master/${directory}/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await CompileMDX(rawMDX);

  const id = fileName.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags,
      cover_image: frontmatter.cover_image,
      cover_image_url: frontmatter.cover_image_url,
    },
    content,
  };

  return blogPostObj;
}
