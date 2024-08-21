import { getPostsMetaData } from "@/lib/posts";
import ContentsClient from "@/components/pages/Contents";

export async function generateMetadata() {
  const works = await getPostsMetaData("works");

  if (!works) return { title: "no works found!" };

  return { title: "~/Works" };
}

export default async function Posts({
  searchParams,
}: {
  searchParams: { [key: string]: string[] | string | undefined };
}) {
  const works = await getPostsMetaData("works");
  if (!works) {
    return (
      <h1 className="h-screen flex items-start justify-center text-center prose-2xl text-gray-700 dark:text-white">
        <span>No Works found</span>
      </h1>
    );
  }

  return (
    <>
      <div className="mt-0 md:mt-5 px-2">
        <ContentsClient
          searchParams={searchParams}
          title="Works"
          initialContents={works}
          itemConfig={{
            date: false,
            description: true,
            textCenter: true,
          }}
        />
      </div>
    </>
  );
}
