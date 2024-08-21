"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import MyImage from "../mdx/MyImage";
import getFormattedDate from "@/lib/getFormattedDate";

type ItemConfig = {
  date?: boolean;
  description?: boolean;
  textCenter?: boolean;
};

type ContentItemProps = {
  path: string;
  meta: MetaData;
  itemConfig?: ItemConfig;
};

const ContentItem = ({ path, meta, itemConfig }: ContentItemProps) => {
  const textAlign = itemConfig?.textCenter ? "text-center" : "text-left";
  const showDate = itemConfig?.date ?? true;
  const showDescription =
    (itemConfig?.description && !!meta?.description) ?? false;

  return (
    <Link
      href={`/${path}/${meta.id}`}
      className="rounded-md cursor-pointer p-1 hover:bg-light-grey dark:hover:bg-dark-grey"
    >
      <figure>
        <MyImage
          source={meta.cover_image_url}
          alt={meta.title}
          styles="shadow-md dark:shadow-md"
        />
      </figure>
      <div className={`px-2 mt-1 ${textAlign}`}>
        <h2 className="text-gray-700 dark:text-white">{meta.title}</h2>
        {showDate && <p className="text-sm">{getFormattedDate(meta.date)}</p>}
        {showDescription && <p className="text-sm">{meta.description}</p>}
      </div>
    </Link>
  );
};

type ContentsProps = {
  initialContents: MetaData[];
  searchParams: { [key: string]: string[] | string | undefined };
  title: string;
  itemConfig?: ItemConfig;
};

export default function Contents({
  title,
  searchParams,
  initialContents,
  itemConfig,
}: ContentsProps) {
  const allContents = useRef<MetaData[]>(initialContents ?? []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [contents, setContents] = useState<MetaData[]>(initialContents ?? []);
  const [relatedTags, setRelatedTags] = useState<
    Array<{ tag: string; count: number }>
  >([]);

  //before mounting
  useLayoutEffect(() => {
    if (searchParams.tag) {
      setContents((contents) =>
        contents.filter((post) => post.tags.includes(String(searchParams.tag)))
      );
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setContents((_) =>
        allContents.current.filter((content) =>
          content.tags.includes(String(searchTerm))
        )
      );
    }
  }, [searchTerm]);

  const onTagInputChange = (term: string): void => {
    if (!term) {
      setRelatedTags([]);
      setContents((prev) => [...allContents.current]);
      return;
    }

    let relatedTags: Array<{ tag: string; count: number }> = [];
    for (const content of allContents.current) {
      content.tags.forEach((tag) => {
        if (tag.includes(term)) {
          const foundIndex = relatedTags.find(({ tag: t }) => t === tag);
          if (foundIndex) {
            foundIndex.count = foundIndex.count + 1;
          } else {
            relatedTags.push({ tag: tag, count: 1 });
          }
        }
      });
    }
    relatedTags.sort(({ count }, { count: count_ }) =>
      count_ >= count ? 1 : -1
    );

    setRelatedTags(relatedTags.slice(0, 5)); // only return 5 tags at most,let the user prune the search
  };

  const RelatedTag = ({ tag, count }: { tag: string; count: number }) => {
    return (
      <div className="p-1">
        <span
          onClick={() => setSearchTerm(tag)}
          className="cursor-pointer inline rounded-lg px-2 py-1 bg-washed-teal text-gray-700 "
        >
          {tag} ( {count} )
        </span>
      </div>
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            {
              setSearchTerm(e.target.value);
              onTagInputChange(e.target.value);
            }
          }}
          placeholder="search for tags here (webdev, etc.)"
          className="input input-bordered bg-light focus:border-2 dark:bg-dark w-full max-w-xs focus:outline-none"
        />
        <div className="mt-2">
          {relatedTags.map(({ tag, count }) => (
            <RelatedTag tag={tag} count={count} />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h1 className="block px-2">
          {contents.length} {title} found
          {searchParams?.tag ? "with the tag " + searchParams?.tag : ""}
        </h1>
        <section className="p-5 md:p-3 lg:p-2 grid max-w-full grid-cols-2 gap-y-5 md:grid-cols-3 gap-x-5 md:gap-y-3 mt-5">
          {contents.map((content) => (
            <ContentItem
              path={title.toLocaleLowerCase()}
              key={content.id}
              meta={content}
              itemConfig={itemConfig}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
