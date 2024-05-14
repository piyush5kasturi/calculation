import Close from "../../assets/ui-icons/close.svg?react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import React from "react";
interface Props {
  type?: "error" | "success" | "info";
  text?: string;
  className?: string;
  crossIconClassName?: string;
  clear?: boolean;
}
export default function Alert({
  type = "success",
  text = "",
  className,
  crossIconClassName,
  clear = true,
}: Props) {
  const [message, setMessage] = useState(text);

  useEffect(() => {
    setMessage(text);
  }, [text]);

  let alertClass = "";
  switch (type) {
    case "error":
      alertClass =
        "bg-[#FEE4E2] border-[#F04438] text-[#F04438] dark:bg-transparent";
      break;
    case "info":
      alertClass =
        "bg-[#E9F1F9] border-[#038EFD] text-[#038EFD] dark:bg-transparent";
      break;
    case "success":
    default:
      alertClass =
        "bg-[#E6FBEB] border-[#02D42E] text-[#02D42E] dark:bg-transparent";
      break;
  }

  return message ? (
    <div
      className={classNames(
        `rounded relative mb-[1.25rem] flex justify-between items-center border ${alertClass} px-3 py-3`,
        className || ""
      )}
      role="alert"
    >
      <span className="block sm:inline">{text}</span>

      {clear && (
        <Close
          className={classNames(
            "dark:fill-gray-500 cursor-pointer transition-all fill-[#8F8F8F]",
            crossIconClassName
          )}
          onClick={() => setMessage("")}
        />
      )}
    </div>
  ) : (
    <></>
  );
}
