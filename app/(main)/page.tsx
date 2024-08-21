import {
  FaFile,
  FaGithub,
  FaHeart,
  FaLinkSlash,
  FaYoutube,
} from "react-icons/fa6";
import { SiAnilist, SiCodeforces, SiLeetcode, SiSpotify } from "react-icons/si";
import SubHeading from "@/components/ui/SubHeading";
import LinkButton from "@/components/ui/LinkButton";
import HighlightLink from "@/components/ui/HighlightLink";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const env: ENV = process.env.NODE_ENV;

  return (
    <div className="mt-5 p-3 min-h-screen rounded-md">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-1">
          Hey, I'm Ryan Khursheed
        </h1>
        <p className="pt-6 pb-4 font-normal">
          I'm a ECE major at
          <HighlightLink
            href="https://jiit.ac.in/"
            text=" Jaypee Institute of Information Technology"
          />
          .I dabble into software development surrounding web,mobile and backend
          in my free time.
        </p>

        <a
          className="btn btn-primary text-white bg-washed-teal-alt dark:bg-washed-teal dark:text-gray-700 border-none hover:bg-teal-700
          dark:hover:bg-teal-300"
          href="https://miro.medium.com/v2/resize:fit:1024/1*mwXHpdt6CTQHxH78dwc6NA.jpeg"
        >
          <FaFile /> Resume
        </a>
        {env === "development" && (
          <Link
            className="ml-3 btn btn-primary text-white bg-washed-teal-alt dark:bg-washed-teal dark:text-gray-700 border-none hover:bg-teal-700
          dark:hover:bg-teal-300"
            href="/mdx-playground"
          >
            <FaEdit /> MDX playground
          </Link>
        )}
      </div>
      <SubHeading
        title={
          <>
            I <FaHeart className="mx-2 inline" />
          </>
        }
      >
        <p>
          JRPGs, Music ,
          <HighlightLink
            text="Manga"
            href="https://anilist.co/user/brxteforceman/stats/manga/overview"
          />
          , Light Novels, Machine Learning,
          <HighlightLink
            text="Software Development"
            href="https://github.com/ryan-k8?tab=repositories"
          />
        </p>
      </SubHeading>

      <SubHeading
        title={
          <>
            On the web
            <FaLinkSlash className="mx-2 inline" />
          </>
        }
      >
        <div className="flex-col">
          <LinkButton title="@ryan-k8" icon={<FaGithub />} />
          <LinkButton title="@ryank.4983" icon={<FaYoutube />} />
          <LinkButton title="@ryan-k8" icon={<SiLeetcode />} />
          <LinkButton title="@ryan-k8" icon={<SiSpotify />} />
          <LinkButton title="@brxteforceman" icon={<SiAnilist />} />
          <LinkButton title="@brxteforceman" icon={<SiCodeforces />} />
        </div>
      </SubHeading>
    </div>
  );
}
