import Close from "../../assets/ui-icons/close.svg?react";
import classNames from "classnames";
import React from "react";
import { useEffect } from "react";
import Error from "../error";

interface Props {
  formula?: { type: string; value: string; label: string }[];
  setFormula: (
    e: {
      type: string;
      value: string;
      label: string;
    }[]
  ) => void;
  setIndexFn: (index: number) => void;
  error: undefined | boolean;
  setError: (val: undefined | boolean) => void;
  errorMsg: string;
  setErrorMsg: (val: string) => void;
}

export default function FormulaArea({
  formula = [],
  setFormula,
  setIndexFn,
  error = undefined,
  setError,
  errorMsg,
  setErrorMsg,
}: Props): JSX.Element {
  useEffect(() => {
    for (let i = 0; i < formula.length; i++) {
      const flag = i % 2 == 0;
      if (flag && formula[i].type === "operator") {
        setError(true);
        break;
      } else if (!flag && formula[i].type === "Column") {
        setError(true);
        break;
      } else if (
        formula[0].type === "operator" ||
        formula[formula.length - 1].type === "operator"
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
    if (formula.length === 0) {
      setError(undefined);
    }
  }, [formula, setError]);

  const handleFormulaUpdate = (index) => {
    debugger;
    const tempArr = [...formula];
    tempArr.splice(index, 1);
    setFormula(tempArr);
  };
  const handleInputChange = (value: string, index: number) => {
    if (
      value !== "+" &&
      value !== "-" &&
      value !== "/" &&
      value !== "*" &&
      value !== ""
    ) {
      return;
    }
    const tempArr = [...formula];
    tempArr[index < 0 ? 0 : index] = { ...tempArr[index], value, label: value };
    setErrorMsg("");
    setFormula(tempArr);
  };
  const cleanEmptyValue = () => {
    debugger;
    setFormula(
      formula.filter((item) => {
        if (item.value) {
          return item;
        }
      })
    );
  };

  return (
    <div>
      <div
        className={`flex flex-wrap border pb-10 p-2 h-48 overflow-y-auto ${
          error === undefined && "border-[#D8DBDF]"
        } rounded ${error && "!border-red-500"} ${
          error === false && "border-primary-500"
        }`}
        aria-hidden="true"
      >
        {formula.length === 0 && (
          <input className="outline-none h-5 text-start" value="" />
        )}
        {formula?.map((item, index) => {
          return item.type !== "Column" ? (
            <input
              className="h-fit w-5 outline-none mt-2 ml-4 text-center"
              value={item.value}
              key={index}
              onChange={(e) => {
                handleInputChange(e.target.value, index);
              }}
              onClick={() => setIndexFn(index)}
              onBlur={cleanEmptyValue}
            />
          ) : (
            <div className="flex">
              <input
                value=""
                className="h-5 w-2 outline-none mt-2 text-center"
                onClick={() => {
                  setIndexFn(index - 1);
                }}
              />
              <div
                role="tooltip"
                key={index}
                aria-hidden
                className={classNames(
                  `rounded relative flex items-center border justify-between px-3 py-3 h-10 gap-2 mt-1`
                )}
                onClick={() => setIndexFn(index)}
              >
                {item.label}
                {/* <Tooltip tooltip={item.label} position={"bottom"}>
                  <span
                    className="inline-block text-ellipsis overflow-hidden max-w-72 break-keep"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item.label}
                  </span>
                </Tooltip> */}

                <Close
                  className={classNames(
                    "dark:fill-gray-500 cursor-pointer transition-all fill-[#8F8F8F] h-2 w-2"
                  )}
                  onClick={() => handleFormulaUpdate(index)}
                />
              </div>
              <input
                value=""
                onClick={() => {
                  setIndexFn(index);
                }}
                className="h-5 w-2 outline-none mt-2 text-center"
              />
            </div>
          );
        })}
      </div>
      <div className={classNames({ "mb-2": !!errorMsg })}>
        {errorMsg && <Error message={errorMsg} />}
      </div>
    </div>
  );
}
