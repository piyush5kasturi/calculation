import { Dialog, Transition } from "@headlessui/react";
import Close from "../../assets/ui-icons/close.svg?react";
import DeleteIcon from "../../assets/ui-icons/delete-icon.svg?react";
import classNames from "classnames";
import { Fragment } from "react";
import Alert from "../alert";
import Button from "../button";
import React from "react";

export default function ConfirmDeletePopup({
  isOpen,
  toggle = (v: boolean) => {
    /* empty fun */
  },
  heading = "",
  title,
  text,
  isLoading = false,
  isError = false,
  error = "",
  isCancelConfirmation = false,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => toggle(false)}
        as="div"
        className="relative z-10"
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
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full sm:w-[494px] transform rounded dark:bg-dark bg-white text-center  shadow-xl transition-all">
              <div className="flex justify-between mx-6 mt-6 mb-4 items-center">
                <p className="text-lg font-montserratBold dark:text-[#E7E7E7]">
                  {heading}
                </p>
                <Close
                  className={classNames(
                    " cursor-pointer transition-all fill-[#8F8F8F]"
                  )}
                  onClick={() => toggle(false)}
                />
              </div>
              <div className="flex flex-col items-center justify-between mx-6 mt-6 mb-4">
                {isError && (
                  <div className="mt-2">
                    <Alert type="error" text={error} />
                  </div>
                )}
                <DeleteIcon />
                <Dialog.Title className="text-light-color mb-2 text-center font-montserratBold text-lg dark:text-[#FFFFFF] w-full line-clamp-3 break-words">
                  {title}
                </Dialog.Title>
                <p className="text-[#6D6D6D] text-[16px] font-inter">{text}</p>
              </div>
              <div className="flex w-full justify-center border-t-[0.83px] border-[#E6E6E6] dark:border-gray-600 py-6 gap-4">
                <Button
                  variant="secondary"
                  size="large"
                  onClick={() => toggle(false)}
                  text={isCancelConfirmation ? "No" : "Cancel"}
                />
                <Button
                  variant="danger"
                  size="large"
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={() => toggle(true)}
                  text={isCancelConfirmation ? "Yes" : "Delete"}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
