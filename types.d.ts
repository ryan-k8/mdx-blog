type MetaData = {
  id: string;
  title: string;
  description?:string;
  date: string;
  tags: string[];
  is_published?:boolean;
  cover_image?:boolean;
  cover_image_url?: string;
};

type BlogPost = {
  meta: MetaData;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

type ServerSideMDXContent = ReactElement<any, string | JSXElementConstructor<any>>;
type ClientSideMDXContent=MDXRemoteSerializeResult<Record<string, unknown>, MetaData>;

type ThemeMode = "light" | "dark";

type ENV = "development" | "production" | "test";