import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
interface Props {
  children: (v: () => void) => void;
  buttonEl: any;
  placement: Placement;
  arrow?: boolean;
  offset?: number;
  onClick?: () => void;
  buttonClassName?: string;
  containerClassName?: string;
}
export default function PopoverComponent({
  children,
  buttonEl,
  placement = "right",
  arrow = true,
  offset = 12,
  onClick,
  buttonClassName,
  containerClassName,
}: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: "offset", options: { offset: [0, offset] } },
      { name: "arrow", options: { element: arrowElement } },
    ],
  });

  const portalElement = document.querySelector("#portal") as
    | Element
    | DocumentFragment
    | null;
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className={classNames("outline-none", buttonClassName)}
            onClick={onClick}
          >
            {buttonEl instanceof Function ? buttonEl(open) : buttonEl}
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {portalElement &&
              ReactDOM.createPortal(
                <Popover.Panel
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                  className={`bg-white dark:bg-dark z-20 shadow-lg rounded-lg ${containerClassName}`}
                >
                  {({ close }) => (
                    <>
                      {arrow && (
                        <div
                          ref={setArrowElement}
                          style={styles.arrow}
                          id="arrow"
                        />
                      )}
                      {children(close)}
                    </>
                  )}
                </Popover.Panel>,
                portalElement
              )}
          </Transition>
        </>
      )}
    </Popover>
  );
}
