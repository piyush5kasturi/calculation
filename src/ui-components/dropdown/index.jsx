import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import UpIcon from "../../assets/ui-icons/arrow-icon.svg?react";
import classNames from "classnames";
import { Fragment } from "react";
import Label from "../label";

export default function Dropdown({
  items = [],
  value: defaultValue = { label: "", value: "", Icon: () => <></> },
  label = "",
  onChange,
  disabled = false,
  placeholder = "",
  error,
  className = "",
  buttonClassName = "",
  iconClassName = "",
  required = false,
  position = "bottom",
}) {

  let updatedItems = [];

  if (!items?.length)
    updatedItems = [{ label: "Nothing found", value: "not_found" }];
  else updatedItems = items;

  return (
    <Listbox
      value={defaultValue}
      onChange={onChange}
      as="div"
      disabled={disabled}
      className={classNames(
        `flex flex-col font-inter w-full ${className ? className : ""}`,
      )}
    >
      {({ open }) => (
        <>
          {!!label && (
            <Label required={required} disabled={disabled}>
              {label}
            </Label>
          )}
          <div className="relative mt-2">
            <Listbox.Button
              className={classNames(
                `w-full items-center font-interLight flex justify-between gap-x-1.5 border shadow ring-inset text-left outline-none tracking-wider text-[16px] pl-[18px] pr-[5px] py-2.5 rounded mb-3`,
                {
                  "cursor-not-allowed !text-[#B0B0B0] ":
                    disabled,
                },
                {
                  "text-[#262626] placeholder-[#6D6D6D] placeholder:font-interLight ":
                    !disabled,
                },
                {
                  "!text-[#6D6D6D] !font-interLight ":
                    placeholder && !defaultValue.label && !buttonClassName,
                },
                {
                  "!text-[#262626]  !font-inter":
                    defaultValue.label && !buttonClassName,
                },
                { "border-[#00D936]": open },
                { "border-light ": !open },
                { "!border-danger ": error },
                { "text-gray-400": !defaultValue.label },
                buttonClassName
              )}
            >
              {defaultValue?.Icon && (
                <defaultValue.Icon
                  className={classNames("transition-all mr-5 fill-current h-5 w-5", {
                    "fill-red-600": error,
                  })}
                />
              )}
              <span>{defaultValue.label || placeholder || "Select Value"}</span>
              <div
                className={classNames("flex items-center pr-4", iconClassName)}
              >
                {open ? (
                  <UpIcon
                    className={classNames(
                      `${
                        disabled
                          ? "stroke-[#B0B0B0]"
                          : "stroke-[#3D3D3D]"
                      } `
                    )}
                  />
                ) : (
                  <UpIcon
                    className={classNames(
                      ` rotate-180 ${
                        disabled
                          ? "stroke-[#B0B0B0]"
                          : "stroke-[#3D3D3D]"
                      } `
                    )}
                  />
                )}
              </div>
            </Listbox.Button>
            {!!updatedItems?.length && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options
                  className={classNames(
                    "z-20 absolute w-full bg-[#FFFFFF] rounded shadow-lg",
                    {
                      "h-52 overflow-hidden overflow-y-scroll":
                        updatedItems?.length >= 8,
                    },
                    {
                      "-top-1 transform -translate-y-full !flex w-100 flex-col-reverse !drop-shadow-[0px_-20px_-20px _rgb(0,0,0,0.15)]":
                        position === "top",
                    }
                  )}
                >
                  {updatedItems.map(({ value, label, Icon, ...rest }) => {
                    return (
                      <Listbox.Option
                        key={value}
                        value={{ value, label, ...rest }}
                        as={Fragment}
                        disabled={value === "not_found"}
                      >
                        {() => (
                          <li
                            className={classNames(
                              `flex bg-white hover:bg-white hover:bg-[#00D93620] hover:text-[#00D936] text-light-color items-center tracking-wider cursor-pointer text-base py-[10px] px-[14px]`,
                              { "py-3": Icon },
                              {
                                "bg-transparent hover:bg-white text-gray-400 pointer-events-none select-none":
                                  value === "not_found",
                              },
                              {
                                "!text-[#00D936] !bg-[#00D93620]":
                                  value === defaultValue.value,
                              }
                            )}
                          >
                            {Icon && (
                              <Icon
                                className={classNames(
                                  "transition-all mr-5 fill-current h-5 w-5",
                                  {
                                    "fill-red-600": error,
                                  }
                                )}
                              />
                            )}
                            {label}
                            {value === defaultValue.value && (
                              <span className="absolute right-3">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </li>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            )}
          </div>
        </>
      )}
    </Listbox>
  );
}
