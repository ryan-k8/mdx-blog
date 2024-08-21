import ContentForm from "@/components/pages/dashboard/ContentForm";
import { CompileMDX } from "@/lib/posts";
import { readFile } from "@/services/github";

type PageProps = {
  params: {
    dir: "posts" | "works";
    slug: string;
  };
};

export const revalidate = 0;

export default async function Edit({ params: { dir, slug } }: PageProps) {
  const githubPathId = `${dir}/${slug}.mdx`;

  //readFile from github

  const file = await readFile(githubPathId);
  if (!file) {
    return <h1>No such content was found</h1>;
  }

  // parse metadata
  const { frontmatter } = await CompileMDX(file.content);

  // if not found, show toast and redirect to dashboard

  return (
    <>
      <h2>{githubPathId}</h2>
      <p>{file.sha}</p>
      <ContentForm
        isEditing
        data={frontmatter}
        dir={dir}
        content={file.content}
      />
    </>
  );
}
