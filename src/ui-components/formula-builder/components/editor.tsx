import { Combobox, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import classNames from "classnames";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { HELP_TEXT } from "../constants";
import { ObjType } from "../formula-builder.interface";

interface Props {
  value: string;
  label: string;
  field_type: string;
  className: string;
  onChange: (value: any, index: number) => void;
  onRemove: (index: number) => void;
  onHover: (value: string) => void;
  index?: number;
  placeholder?: string;
  items: ObjType[];
  is_editing?: boolean;
  customLabel?: (v: any) => void;
}

export default function EditorComponent({
  value: defaultValue = "",
  className,
  onChange,
  index = 0,
  items = [],
  onHover,
  onRemove,
  placeholder = "Enter",
  is_editing = false,
  customLabel,
}: Props) {
  const buttonEl = useRef<any>(null);
  const inputEl = useRef<any>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (inputEl?.current && is_editing)
      setTimeout(() => {
        inputEl?.current?.focus();
      }, 50);
  }, [is_editing]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  let filtered =
    value === "" || !value
      ? items.slice(0, 100)
      : items
          .filter((item: ObjType) => {
            return (
              item?.label
                ?.toLowerCase()
                ?.includes(value?.toString()?.toLowerCase()) || item?.isGroup
            );
          })
          .filter(
            (v, i, a) =>
              (v?.isGroup && !a[i + 1]?.isGroup && a[i + 1]?.value) ||
              !v?.isGroup
          )
          .slice(0, items?.length > 200 ? 200 : items?.length);

  if (!filtered?.length) {
    filtered = [
      {
        label: "No results",
        value: "No Results",
        type: "field",
        helper_text: "",
        placeholder: "",
      },
    ];
  }

  return (
    <Combobox
      as="div"
      className={classNames(
        `${
          className ? className : ""
        } font-inter border-[#E1E1E1] dark:border-[#3D3D3D] border-b-2 relative flex flex-col top-[0.5px]  focus:outline-none text-md`
      )}
      value={defaultValue}
      onChange={(j: any) => {
        const updatedState = items.find((v) => v.value === j) || {
          label: "",
          value: "",
          type: "",
        };
        setValue("");
        return onChange(updatedState, index);
      }}
    >
      <div className="inline-flex items-center">
        <Combobox.Input
          className="w-44 bg-inherit font-inter outline-none"
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          ref={inputEl}
          onMouseEnter={() => onHover && onHover(HELP_TEXT.EDITOR_TEXT)}
          displayValue={(item: any) => item?.label || value}
          onFocus={(e: any) => {
            if (e?.relatedTarget?.id?.includes("headlessui-combobox-button"))
              return;
            e?.target?.nextSibling?.click();
          }}
        />
        <Combobox.Button ref={buttonEl} as="div" className={"hidden"} />
        <XMarkIcon
          onClick={() => !!onRemove && onRemove(index)}
          className="h-6 ml-2 text-[#B8B8B8] dark:text-white cursor-pointer p-1 rounded-full"
        />
      </div>
      <Transition
        as={Fragment}
        appear={!!filtered?.length}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Combobox.Options
          className={classNames(
            "absolute top-7 z-10 w-full bg-[#f8f8f8] dark:bg-dark border-[1px] border-[#f8f8f8] dark:border-[#3D3D3D] rounded shadow",
            { "h-40 overflow-y-auto overflow-x-hidden": filtered?.length > 7 }
          )}
        >
          {filtered.map((item: ObjType) => (
            <Combobox.Option
              key={item.value + Math.random()}
              value={item.value}
              as={Fragment}
              disabled={item.value === "No Results" || item.isGroup}
            >
              {({ active, selected }) => (
                <li
                  forSilk="!text-xxs !py-1.5"
                  className={classNames(
                    `flex text-sm capitalize items-center px-4 py-1 tracking-wider select-none`,
                    {
                      "bg-primary-200 text-primary hover:bg-primary-200 hover:text-primary dark:hover:text-primary dark:text-white text-light-color cursor-pointer":
                        active || selected,
                      "cursor-default text-[#bbbbbb]":
                        item.value === "No Results" || item.isGroup,
                      "!text-sm bg-dark-light capitalize": item.isGroup,
                      "m-1 rounded": !item.isGroup,
                    }
                  )}
                >
                  {customLabel ? customLabel(item) : item.label}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}
