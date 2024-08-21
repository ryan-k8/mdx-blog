import HighlightLink from "@/components/ui/HighlightLink";
import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMetaData } from "@/lib/posts";
import { Fragment } from "react";
import Actions from "@/components/pages/dashboard/actions";
import { FaPlus } from "react-icons/fa6";

import { Badge, Tags } from "@/components/pages/dashboard/Typography";
import LinkButton from "@/components/ui/LinkButton";

type PageProps = {};

export const revalidate = 0;

export default async function page({}: PageProps) {
  const posts = await getPostsMetaData("posts");

  return (
    <div>
      <div className="py-2 px-8 flex flex-row justify-end">
        <LinkButton
          href="/dashboard/posts/create"
          icon={<FaPlus size={25} />}
          title=" Create"
        />
      </div>
      {posts &&
        posts.map((post) => (
          <Fragment key={post.id}>
            <div className="flex flex-row justify-between w-full pb-2 pt-3 px-5 bg-light-grey dark:bg-dark-grey my-2 rounded-lg ">
              <div>
                <h3 className="text-gray-700 dark:text-white text-2xl">
                  {post.title}
                </h3>
                <div className="flex flex-col gap-y-2">
                  <p>
                    <Badge>{post.id}</Badge>
                    &nbsp;
                    <HighlightLink
                      text="view"
                      icon
                      href={`http://localhost:3000/posts/${post.id}`}
                    />
                  </p>
                  <div className="flex flex-row gap-x-1">
                    <Tags meta={post} />
                  </div>
                  <p>
                    <Badge>createdAt</Badge>
                    &nbsp; {getFormattedDate(post.date)}
                  </p>
                </div>
              </div>
              <Actions type="posts" id={post.id} />
            </div>
          </Fragment>
        ))}
    </div>
  );
}
