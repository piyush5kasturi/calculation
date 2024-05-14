import classNames from "classnames";
import PopoverComponent from "../popover";
import React from "react";
interface Props {
  width?: number;
  el: any;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  iconStyle?: "stroke" | "fill";
  offset?: number;
  hideTextOnMobile?: boolean;
  items: {
    Icon?: any;
    title: string;
    onClick: (v: any) => void;
    isDanger?: boolean;
    isDisabled?: boolean;
    separator?: boolean;
    tooltip?: string;
  }[];
}

export default function DropDownButton({
  el,
  items = [],
  width = 64,
  className,
  buttonClassName,
  offset = 8,
}: Props) {
  return (
    <>
      <PopoverComponent
        offset={offset}
        arrow={false}
        placement="bottom-end"
        buttonEl={el}
        buttonClassName={buttonClassName}
      >
        {(close) => {
          return (
            <ul
              className={classNames(
                ` border-[1px] py-1 rounded-md w-${width}  bg-white px-[6px]`,
                className
              )}
            >
              {items.map(
                ({
                  onClick,
                  title,
                  Icon,
                  isDisabled = false,
                  separator = false,
                }) => (
                  <>
                    <li
                      key={title}
                      onClick={(e) => {
                        onClick(e);
                        close();
                        e.stopPropagation();
                      }}
                      className={classNames(
                        `flex items-center text-dark-light px-4  text-sm rounded-sm tracking-wider cursor-pointer hover:bg-light  py-[9px]`,
                        { "pointer-events-none opacity-40": isDisabled }
                      )}
                      aria-hidden
                    >
                      {Icon && (
                        <Icon
                          className={classNames(
                            `h-[18px] w-[18px] stroke-current mr-2`
                          )}
                          forSilk="!h-[14px] !w-[14px]"
                        />
                      )}
                      {title}
                    </li>
                    {separator && (
                      <hr className="h-px my-2 mx-[-2px] bg-gray-200 border-0 dark:bg-gray-700" />
                    )}
                  </>
                )
              )}
            </ul>
          );
        }}
      </PopoverComponent>
    </>
  );
}
