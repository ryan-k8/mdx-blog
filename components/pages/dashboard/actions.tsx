"use client";

import Button from "@/components/ui/Button";
import { useEffect, useState, useTransition } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { LinkButtonAlt } from "@/components/ui/LinkButton";
import { SpringModal } from "@/components/ui/Modal";
import { PiSignOut, PiWarningBold } from "react-icons/pi";
import toast from "react-hot-toast";
import { useCtx } from "@/hooks/useContext";
import { ThemeContext } from "@/context/ThemeContext";
import { deleteContent, justTesting } from "@/actions/content";

type ActionProps = {
  id: string;
  type: "posts" | "works";
};

export default function Actions({ id, type }: ActionProps) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);

  const { theme } = useCtx(ThemeContext);

  useEffect(() => {
    toast.dismiss();
  }, [theme]);

  //TODO: server action with useTransiton hook;
  const handleConfirmDelete = (id: string) => {
    startTransition(async () => {
      try {
        const value = await justTesting();
        console.log(value);
        await deleteContent(id, "posts");

        toast.success(`deleted ${value} \nid: ${type + "/" + id}.mdx`);
      } catch (err: unknown) {
        console.warn(err);
        toast.error("something went wrong 😭");
      } finally {
        setOpen(false);
      }
    });
  };

  console.log(id);
  return (
    <div className="p-2 flex gap-y-1 flex-col justify-center w-[15%]">
      <LinkButtonAlt
        title={
          <>
            <FaEdit size={20} /> Edit
          </>
        }
        href={`/dashboard/edit/${type}/${id}`}
      />
      <Button
        title={
          <>
            <FaTrash size={20} /> Delete
          </>
        }
        onClick={() => setOpen(true)}
      />
      <SpringModal isOpen={open} setIsOpen={setOpen} dontCloseOnClick>
        <div className="w-[80%] md:w-[50%] px-12 py-10 bg-light dark:bg-dark rounded-lg">
          <p className="text-xl flex flex-row items-end justify-center">
            <PiWarningBold size={30} className="text-red-500" />
          </p>
          <p className="mb-2 text-lg text-gray-700 dark:text-white text-center ">
            Are You Sure ? <span className="text-xl">🤔</span>
          </p>
          <div className="flex flex-row gap-x-1 items-center justify-center">
            <Button
              title={
                <>
                  {pending
                    ? (
                      <span className="loading loading-spinner loading-xs">
                      </span>
                    )
                    : (
                      <>
                        <FaTrash size={20} />
                        Yes
                      </>
                    )}
                </>
              }
              onClick={() => handleConfirmDelete(id)}
            />
            <Button
              title={
                <>
                  <PiSignOut size={20} /> No
                </>
              }
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </SpringModal>
    </div>
  );
}
