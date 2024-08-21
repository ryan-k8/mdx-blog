"use client";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import useMDX from "@/hooks/useMDX";
import ErrorBoundary from "@/components/ErrorBoundary";

import "katex/dist/katex.min.css";
import "@/styles/mdx.css";
import MarkdownView from "@/components/ui/MarkdownView";
import MDXRenderFallback from "@/components/fallback/MDXRenderFallback";
import TabNav, { ClickableTab } from "@/components/pages/dashboard/TabNav";
import { ThemeContext } from "@/context/ThemeContext";
import { useCtx } from "@/hooks/useContext";

type PageProps = {
  searchParams: Object;
};

const initialCode = `
---
title: 'your title'
description: 'your description'
date: 'YYYY-MM-DD'
modified: 'YYYY-MM-DD'
tags: ['one','two','three','four']
cover_image: false  
cover_image_url: 'url'
---

### MARKDOWN GOES HERE

\`\`\`jsx
//import your custom components like this
<MyCustomComponent  some_prop={value} />
\`\`\`
`;

type TabGroupProps = {
  Tab1: React.ReactNode;
  Tab2: React.ReactNode;
};

const TabGroup = ({ Tab1, Tab2 }: TabGroupProps) => {
  const [editorVisible, setEditorVisible] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [splitVisible, setSplitVisible] = useState<boolean>(true);

  const handleClick = (tabName: string) => {
    switch (tabName) {
      case "Editor":
        setEditorVisible(true);
        setPreviewVisible(false);
        setSplitVisible(false);
        break;
      case "Preview":
        setEditorVisible(false);
        setPreviewVisible(true);
        setSplitVisible(false);
        break;
      case "Split":
        setEditorVisible(false);
        setPreviewVisible(false);
        setSplitVisible(true);
      default:
        break;
    }
  };

  return (
    <>
      <TabNav>
        <ClickableTab
          name="Editor"
          selected={editorVisible}
          onClick={handleClick}
        />
        <ClickableTab
          name="Preview"
          selected={previewVisible}
          onClick={handleClick}
        />
        <ClickableTab
          name="Split"
          selected={splitVisible}
          onClick={handleClick}
        />
      </TabNav>
      {splitVisible
        ? (
          <div className="grid grid-cols-2">
            {Tab1}
            {Tab2}
          </div>
        )
        : editorVisible
        ? Tab1
        : Tab2}
    </>
  );
};

export default function MDXPlayground({ searchParams }: PageProps) {
  const editorRef = useRef<any | null>(null);
  const [code, setCode] = useState<string>(initialCode);

  const handleOnChange = (value: string | undefined) => {
    setCode(value!);
  };
  const handleOnMount = (editor: any) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };
  const [serializedSource, pending, error] = useMDX(code);
  const { theme } = useCtx(ThemeContext);

  useEffect(() => {
    if (!error) {
      toast.dismiss();
    }
    if (error) {
      toast.dismiss();
      toast.error(
        (t) => (
          <div
            onClick={() => toast.dismiss(t.id)}
            className="cursor-pointer flex flex-col gap-1 dark:text-white"
          >
            <p>{error.name}</p>
            <p>{error.message}</p>
          </div>
        ),
        {
          duration: 5000,
          style: {
            color: theme === "light" ? "black" : "white",
            backgroundColor: theme === "light" ? "#f1e6db" : "#202023",
          },
        },
      );
    }
  }, [error, theme]);

  return (
    <div>
      <TabGroup
        Tab1={
          <div className="py-2 max-w-full resize-x">
            <Editor
              className="min-h-[90vh] max-h-[90vh] pl-2"
              defaultLanguage="markdown"
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: {
                  enabled: false,
                },
                cursorBlinking: "blink",
                wordWrap: "off",
              }}
              value={code.trim()}
              onMount={handleOnMount}
              onChange={handleOnChange}
            />
          </div>
        }
        Tab2={
          <div className="p-2 max-w-full">
            <div className="w-full max-h-[90vh] overflow-y-scroll no-scrollbar pb-3">
              {pending
                ? (
                  <div className="w-full min-h-[90vh] flex items-center justify-center">
                    <span className="block loading loading-bars loading-lg">
                    </span>
                  </div>
                )
                : (
                  <>
                    <ErrorBoundary fallback={MDXRenderFallback} theme={theme}>
                      {!error && serializedSource && (
                        <MarkdownView
                          type="client"
                          source={serializedSource}
                          meta={serializedSource.frontmatter}
                        />
                      )}
                    </ErrorBoundary>
                  </>
                )}
            </div>
          </div>
        }
      />
    </div>
  );
}
