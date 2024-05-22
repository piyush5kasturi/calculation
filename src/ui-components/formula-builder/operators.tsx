import React from "react";
import Label from "../label";

interface Props {
  handleClick: (e) => void;
  operatorist: any;
}
const operatorList = ["+", "-", "/", "*"];

export default function Operators({
  handleClick,
  operatorist = operatorList,
}: Props): JSX.Element {
  return (
    <div>
      <Label className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {"Operators"}
      </Label>
      <div className="flex gap-4">
        {operatorist.map((item) => {
          return (
            <span
              aria-hidden
              className="py-1 !px-[19px] bg-[#00D936] text-white rounded cursor-pointer"
              onClick={() => handleClick(item)}
            >
              {item?.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
