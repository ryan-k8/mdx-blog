import { MetaField } from "@/components/mdx/MetaBox";
import { SwipeCarousel } from "@/components/ui/Carousel";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "~/Gallery" };

const imgs = [
  "https://source.unsplash.com/random/1980x1080",
  "https://source.unsplash.com/random/3840x2160",
  "https://source.unsplash.com/random/1280x720",
  "https://source.unsplash.com/random/1280x720",
  "https://source.unsplash.com/random/1280x720",
  "https://source.unsplash.com/random/1280x720",
  "https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small_2x/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg",
  "https://mangadex.org/covers/6df76f5e-3d2e-4add-a8e7-8a9a8320c711/98d30e74-d2c7-4ca0-aa83-8925672fb27c.jpg",
  "/ss.png",
];

const unsplash_img = "https://source.unsplash.com/random/1920x1080";

const local_img = "/ss.png";

const manga_img =
  "https://mangadex.org/covers/6df76f5e-3d2e-4add-a8e7-8a9a8320c711/98d30e74-d2c7-4ca0-aa83-8925672fb27c.jpg";

export default function Gallery() {
  return (
    <div className="p-2">
      <div className="mt-5">
        <SwipeCarousel data={imgs} />
      </div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side z-[1000]">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-[80%] sm:w-[60%] md:w-1/2 lg:w-[40%] min-h-full  bg-light dark:bg-dark border-red-300">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </div>
        </div>
      </div>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-lg text-gray-600 dark:text-white mb-2"
          aria-label="Tab 1"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content p-10 bg-red-300 min-h-[90vh]"
        >
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-lg  text-gray-600 dark:text-white mb-2"
          aria-label="Tab 2"
        />
        <div role="tabpanel" className="tab-content p-10 border-yellow-600">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-lg  text-gray-600 dark:text-white mb-2"
          aria-label="Tab 3"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 3
        </div>
      </div>
      <hr />
      Menkiki suggests ramen(Chinese noodle) shops based on a photo of ramen you
      want to eat. Why? Because you don't need to input Japanese keywords to
      find restaurants, but just specify a ramen photo then it will suggest
      great shops for you. It supports 900+ famous ramen shops in Japan! So, you
      can check a shop info as soon as you found a promising ramen shop in a
      food magazine. Let's go out and have a delicious ramen! - Ramen shop
      recommendation based on photo - Show shops near your current location -
      Open in Tabelog/Foursquare
      <p className="flex flex-row items-center gap-x-2">
        <span
          className="badge transition-none outline-none border-none font-semibold text-gray-700 rounded-sm dark:bg-[#33403B] dark:text-[#9AE6B4]
      bg-[#C6F6D4] text-gray-700"
        >
          PLATFORM
        </span>
        <span>Android/IOS/Web/Windows/MacOs</span>
      </p>
      <p className="flex flex-row items-center gap-x-2">
        <span
          className="badge transition-none outline-none border-none font-semibold text-gray-700 rounded-sm dark:bg-[#33403B] dark:text-[#9AE6B4]
      bg-[#C6F6D4] text-gray-700"
        >
          STACK
        </span>
        <span>React,Javascript,Firebase,Tailwind</span>
      </p>
      <p className="flex flex-row items-center gap-x-2">
        <span
          className="badge transition-none outline-none border-none font-semibold text-gray-700 rounded-sm dark:bg-[#33403B] dark:text-[#9AE6B4]
      bg-[#C6F6D4] text-gray-700"
        >
          PRESENTATION
        </span>
        <a className="inline-flex  items-center gap-x-1 mx-1 cursor-pointer text-pastel-blue   dark:text-neon-pink no-underline hover:underline">
          Caffeでお手軽本格ディープラーニングアプリ @potatotips
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </p>
      <p className="flex flex-row items-center gap-x-2">
        <span
          className="badge transition-none outline-none border-none font-semibold text-gray-700 rounded-sm dark:bg-[#33403B] dark:text-[#9AE6B4]
      bg-[#C6F6D4] text-gray-700"
        >
          SOURCE
        </span>
        <a className="inline-flex  items-center gap-x-1 mx-1 cursor-pointer text-pastel-blue   dark:text-neon-pink no-underline hover:underline">
          github.com/ryan-k8/myFlixLib
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </p>
      <ul className="list-disc">
        <li>
          <MetaField field="doiknow?">
            Now this is a story all about how, my life got flipped-turned upside
            down
          </MetaField>
        </li>
      </ul>
    </div>
  );
}
