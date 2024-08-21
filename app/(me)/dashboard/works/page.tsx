import HighlightLink from "@/components/ui/HighlightLink";
import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMetaData } from "@/lib/posts";
import { Fragment } from "react";
import Actions from "../../../../components/pages/dashboard/actions";
import LinkButton from "@/components/ui/LinkButton";
import { Badge, Tags } from "@/components/pages/dashboard/Typography";
import { FaPlus } from "react-icons/fa6";

type PageProps = {};

export default async function Page({}: PageProps) {
  const works = await getPostsMetaData("works");

  return (
    <div>
      <div className="py-2 px-8 flex flex-row justify-end">
        <LinkButton
          href="/dashboard/posts/create"
          icon={<FaPlus size={25} />}
          title=" Create"
        />
      </div>
      {works &&
        works.map((work) => (
          <Fragment key={work.id}>
            <div className="flex flex-row justify-between w-full pb-2 pt-3 px-5 bg-light-grey dark:bg-dark-grey my-2 rounded-lg ">
              <div>
                <h3 className="text-gray-700 dark:text-white text-2xl">
                  {work.title}
                </h3>
                <div className="flex flex-col gap-y-2">
                  <p>
                    <Badge>{work.id}</Badge>
                    &nbsp;
                    <HighlightLink
                      text="view"
                      icon
                      href={`http://localhost:3000/posts/${work.id}`}
                    />
                  </p>
                  <div className="flex flex-row gap-x-1">
                    <Tags meta={work} />
                  </div>
                  <p>
                    <Badge>createdAt</Badge>
                    &nbsp; {getFormattedDate(work.date)}
                  </p>
                </div>
              </div>
              <Actions id={work.id} />
            </div>
          </Fragment>
        ))}
    </div>
  );
}
