import Label from "../mdx/Label";
import HighlightNavLink from "../ui/HighlightNavLink";
type Props = {};

export default function NotAuthorized({}: Props) {
  return (
    <div className="w-full h-screen  flex flex-col justify-start items-center">
      <div className="w-full md:w-1/2 p-2">
        <Label type="error">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="prose-xl text-gray-700 dark:text-white">
              Not Authorized
            </h1>
            <HighlightNavLink text="~/Home" href="/" />
          </div>
        </Label>
      </div>
    </div>
  );
}
