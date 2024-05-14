import { useEffect, useMemo, useState } from "react";
import React from "react";
import Table from "../../ui-components/table";
import AddMaster from "../../ui-components/modals/add-master";
import Button from "../../ui-components/button";
import Ellipsis from "../../assets/ui-icons/ellipsis.svg?react";
import EditIcon from "../../assets/ui-icons/edit.svg?react";
import DeleteIcon from "../../assets/ui-icons/delete.svg?react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchList, useDelete } from "./master.services";
import { columns } from "./helper";
import Alert from "../../ui-components/alert";
import DropDownButton from "../../ui-components/dropdown-button";
import classNames from "classnames";
import ConfirmDeletePopup from "../../ui-components/common/confirm-delete";

const defaultPopupState = {
  isPopupOpen: false,
  type: null,
  data: null,
};
const Master = () => {
  const queryClient = useQueryClient();
  const [{ limit, page }, setPage] = useState({ limit: 10, page: 1 });
  const [{ type, isPopupOpen, data: popupData }, setPopupState] =
    useState<any>(defaultPopupState);
  const {
    deleteMutation,
    isLoading: deleteIsLoading,
    error: deleteError,
    data: deleteData,
    isError: deleteIsError,
  } = useDelete();
  const {
    isLoading,
    isError,
    error,
    data = [],
    refetch,
  } = useQuery<any, any, any>({
    queryKey: ["master", "list"],
    queryFn: () => fetchList(limit, page),
    enabled: false,
  });

  useEffect(() => {
    if (page > 0) {
      queryClient.removeQueries({ queryKey: ["master", "list"] });
      refetch();
    }
  }, [refetch, page, queryClient]);

  useEffect(() => {
    if (deleteData) {
      queryClient.removeQueries({ queryKey: ["master", "list"] });
      setPopupState(defaultPopupState);
      refetch();
    } else if (deleteError) {
      setPopupState(defaultPopupState);
    }
  }, [deleteData, queryClient, deleteError, refetch]);

  const onhandleDelete = (selected) => {
    setPopupState({
      isPopupOpen: true,
      type: "delete",
      data: selected?.autoID,
    });
  };

  const trigerDelete = () => {
    deleteMutation(popupData);
  };

  const Columns = useMemo(() => {
    return columns(data?.columns);
  }, [data]);

  const memorizedColumns = useMemo(
    () => [
      ...Columns,
      {
        accessorFn: (row) => row.id,
        id: "action",
        customTd: true,
        cell: ({ row }) => {
          return (
            <td
              className={classNames(
                "py-0 border-[#E7E7E7] dark:border-light-color dark:text-white text-sm  border-b-[1px] pr-0 relative"
              )}
              style={{ width: "50px" }}
            >
              <div className="flex gap-x-2 justify-center">
                <DropDownButton
                  className="w-[212px] border border-[#E7E7E7]"
                  el={(open) => {
                    return (
                      <>
                        <div
                          className={classNames(
                            "absolute top-0 right-0 h-full w-full px-6 flex gap-x-2 justify-center  items-center z-0",
                            {
                              "bg-light ": open,
                            }
                          )}
                        />
                        <Ellipsis className="px-2 h-5 w-5 z-10 mx-auto block relative" />
                      </>
                    );
                  }}
                  items={[
                    {
                      title: "Edit",
                      Icon: EditIcon,
                      onClick: () => {
                        setPopupState({
                          isPopupOpen: true,
                          type: "edit",
                          data: row?.original,
                        });
                      },
                    },
                    {
                      title: "Delete",
                      Icon: DeleteIcon,
                      onClick: () => {
                        onhandleDelete(row?.original);
                      },
                    },
                  ]}
                />
              </div>
            </td>
          );
        },
        header: () => <div className="text-right"></div>,
        footer: (props) => props.column.id,
        minSize: 50,
        size: 50,
      },
    ],
    [Columns]
  );

  return (
    <>
      {((isPopupOpen && type === "add") ||
        (isPopupOpen && type === "edit")) && (
        <AddMaster
          isOpen={isPopupOpen}
          toggle={() => {
            setPopupState(defaultPopupState);
            refetch();
          }}
          editData={popupData}
        />
      )}

      {isPopupOpen && type === "delete" && (
        <ConfirmDeletePopup
          heading="Delete Master"
          title={`Deleting Record`}
          text="Are you sure you want to proceed with deleting?"
          isOpen={isPopupOpen}
          toggle={(v) =>
            v ? trigerDelete() : setPopupState(defaultPopupState)
          }
          isLoading={deleteIsLoading}
        />
      )}
      <div className="pb-4 flex justify-end">
        <Button
          type="button"
          text="Add Master"
          onClick={() => setPopupState({ isPopupOpen: true, type: "add" })}
        />
      </div>
      {(isError || deleteIsError) && (
        <Alert
          text={error?.displayMessage || deleteError?.displayMessage}
          type="error"
        />
      )}
      <Table
        onChangePage={(page) => {
          setPage({ limit: 10, page });
        }}
        columns={memorizedColumns}
        data={data?.rows || []}
        isLoading={isLoading}
        total={data?.count || 0}
        page={page}
      />
    </>
  );
};

export default Master;
