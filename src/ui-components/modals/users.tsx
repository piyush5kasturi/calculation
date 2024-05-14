import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Close from "../../assets/close.svg?react";
import React from "react";
import Graph from "./graph";
import classNames from "classnames";
const defaultPopupState: {
  isPopupOpen: boolean;
  type: null | string;
  data?: any;
} = {
  isPopupOpen: false,
  type: null,
  data: null,
};
export default function Users({ toggle, isOpen = false }) {
  const [{ type, isPopupOpen, data: popupData }, setPopupState] =
    useState(defaultPopupState);
  return (
    <>
      {isPopupOpen && type === "graph" && (
        <Graph
          isOpen={isPopupOpen}
          toggle={() => {
            setPopupState(defaultPopupState);
          }}
        />
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => {
            /* empty*/
          }}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
                    This Year
                  </p>
                  <Close
                    className={classNames(
                      " cursor-pointer transition-all fill-[#8F8F8F]"
                    )}
                    onClick={() => toggle(false)}
                  />
                </div>
                <div className="p-6 flex flex-col gap-2 align-middle items-start font-inter">
                  <ul className="flex justify-center flex-col">
                    <li
                      onClick={() =>
                        setPopupState({
                          isPopupOpen: true,
                          type: "graph",
                          data: null,
                        })
                      }
                    >
                      Mohak
                    </li>
                    <li
                      onClick={() =>
                        setPopupState({
                          isPopupOpen: true,
                          type: "graph",
                          data: null,
                        })
                      }
                    >
                      Piyush
                    </li>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
