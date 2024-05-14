import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Header from "./header";
import classNames from "classnames";
import Pagination from "../pagination";
import React from "react";
import { Props } from "./table.interface";
const Table = ({
  data = [],
  columns = [],
  isLoading = false,
  total = 20,
  limit = 10,
  page = 1,
  onChangePage = (page: number) => {
    // empty function
  },
}: Props) => {
  const totalColumns = columns?.length;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div
        className={classNames(
          "w-full relative overflow-x-auto overflow-y-hidden"
          // {
          //   [className]: className,
          // }
        )}
      >
        <table
          className={classNames(
            "w-full border-[1px] border-[#E7E7E7]  border-separate border-spacing-0 rounded-t-lg"
            // { [tableClassName]: tableClassName }
          )}
        >
          <Header table={table} />
          <tbody>
            {table.getRowModel().rows?.length === 0 && !isLoading && (
              <tr>
                <td
                  colSpan={totalColumns}
                  className={classNames("text-center text-sm h-[68px]")}
                >
                  No Data
                </td>
              </tr>
            )}
            {isLoading && (
              <tr>
                <td
                  colSpan={totalColumns}
                  className={classNames("text-center h-[68px]")}
                >
                  Loading...
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row, i) => {
              return (
                <tr key={row.id} className="">
                  {row.getVisibleCells().map((cell: any) => {
                    const { customTd = false } = cell.column.columnDef;
                    return customTd ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <td
                        className={classNames(
                          "py-3 px-6 border-[#E7E7E7] dark:border-light-color dark:text-white text-sm h-[68px] ",
                          {
                            "border-b-[1px]":
                              table.getRowModel().rows?.length - 1 !== i,
                          }
                        )}
                        key={cell.id}
                        style={{ maxWidth: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!isLoading && total > limit && (
        <div className="py-5 mb-10 border-[#E7E7E7] border-[1px] border-t-0 rounded-b-lg">
          <Pagination
            page={page}
            totalElements={total}
            elementsPerPage={limit}
            onPageChange={(page: number) => onChangePage(page)}
          />
        </div>
      )}
    </>
  );
};

export default Table;
