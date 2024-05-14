import React from "react";

interface props {
  message?: string;
}
export default function Error({ message = "Required" }: props) {
  return (
    <span className="flex items-center gap-1 mt-[4px] absolute">
      <p className="text-danger font-interLight text-sm dark:text-danger">
        {message}
      </p>
    </span>
  );
}
