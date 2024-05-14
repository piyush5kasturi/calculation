import classNames from "classnames";
import React from "react";
interface Props {
  required?: boolean;
  tooltip?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tooltipClass?: string;
  disabled?: boolean;
}
export default function Label({
  disabled = false,
  className = "",
  children,
  required = false,
}: Props) {
  return (
    <label
      className={classNames(
        "flex items-center capitalize text-base",
        { "text-[#4F4F4F] ": !disabled },
        { "text-[#C7C7C7] ": disabled },
        className
      )}
    >
      {children}
      {required && (
        <span
          className={classNames(
            "text-base ml-0.5",
            { "text-[#4F4F4F]": !disabled },
            { "text-[#C7C7C7]": disabled }
          )}
        >
          *
        </span>
      )}
    </label>
  );
}
