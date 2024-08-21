"use server";

import { cloudinary } from "@/services/cloudinary";

import {
  createFile,
  deleteFile,
  hello,
  readFile,
  updateFile,
} from "@/services/github";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { getImage } from "@/components/ui/Image";
import { revalidatePath } from "next/cache";

export const justTesting = async () => {
  return (await hello())?.sha;
};

export const createContent = async (
  dir: "posts" | "works",
  content: FormData,
  markdown: string,
): Promise<void> => {
  try {
    const thumbnail = content.get("file_img");
    const slug = content.get("slug") as string;
    const fileName = dir + `/${slug}.mdx`;

    if (!thumbnail) throw new Error("no thumbnail selected");

    //upload image to cloudinary
    const result = await cloudinary.uploadImage(thumbnail as File);

    const { public_id: thumbnailId, url: thumbnailUrl } = result;

    //generate placeholder blur
    const { base64 } = await getImage(thumbnailUrl);

    //use github service to create the blog
    await createFile(
      fileName,
      slug,
      markdown.replace("insert_cover_img_here", thumbnailUrl),
    );

    // create in postgres db to keep track of stuff.
    const session = await auth() as Session;

    const adminId = session?.user?.id as string;

    //FIXME: prisma isnt failing with that err again and again and causing resubmission on the server action
    await prisma.content.create({
      data: {
        type: "POST",
        path: fileName,
        userId: adminId,
        published: false,
        Image: {
          create: {
            id: thumbnailId,
            cloudinaryUrl: thumbnailUrl,
            blurBase64Url: base64,
          },
        },
      },
    });

    revalidatePath("/dashboard/" + dir);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const deleteContent = async (
  id: string,
  dir: "posts" | "works",
): Promise<void> => {
  try {
    const fileName = `${dir}/${id}.mdx`;

    //always exists
    const { sha } = await readFile(fileName);
    console.log(sha);

    await deleteFile(fileName, id, sha);

    revalidatePath("/dashboard/" + dir);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const updateContent = async (
  id: string,
  dir: "posts" | "works",
  content: string,
  form: FormData,
): Promise<string> => {
  try {
    // await updateContent
    const fileName = `${dir}/${id}.mdx`;
    const path = `${dir}/${id}`;

    //if editing its just better to set cover_image to true
    //in the markdown.
    //

    const thumbNail = form.get("file_img");
    const hasCoverImage = form.get("cover_image_check");
    const slug = form.get("slug") as string;
    console.log(`slug : ${slug}`);
    const setStatusToPublish = form.get("immediate_publish_check") == "on"
      ? true
      : false;

    const thumbNailConfig = {
      id: "",
      cloudinaryUrl: "",
      blurBase64Url: "",
    };

    let markdown = content;

    const getRegexForField = (s: string) => `/${s}: "(.$)"/`;

    if (hasCoverImage && thumbNail) {
      //upload2 cloudinary and update the markdown string;
      const result = await cloudinary.uploadImage(thumbNail as File);

      const { public_id: thumbnailId, url: thumbnailUrl } = result;

      const { base64 } = await getImage(thumbnailUrl);

      thumbNailConfig.id = thumbnailId;
      thumbNailConfig.cloudinaryUrl = thumbnailUrl;
      thumbNailConfig.blurBase64Url = base64;
      markdown = markdown.replace(
        getRegexForField("cover_image_url"),
        `cover_image_url: "${thumbnailUrl}"`,
      );
      console.log(markdown);
    }

    const file = await readFile(fileName);
    if (!file) return "no file exists with such a slug or dir type";

    const { sha } = file;

    await updateFile(fileName, sha, slug, markdown);

    await prisma.content.update({
      where: {
        path: fileName,
      },
      data: {
        Image: {},
      },
    });

    console.log(fileName);
    console.log(form);

    revalidatePath(`/dashboard/${dir}`);

    // await createFile("", "", "");
  } catch (error: any) {
    return JSON.stringify({ err: error, data: null });
  }
  return JSON.stringify({ err: null, data: -1 });
};
