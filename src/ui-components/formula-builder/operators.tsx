import React from "react";
import Label from "../label";

interface Props {
  handleClick: (e) => void;
}
const operatorList = ["+", "-", "/", "*"];

export default function Operators({ handleClick }: Props): JSX.Element {
  return (
    <div>
      <Label className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {"Operators"}
      </Label>
      <div className="flex gap-4">
        {operatorList.map((item) => {
          return (
            <span
              aria-hidden
              className="py-1 !px-[19px] bg-[#00D936] text-white rounded cursor-pointer"
              onClick={() => handleClick(item)}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
