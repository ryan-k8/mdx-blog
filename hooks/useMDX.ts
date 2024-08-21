import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import {useCtx} from "./useContext";

import { serialize, } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { ThemeContext } from "@/context/ThemeContext";

function useMDX(source: string) {
  const [debouncedValue] = useDebounce<string>(source, 1000);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState< {name:string,message:string} | null>(null);

  const {theme } = useCtx(ThemeContext);

  const codeTheme= theme==="light" ? "solarized-dark": "dracula";

  const [serializedSource, setSerializedSource] =
    useState<MDXRemoteSerializeResult<
      Record<string, unknown>,
      MetaData
    > | null>(null);

  useEffect(() => {
    const compile = async () => {
      try {
        setPending(true);
        const serialized = await serialize<Record<string, unknown>, MetaData>(
          debouncedValue.trim(),
          {
            parseFrontmatter: true,
            mdxOptions: {
              development: process.env.NODE_ENV === "development",
              //@ts-ignore
              rehypePlugins: [rehypeSlug,[rehypePrettyCode, { theme: codeTheme, grid: true }],rehypeKatex,[rehypeAutolinkHeadings],],
              remarkPlugins: [remarkMath],
            },
          }
        );
        setSerializedSource(serialized);
        setPending(false);
        setError(null)
      } catch(err:any) {
        setError({name:" MDX compilation error ",message:err.message});
        setPending(false);
        setSerializedSource(null);
      }
    };
    compile();
  }, [debouncedValue,theme]);

  return  [serializedSource,pending,error] as const;
}

export default useMDX;
