import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl, auth } = req;
  console.log(req?.nextUrl?.pathname);

  console.log(req.cookies.get("theme"));
  let theme = req.cookies.get("theme")?.value ?? "light";

  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set("theme", theme, { maxAge: 3600, path: "/" });
  return response;
});

// export { auth as middleware } from "@/auth";
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
