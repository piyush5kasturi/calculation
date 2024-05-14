import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
const Header = ({ table }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{ position: "relative", width: header.getSize() }}
              className={classNames(
                "bg-light border-b-[1px] border-[#E7E7E7] font-normal  py-3 text-left text-[#262626]  text-xs px-6"
                // {
                //   "rounded-tr-lg": headerGroup.headers?.length - 1 === i,
                //   "rounded-tl-lg": i === 0,
                //   "px-6": !useCheckBox,
                //   [headerClassName]: headerClassName,
                // }
              )}
            >
              <div
                className={classNames("", {
                  "cursor-pointer items-center select-none flex":
                    header.column.getCanSort(),
                  block: !header.column.getCanSort(),
                })}
                onClick={() =>
                  header.column.getCanSort() && header.column.toggleSorting()
                }
                aria-hidden={"true"}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Header;
