"use client";

import { SpringModal } from "@/components/ui/Modal";
import useMDX from "@/hooks/useMDX";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/mdx";
import { Tags } from "@/components/pages/dashboard/Typography";
import "katex/dist/katex.min.css";
import "@/styles/mdx.css";

import getFormattedDate from "@/lib/getFormattedDate";
import { MdClose } from "react-icons/md";
import { createContent, updateContent } from "@/actions/content";
import CheckBox from "@/components/ui/CheckBox";

type TMetaInputs = {
  title: string;
  tags: string;
  description: string;
  isPublished: boolean;
  hasCoverImage: boolean;
  date: string;
  slug: string;
};

type ContentFormProps =
  | {
    isEditing: false;
    data: null;
    content: string;
    dir: "posts" | "works";
  }
  | {
    isEditing: true;
    data: MetaData;
    content: string;
    dir: "posts" | "works";
  };

export default function ContentForm(
  { isEditing, data, dir, content }: ContentFormProps,
) {
  const formAction = async (form: FormData) => {
    console.log(Object.fromEntries(form));

    const submittedByPreviewBtn = form.get("preview");
    if (submittedByPreviewBtn) {
      return;
    }

    // await createContent("posts", data, markdown);
    if (isEditing && data) {
      await updateContent(data.id, dir, markdown, form);
    }
  };

  const initialMetaInputs: TMetaInputs = {
    title: "",
    tags: "",
    description: "",
    isPublished: false,
    hasCoverImage: false,
    date: "",
    slug: "",
  };

  if (isEditing && data) {
    initialMetaInputs.title = data.title;
    initialMetaInputs.tags = data.tags.toString();
    initialMetaInputs.description = String(data.description);
    initialMetaInputs.isPublished = Boolean(data.is_published);
    initialMetaInputs.date = data.date;
    initialMetaInputs.slug = data.id;
    initialMetaInputs.hasCoverImage = data.cover_image
      ? data.cover_image
      : false;
  }

  const [metaInputs, setMetaInputs] = useState<TMetaInputs>(initialMetaInputs);

  const [open, setOpen] = useState<boolean>(false);

  //TODO : need to work with string escaping so taht '',"" can be used
  const [contentInput, setContentInput] = useState<string>(
    isEditing ? content.split("---")[2].trim() : "",
  );

  const [markdown, setMarkdown] = useState<string>(content);

  useEffect(() => {
    //TODO: generate new markdown with new metafields and stuff (a lot of string work?)
    let meta = `---
 id: "${metaInputs.slug || metaInputs.title.replaceAll(" ", "-")}"
 title: "${metaInputs.title}"
 date: "${metaInputs.date}"
 tags: [${metaInputs.tags.split(",").toString()}]
 description: "${metaInputs.description}"
 is_published: ${metaInputs.isPublished}
 cover_image: ${isEditing ? true : false} 
 cover_image_url: "${
      isEditing ? data.cover_image_url : "insert_cover_img_here"
    }"

---\n`;

    meta += contentInput;
    setMarkdown(meta);
    console.log(markdown);
  }, [metaInputs, contentInput]);

  const [source, , err] = useMDX(markdown);

  const meta = source?.frontmatter;

  if (err) console.log(err.message);

  return (
    <div className="p-5">
      <form action={formAction}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              name="title"
              value={metaInputs.title}
              onChange={(e) =>
                setMetaInputs((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-light-grey-alt outline-none border-none focus:outline-washed-teal dark:focus:outline-neon-pink  text-gray-700 dark:text-white text-sm rounded-lg  block w-full p-2.5 dark:bg-dark-grey"
              placeholder="Title"
            />
          </div>
          <div>
            <input
              type="text"
              name="slug"
              value={metaInputs.slug}
              onChange={(e) =>
                setMetaInputs((prev) => ({ ...prev, slug: e.target.value }))}
              className="bg-light-grey-alt outline-none border-none focus:outline-washed-teal dark:focus:outline-neon-pink  text-gray-701 dark:text-white text-sm rounded-lg  block w-full p-2.5 dark:bg-dark-grey"
              placeholder="custom slug"
              disabled={isEditing}
            />
          </div>
          <div>
            <input
              type="text"
              name="tags"
              value={metaInputs.tags}
              onChange={(e) =>
                setMetaInputs((prev) => ({ ...prev, tags: e.target.value }))}
              className="bg-light-grey-alt outline-none border-none focus:outline-washed-teal dark:focus:outline-neon-pink  text-gray-700 dark:text-white text-sm rounded-lg  block w-full p-2.5 dark:bg-dark-grey"
              placeholder="tags (comma seperated)"
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              value={metaInputs.description}
              onChange={(e) =>
                setMetaInputs((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))}
              className="bg-light-grey-alt outline-none border-none focus:outline-washed-teal dark:focus:outline-neon-pink  text-gray-700 dark:text-white text-sm rounded-lg  block w-full p-2.5 dark:bg-dark-grey"
              placeholder="short description (optional)"
            />
          </div>
          <div>
            <input
              type="date"
              name="created"
              value={metaInputs.date}
              onChange={(e) =>
                setMetaInputs((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))}
              className="bg-light-grey-alt outline-none border-none focus:outline-washed-teal dark:focus:outline-neon-pink  text-gray-700 dark:text-white text-sm rounded-lg  block w-full p-2.5 dark:bg-dark-grey"
            />
          </div>
        </div>
        <div className="w-full mb-4 rounded-lg focus:outline-red-600">
          <textarea
            id="editor"
            rows={10}
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            className="rounded-lg  px-2 py-5 block outline-none border-none w-full  text-sm bg-light-grey  dark:bg-dark-grey text-gray-700 dark:text-white"
            placeholder="Write an article..."
          >
          </textarea>
        </div>
        <div className="flex flex-col mb-4 gap-y-2">
          <div className="flex items-center gap-x-2">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={metaInputs.hasCoverImage}
              onChange={() =>
                setMetaInputs((prev) => ({
                  ...prev,
                  hasCoverImage: !metaInputs.hasCoverImage,
                }))}
              name="cover_image_check"
              className="checkbox bg-light-grey dark:bg-dark-grey"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium  dark:text-gray-300"
            >
              Cover Image ?
            </label>
            <input
              type="file"
              name="file_img"
              accept=".jpg,.jpeg,.png"
              className="file-input file-input-bordered file-input-xs dark:file-input-accent w-full max-w-xs bg-light-grey dark:bg-dark-grey"
              required={isEditing ? false : true}
            />
          </div>
          <CheckBox
            value={metaInputs.isPublished}
            onChange={() =>
              setMetaInputs((prev) => ({
                ...prev,
                isPublished: !metaInputs.isPublished,
              }))}
            name="immediate_publish_check"
            text="immediately published 🤔 ?"
          />
        </div>
        <button
          type="submit"
          name="action"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-700
           dark:text-white bg-washed-teal rounded-lg dark:bg-neon-pink"
        >
          Publish post
        </button>
        <button
          name="preview"
          onClick={() => setOpen(true)}
          className=" ml-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-700
           dark:text-white bg-washed-teal rounded-lg dark:bg-neon-pink"
        >
          Preview
        </button>

        <SpringModal
          isOpen={open}
          setIsOpen={setOpen}
          dontCloseOnClick
        >
          <div className="p-1 bg-light dark:bg-dark">
            <div className="flex flex-row justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-700
           dark:text-white bg-washed-teal rounded-lg dark:bg-neon-pink"
              >
                <MdClose size={25} />
              </button>
            </div>
            {meta && (
              <section className="p-2 mb-3 bg-light dark:bg-dark w-full">
                {
                  /*<div className="mt-3">
                  {meta?.cover_image && meta?.cover_image_url && (
                    <MyImage source={meta.cover_image_url} alt={meta.title} />
                  )}
                </div>*/
                }
                <h2 className="prose text-gray-700 dark:text-white font-bold text-4xl mt-4 mb-2 ">
                  {meta.title}
                </h2>
                <div>
                  <p className="mt-0 text-sm md:text-lg text-gray-700 dark:text-white">
                    {getFormattedDate(meta.date)}
                  </p>
                  <div className="flex flex-row gap-4 p-1">
                    <Tags meta={meta} />
                  </div>
                </div>
              </section>
            )}
            <article className="
      p-2 prose dark:prose-invert 
      md:prose-base text-gray-700 dark:text-white
    prose-headings:text-gray-700 prose-headings:dark:text-white
      dark:prose-blockquote:text-white
      prose-blockquote:text-gray-500
      prose-strong:text-gray-700 
      dark:prose-strong:text-white
      prose-a:no-underline
      hover:prose-a:underline
      dark:prose-a:text-neon-pink
      prose-a:text-washed-teal 
      prose-code:prose-sm
      prose-p:m-0
      bg-light dark:bg-dark
      ">
              {source && (
                <MDXRemote {...source} components={{ ...MDXComponents }} />
              )}
            </article>
          </div>
        </SpringModal>
      </form>
    </div>
  );
}
