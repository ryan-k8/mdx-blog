"use server";
import { toBase64, toStringFromBase64 } from "@/lib/base64";

// interface IGithubService {
//   CreateFile(arg0: string, arg1: string, arg2: string): Promise<void>;
//   ReadFile(arg0: string): Promise<any>;
//   UpdateFile(arg0: string, arg1: string, arg2: string): Promise<void>;
//   DeleteFile(arg0: string, arg1: string, arg2: string): Promise<void>;
// }

const config = {
  Accept: "application/vnd.github+json",
  Authorization: "Bearer " + process.env.GITHUB_API_TOKEN,
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
};

const baseUrl = "https://api.github.com/repos/ryan-k8/website-stuff-/contents/";

async function hello() {
  const response = await fetch(baseUrl + "posts/test.mdx", {
    headers: config,
    method: "GET",
  });

  return response.json();
}

async function createFile(fileName: string, id: string, content: string) {
  const commitMessage = `create content [${id}] 🚀`;
  const base64Content = toBase64(content);
  console.log(baseUrl + fileName);

  const response = await fetch(baseUrl + fileName, {
    headers: config,
    method: "PUT",
    body: JSON.stringify({
      //@ts-ignore
      message: commitMessage,
      content: base64Content,
    }),
  });

  console.log(await response.json());

  if (!response.ok) throw new Error("couldn't create file");
}

async function readFile(fileName: string) {
  const response = await fetch(baseUrl + fileName, {
    headers: config,
    method: "GET",
  });

  if (!response.ok) return undefined;

  const data: { sha: string; content: string } = await response.json();

  //decode base64 content
  return { sha: data.sha, content: toStringFromBase64(data.content) };
}

async function updateFile(
  fileName: string,
  sha: string,
  id: string,
  content: string,
) {
  const commitMessage = `update content [${id}] 🚀`;
  const base64Content = toBase64(content);

  const response = await fetch(baseUrl + fileName, {
    headers: config,
    method: "PUT",
    body: JSON.stringify({
      //@ts-ignore
      message: commitMessage,
      content: base64Content,
      sha: sha,
    }),
  });

  if (!response.ok) throw new Error("couldn't update file");

  // const { sha, path } = (await response.json()).content;

  // return { sha, path };
}

async function deleteFile(fileName: string, id: string, sha: string) {
  const commitMessage = `delete content [${id}] 🚀`;

  console.log(baseUrl + fileName);

  const response = await fetch(baseUrl + fileName, {
    headers: config,
    method: "DELETE",
    body: JSON.stringify({
      //@ts-ignore
      message: commitMessage,
      sha: sha,
    }),
  });
  console.log(response);

  if (!response.ok) throw new Error("couldn't delete file");
}

export { createFile, deleteFile, hello, readFile, updateFile };
