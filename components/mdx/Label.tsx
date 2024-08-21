import React from "react";
import {
  PiCheckCircleBold,
  PiInfoBold,
  PiWarningBold,
  PiXCircleBold,
} from "react-icons/pi";

type LabelProps = {
  type?: "info" | "warning" | "error" | "success";
  children: React.ReactNode;
};

export default function Label({ type, children }: LabelProps) {
  if (!children) throw new Error("<Label/> requires children inside");

  let Icon = <PiInfoBold size={25} className="text-washed-teal" />;

  switch (type) {
    case "error":
      Icon = <PiXCircleBold size={25} className="text-red-500" />;
      break;
    case "warning":
      Icon = <PiWarningBold size={25} className="text-yellow-400" />;
      break;
    case "success":
      Icon = <PiCheckCircleBold size={25} className="text-green-500" />;

    default:
      break;
  }

  return (
    <div
      role="alert"
      className="alert my-8 bg-light dark:bg-dark text-gray-700 dark:text-white  border-[1.25px] border-light-grey dark:border-dark-grey"
    >
      {Icon}
      <span className="w-full">{children}</span>
    </div>
  );
}
