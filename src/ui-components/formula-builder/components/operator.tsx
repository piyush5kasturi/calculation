import { Popover } from "@headlessui/react";
// import { ReactComponent as DownArrowIcon } from "@ui-icons/components/sidebar/down_arrow.svg";
import classNames from "classnames";

import { HELP_TEXT } from "../constants";
import { ObjType } from "../formula-builder.interface";
import React from "react";
interface Props {
  value?: string;
  className?: string;
  onHover: (v: string) => void;
  operators: [];
  index?: number;
  onChange: (value: any) => void;
  options: any[];
  isView?: boolean;
}

export default function Operator({
  value: defaultValue,
  className,
  onHover,
  onChange,
  index = -1,
  options = [],
  isView = false,
}: Props) {
  const isDesignedOperator =
    defaultValue === "AND" ||
    defaultValue === "OR" ||
    defaultValue === "OR" ||
    defaultValue === "=" ||
    defaultValue === "≠";
  const isComparableOperators = defaultValue === "=" || defaultValue === "≠";

  return (
    <>
      {!options?.length && (
        <li
          onMouseEnter={() =>
            onHover &&
            !isView &&
            onHover(
              isComparableOperators
                ? HELP_TEXT.CHANGE_OPERATOR
                : HELP_TEXT.DEFAULT
            )
          }
          className={classNames(
            `align-middle dark:text-white relative font-interLight top-[1.5px] select-none`,
            {
              "border-[1px] dark:border-[#3D3D3D] dark:bg-dark px-[8px] py-[2px] rounded-[6px]":
                isDesignedOperator,
              "text-black dark:text-[#D1D1D1] text-sm": isDesignedOperator,
              "cursor-pointer": isComparableOperators,
            },

            className
          )}
          onClick={() =>
            (defaultValue === "=" || defaultValue === "≠") &&
            !isView &&
            onChange((prevState: ObjType[]) => {
              const updatedValue = defaultValue === "=" ? "≠" : "=";
              prevState[index].label = updatedValue;
              prevState[index].value = updatedValue;
              return [...prevState];
            })
          }
        >
          {defaultValue}
        </li>
      )}
      {!!options?.length && (
        <Popover as="li">
          {({ open, close }) => (
            <>
              <Popover.Button
                disabled={isView}
                className={classNames(
                  "flex items-center dark:text-white relative font-interLight  select-none border-[1px] dark:border-[#3D3D3D] dark:bg-dark pl-[8px] py-[2px] rounded-[6px]",
                  { "top-[-4px] pr-[3px]": !isView },
                  { "top-[2px] pr-[8px]": isView }
                )}
              >
                <span className="relative top-[-1px]">{defaultValue}</span>
                {/* {!isView && (
                  <DownArrowIcon
                    className={classNames([
                      `dark:stroke-white relative h-5 w-5`,
                      {
                        "rotate-180 transform": open,
                      },
                    ])}
                  />
                )} */}
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-10" />
              <Popover.Panel
                as="ul"
                className={"absolute bg-white z-20 dark:bg-dark rounded-lg"}
              >
                {options.map((v) => (
                  <li
                    aria-hidden
                    className={classNames(
                      "text-center cursor-pointer hover:bg-gray-100 px-3 py-1 w-12",
                      {
                        "bg-primary hover:bg-primary text-white":
                          defaultValue === v,
                      }
                    )}
                    key={v}
                    onClick={() => {
                      onChange((prevState: ObjType[]) => {
                        prevState[index].label = v;
                        prevState[index].value = v;
                        return [...prevState];
                      });
                      close();
                    }}
                  >
                    {v}
                  </li>
                ))}
              </Popover.Panel>
            </>
          )}
        </Popover>
      )}
    </>
  );
}
