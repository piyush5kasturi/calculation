import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../input";
import Close from "../../assets/ui-icons/close.svg?react";
import classNames from "classnames";
import Button from "../button";
import { useQueryClient } from "@tanstack/react-query";
import Alert from "../alert";
import { useOperator } from "../../components/operator/operator.services";
export default function AddOperator({
  toggle,
  isOpen = false,
  editData = null,
}: {
  toggle: (val?: boolean) => void;
  isOpen?: boolean;
  editData?: any;
}) {
  const queryClient = useQueryClient();
  const { OperatorMutation, isLoading, error, data, isError } = useOperator();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data) => {
    const { name, value } = data;
    if (editData) {
      await OperatorMutation({
        autoID: editData?.autoID,
        labelName: name,
        value,
      });
    } else {
      await OperatorMutation({
        labelName: name,
        value,
      });
    }
  };

  const setDefaultHandler = useCallback(() => {
    reset({
      name: editData?.labelName,
      value: editData?.value,
    });
  }, [editData, reset]);

  useEffect(() => {
    if (editData) {
      setDefaultHandler();
    }
  }, [editData]);

  useEffect(() => {
    if (data) {
      queryClient.removeQueries({ queryKey: ["operator", "list"] });
      toggle(false);
    }
  }, [data, queryClient, toggle]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          /* empty*/
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-light/40 backdrop-blur-[2px]" />
        </Transition.Child>

        <div className="flex min-h-full items-center justify-center p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[564px] rounded-lg max-w-2xl transform bg-[#FFFFFF] text-left shadow-[0px_16px_32px_-12px_#00000033] transition-all">
              <div className="flex justify-between mx-6 mt-6 mb-4 items-center">
                <p className="text-lg font-montserratBold text-[#3D3D3D]">
                  {editData ? "Edit" : "Add"} Master
                </p>
                <Close
                  className={classNames(
                    " cursor-pointer transition-all fill-[#8F8F8F]"
                  )}
                  onClick={() => toggle(false)}
                />
              </div>
              {isError && <Alert text={error?.displayMessage} type="error" />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        type="text"
                        label="Name"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Name"
                        errors={!!errors?.name}
                        required
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="value"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        type="text"
                        label="Value"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Value"
                        errors={!!errors?.value}
                        required
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 w-full p-6 border-t-[1px] border-[#E7E7E7]  gap-4">
                  <>
                    <Button
                      variant="secondary"
                      text="Cancel"
                      onClick={() => toggle(false)}
                      size="medium"
                      full
                    />
                    <Button
                      text="Save"
                      isLoading={isLoading}
                      disabled={isLoading}
                      type="submit"
                      size="medium"
                      full
                    />
                  </>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
