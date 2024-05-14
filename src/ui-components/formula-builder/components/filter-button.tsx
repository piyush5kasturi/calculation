// import { ReactComponent as AddIcon } from "@ui-icons/add.svg";
import classNames from "classnames";
import { useState } from "react";
// import BuilderFilter from "src/components/modals/kpi/builder-filter";

import Button from "../../button";
import { HELP_TEXT } from "../constants";
import React from "react";

export default function FilterButton({
  onAction,
  label = "Add Filter",
  onHover,
}) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <li
      onMouseEnter={() => onHover && onHover(HELP_TEXT.SELECT_FILTERS)}
      className={classNames(
        `flex items-center justify-center relative top-[-4px]`
      )}
    >
      <Button
        text={label}
        // {...(label === "Add Filter" && { Icon: AddIcon })}
        size="extra-small"
        iconClassName="!h-3 !w-3 !ml-2 !mr-0"
        className={classNames(
          "!bg-[#FFFFFF] !border-[#E7E7E7] !rounded-[6px]  dark:!border-[#3D3D3D] border-[1px] dark:!bg-dark dark:!text-[#D1D1D1] !text-black !text-sm !px-[10px] !py-[6px]"
        )}
        iconPosition="after"
        onClick={() => setModalOpen((prevState) => !prevState)}
      />
      {/* {isModalOpen && (
        <BuilderFilter
          isOpen={isModalOpen}
          toggle={() => setModalOpen(false)}
          onAction={(v: any[]) => {
            onAction(v.slice(0, v.length - 1));
            setModalOpen(false);
          }}
        />
      )} */}
    </li>
  );
}
