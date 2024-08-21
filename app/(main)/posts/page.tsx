import { getPostsMetaData } from "@/lib/posts";
import ContentsClient from "@/components/pages/Contents";

export async function generateMetadata() {
  const posts = await getPostsMetaData("posts");

  if (!posts) return { title: "no posts found!" };

  return { title: "~/Posts" };
}

export default async function Posts({
  searchParams,
}: {
  searchParams: { [key: string]: string[] | string | undefined };
}) {
  const posts = await getPostsMetaData("posts");
  console.log('posts i got : ',posts);
  if (!posts) return <h1>no posts found</h1>;

  return (
    <>
      <div className="mt-0 md:mt-5 px-2">
        <ContentsClient
          searchParams={searchParams}
          title="posts"
          initialContents={posts}
        />
      </div>
    </>
  );
}
