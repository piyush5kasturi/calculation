import { XMarkIcon } from "@heroicons/react/20/solid";

// import { toCapitalizeString } from "@utils";
import classNames from "classnames";
import React from "react";
import { useState } from "react";
// import VeiwFormulaModal from "src/components/modals/kpi/view-formula";

interface Props {
  onChange?: ((value: any) => void) | undefined;
  label?: string;
  className?: string;
  index?: number;
  onHover: (v: string) => void;
  close: boolean;
  type: string;
  value: string;
}

export default function Field({
  onChange,
  label = "",
  index = 0,
  className,
  onHover,
  close = true,
  type,
  value,
}: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div
      // onMouseEnter={() =>
      //   onHover &&
      //   onHover(
      //     `"${label}" is a ${toCapitalizeString(
      //       type === "kpi" ? "KPI" : type.toString().replaceAll("_", " ")
      //     )}`
      //   )
      // }
      onClick={() => (type === "kpi" || type === "category") && setOpen(true)}
      className={classNames(
        `${
          className ? className : ""
        } flex gap-2 items-center relative justify-between w-auto px-[10px] py-[6px] text-xs top-[1.5px] rounded-[6px] border-[1px]`,
        { "cursor-pointer": type === "kpi" || type === "category" },
        {
          "bg-[#EDFFF0] border-[#D6FFDE] dark:border-[#00360C] dark:bg-[#172413] text-[#009520]":
            type === "region" || type === "business_unit",
        },
        {
          "bg-[#FFFBEA] dark:bg-[#2B1D11] border-[#FFF1C5] dark:border-[#593815] text-[#BB4A02]":
            type === "department" || type === "tag",
        },
        {
          "bg-[#EFF9FF] dark:bg-[#111D2C] border-[#DFF2FF] dark:border-[#06304B]  text-[#006DA7]":
            type === "trade" || type === "pricebook_service_id",
        },
        {
          "bg-[#FEF3F2] dark:bg-[#2A1215] border-[#FEE4E2] dark:border-[#BB241A] text-[#BB241A]":
            type === "division" || type === "job_type",
        },
        {
          "bg-[#EAFFFC] dark:bg-[#111D2C] border-[#CBFFFA] dark:border-[#06304B]  text-[#038E9B]":
            type === "userType" || type === "custom_field",
        },
        {
          "bg-[#FFF] dark:bg-dark dark:border-[#3D3D3D] border-[#D1D1D1] dark:text-[#71FF8F] text-[#009520]":
            type === "kpi" || type === "pricebook_line_item_code",
        },
        {
          "bg-[#F5F0FF] dark:bg-[#22152E] dark:border-[#5903AF] dark:text-[#B87EFF] border-[#EDE4FF]  text-[#8000FF]":
            type === "category" || type === "pricebook_category",
        }
      )}
      aria-hidden
    >
      <span className={classNames("text-sm capitalize")}>{label}</span>
      {close && type !== "kpi" && (
        <XMarkIcon
          onClick={() =>
            !!onChange &&
            onChange((prevState: any) => [
              ...prevState.slice(0, index),
              ...prevState.slice(index + 1),
            ])
          }
          className={classNames(
            "h-4 cursor-pointer rounded-full",
            {
              "text-[#009520]": type === "region",
            },
            { "text-[#BB4A02]": type === "department" },
            { "text-[#006DA7]": type === "trade" },
            { "text-[#BB241A]": type === "division" },
            { "text-[#038E9B]": type === "userType" },
            { "text-[#8000FF]": type === "category" },
            { "text-[#009520]": type === "kpi" }
          )}
        />
      )}
      {/* {isOpen && (
        <VeiwFormulaModal
          isOpen
          type={type}
          data={{ id: value }}
          toggle={() => setOpen(false)}
        />
      )} */}
    </div>
  );
}
