import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, { useCallback, useMemo, useRef, useState } from "react";

import EditorEl from "./components/editor";
import Field from "./components/field";
import FilterButton from "./components/filter-button";
import Operator from "./components/operator";
import PlaceholderEl from "./components/placeholder";
import Text from "./components/text";
import { HELP_TEXT, OPERATORS } from "./constants";
import Filters from "./filters";
import { ObjType, Props } from "./formula-builder.interface";
import {
  findPositionAfterIndex,
  findPositionBeforeIndex,
  isCategory,
  isCategoryFilter,
  isClassification,
  setDefaultState,
  validateFormula,
} from "./helpers";

export default function FormulaBuilder({
  disabled = false,
  value: state,
  operators = [],
  droppable = [],
  filters = [],
  canDoFilters = false,
  error = false,
  filtersColumn = 3,
  type = "kpi",
  onChange,
  placeholder = "",
  operatorsWhenEnclosedWithoutBracket = ["+", "-", "x", "/", "{", "}"],
  operatorsWhenEnclosedWithBracket = ["(", ")", "=", "≠", "AND", "OR"],
  allowTyping = {
    inCurlyBrackets: true,
    outSideCurlyBrackets: true,
  },
}: Props) {
  const [selectedField, setSelectedField] = useState<number>(0);
  const tooltipRef = useRef<any>(null);
  const inputEl = useRef<any | null>(null);
  const selectedOperators = operators?.length ? operators : OPERATORS;

  const onSelection = (index: number) => {
    setSelectedField(index);
  };

  const setTooltip = (text: string, isError = false) => {
    tooltipRef.current.innerText = text;
    [tooltipRef.current.previousSibling, tooltipRef.current].map((v) => {
      v.classList.remove("text-primary");
      v.classList.remove("text-danger");

      if (isError) v.classList.add("text-danger");
      else v.classList.add("text-primary");
    });
  };

  const addDroppable = useCallback(
    (fieldType: string) =>
      droppable.find((k) => k.name === fieldType)?.drop || [],
    [droppable]
  );

  const onhandleSelect = (v: ObjType, index = null) => {
    const selectionIndex = selectedField > -1 ? selectedField : state.length;
    const placeIndex = Number(index ?? selectionIndex);
    let droppedValues: ObjType[] = [];

    const findOpenCurlyBracket = findPositionBeforeIndex(
      state,
      placeIndex,
      "{",
      "}"
    );
    const findCloseCurlyBracket = findPositionAfterIndex(
      state,
      placeIndex,
      "}",
      "{"
    );

    const findOpenBracket = findPositionBeforeIndex(
      state,
      placeIndex,
      "(",
      ")"
    );
    const findCloseBracket = findPositionAfterIndex(
      state,
      placeIndex,
      ")",
      "("
    );

    const isEnclosedWithBracket = findOpenBracket > -1 && findCloseBracket > -1;

    switch (v?.type) {
      case "kpi": {
        const droppedKPIDefinations = addDroppable("kpi");
        droppedValues = [
          ...(findOpenCurlyBracket > -1 ? [] : addDroppable("{")),
          {
            ...v,
            type: "kpi",
            helper_text: "",
            placeholder: "",
          },
          ...droppedKPIDefinations.slice(canDoFilters ? 0 : 1),
          ...(findCloseCurlyBracket > -1 ? [] : addDroppable("}")),
        ];
        break;
      }
      default:
        droppedValues = droppable.find((k) => k.name === v.value)?.drop || [
          { ...v, type: v.type, helper_text: "", placeholder: "" },
        ];
        break;
    }

    onChange((prevState: ObjType[]) => {
      const updatedState = setDefaultState(prevState);
      const isFilterButton = state
        .slice(findOpenCurlyBracket, findCloseCurlyBracket)
        .findIndex((v: ObjType) => v?.value === "Add Filter");
      if (isFilterButton > -1) {
        updatedState[findOpenCurlyBracket + isFilterButton].label =
          "Filtered By";
        updatedState[findOpenCurlyBracket + isFilterButton].value =
          "Filtered By";
      }
      return [
        ...updatedState.slice(0, placeIndex),
        ...droppedValues,
        ...(placeIndex > -1 &&
        placeIndex < updatedState.length &&
        updatedState[placeIndex].type !== "none"
          ? [{ ...updatedState[placeIndex], is_editor_focused: true }]
          : []),
        ...updatedState.slice(placeIndex + 1),
      ];
    });
  };

  const renderContent = (obj: any, key: number) => {
    console.log(obj, key, "llll");
    switch (obj.type) {
      case "operator":
        return (
          <Operator
            onHover={(v: string) => setTooltip(v)}
            className="mb-3"
            droppable={droppable}
            onChange={onChange}
            index={key}
            {...obj}
          />
        );

      default:
        return (
          <Field
            onHover={(v: string) => setTooltip(v)}
            onSelect={onSelection}
            className={"mb-3"}
            onChange={onChange}
            index={key}
            operators={selectedOperators}
            droppable={droppable}
            {...obj}
          />
        );
    }
  };

  const memorizedVars = useMemo(() => {
    const findOpenCurlyBracket = findPositionBeforeIndex(
      state,
      selectedField,
      "{",
      "}"
    );
    const findCloseCurlyBracket = findPositionAfterIndex(
      state,
      selectedField,
      "}",
      "{"
    );

    const findOpenBracket = findPositionBeforeIndex(
      state,
      selectedField,
      "(",
      ")"
    );
    const findCloseBracket = findPositionAfterIndex(
      state,
      selectedField,
      ")",
      "("
    );

    const isEnclosedWithBracket = findOpenBracket > -1 && findCloseBracket > -1;

    const isEnclosedWithCurlyBracket =
      findOpenCurlyBracket > -1 && findCloseCurlyBracket > -1;

    const isKPIHasCategory = state
      .slice(findOpenCurlyBracket, findCloseCurlyBracket)
      .filter((v: ObjType) => v.type === "category")?.length;

    const isKPIHasClassifications = state
      .slice(findOpenCurlyBracket, findCloseCurlyBracket)
      .filter((v: ObjType) => isClassification(v))?.length;

    const findClassificationIfEnclosed =
      isEnclosedWithBracket &&
      state
        .slice(findOpenBracket, findCloseBracket)
        .find((v: ObjType) => isClassification(v))?.type;

    const findClassificationItemsIfEnclosed =
      isEnclosedWithBracket &&
      state
        .slice(findOpenBracket, findCloseBracket)
        .filter((v: ObjType) => isClassification(v))
        .map((v: ObjType) => v.value);

    const findClassificationIfNotEnclosed =
      (!isEnclosedWithBracket &&
        isEnclosedWithCurlyBracket &&
        state
          .slice(findOpenCurlyBracket, findCloseCurlyBracket)
          .filter((v: ObjType) =>
            isKPIHasCategory ? v?.type === "userType" : isClassification(v)
          )
          .map((v: ObjType) => v.type)
          .filter((x: string, i: number, a: string[]) => a.indexOf(x) === i)) ||
      [];

    //kpi-> category filter start
    const findCategoryIfEnclosed =
      isEnclosedWithBracket &&
      state
        .slice(findOpenBracket, findCloseBracket)
        .find((v: ObjType) => isCategory(v))?.type;

    const findCategoryIfNotEnclosed =
      (!isEnclosedWithBracket &&
        isEnclosedWithCurlyBracket &&
        state
          .slice(findOpenCurlyBracket, findCloseCurlyBracket)
          .filter((v: ObjType) => isCategory(v))
          .map((v: ObjType) => v.type)
          .filter((x: string, i: number, a: string[]) => a.indexOf(x) === i)) ||
      [];

    const findCategoryItemsIfEnclosed =
      isEnclosedWithBracket &&
      state
        .slice(findOpenBracket, findCloseBracket)
        .filter((v: ObjType) => isCategory(v))
        .map((v: ObjType) => v.value);
    //kpi-> category filter end

    //category builder->category filter start
    const findCategoryFilterIfEnclosed =
      isEnclosedWithBracket &&
      state
        .slice(findOpenBracket, findCloseBracket)
        .find((v: ObjType) => isCategoryFilter(v))?.type;

    const findCategoryFilterIfNotEnclosed =
      (!isEnclosedWithBracket &&
        isEnclosedWithCurlyBracket &&
        state
          .slice(findOpenCurlyBracket, findCloseCurlyBracket)
          .filter((v: ObjType) => isCategoryFilter(v))
          .map((v: ObjType) => v.type)
          .filter((x: string, i: number, a: string[]) => a.indexOf(x) === i)) ||
      [];

    const findCategoryFilterItemsIfEnclosed =
      isEnclosedWithBracket &&
      state
        .slice(findOpenBracket, findCloseBracket)
        .filter((v: ObjType) => isCategoryFilter(v))
        .map((v: ObjType) => v.value);

    //category builder->category filter end
    return {
      isEnclosedWithBracket,
      isEnclosedWithCurlyBracket,
      findOpenCurlyBracket,
      findCloseCurlyBracket,
      findOpenBracket,
      findCloseBracket,
      isKPIHasClassifications,
      isKPIHasCategory,
      findClassificationIfEnclosed,
      findClassificationIfNotEnclosed,
      findClassificationItemsIfEnclosed,
      findCategoryFilterIfEnclosed,
      findCategoryFilterIfNotEnclosed,
      findCategoryFilterItemsIfEnclosed,
      findCategoryIfEnclosed,
      findCategoryIfNotEnclosed,
      findCategoryItemsIfEnclosed,
    };
  }, [selectedField, state]);

  const renderPlaceholder = (index: number, isFocused: boolean) => {
    return (
      <PlaceholderEl
        memorizedVars={memorizedVars}
        index={index === state.length ? state.length : index}
        filters={filters}
        ref={index === state.length ? inputEl : null}
        onHover={(v) => setTooltip(v)}
        isEditing={index === state.length ? false : !!isFocused}
        onhandleFocus={(v) =>
          v > -1 && onSelection(index === state.length ? state.length : v)
        }
        onChange={onChange}
        operators={
          memorizedVars?.isEnclosedWithCurlyBracket
            ? operatorsWhenEnclosedWithBracket
            : operatorsWhenEnclosedWithoutBracket
        }
        onKeyPress={() => inputEl?.current?.setFocus()}
        placeholder={
          index === state.length && !state?.length ? placeholder : ""
        }
        type={type}
        allowTyping={
          (allowTyping?.inCurlyBrackets &&
            memorizedVars?.isEnclosedWithCurlyBracket) ||
          (allowTyping?.outSideCurlyBrackets &&
            !memorizedVars?.isEnclosedWithCurlyBracket)
        }
      />
    );
  };

  const errors = validateFormula(state);
  const isValidQuery = !errors?.length && !error;
  return (
    <div className="relative flex flex-col font-montserratBold md:mb-10">
      <Filters
        memorizedVars={memorizedVars}
        disabled={disabled}
        items={filters}
        onhandleSelect={(v) => onhandleSelect(v)}
        onChange={onChange}
        column={filtersColumn}
        state={state}
        type={type}
      />
      {/* <div
        className={classNames(
          "h-10 inline-flex rounded my-4 items-center justify-between relative z-0 font-inter text-xs w-full p-2 bg-light dark:bg-dark-light dark:text-white px-3"
        )}
      >
        <div className="flex items-center">
          {/* <BrowserEl
            as={InformationCircleIcon}
            forSilk="!h-4 !w-4"
            className={classNames("mr-2 h-5 w-5 ", {
              "text-danger": tooltipRef?.current?.isError,
              "text-primary": !tooltipRef?.current?.isError,
            })}
          />
          {/* <span ref={tooltipRef}>{HELP_TEXT.DEFAULT}</span>
        </div>
      </div> */}
      <div
        className={classNames("grid grid-cols-1", {
          "md:grid-cols-1 gap-0": type === "category",
          "md:grid-cols-3 gap-4": type === "kpi",
        })}
      >
        <div
          className={classNames(
            "editor order-2 col-span-2 no-scrollbar overflow-y-scroll  bg-[#FAFAFA] dark:bg-dark-light dark:text-white dark:border-dark-light w-full border p-3 relative",
            {
              "cursor-not-allowed": disabled,
              "!border-danger dark:!border-danger":
                !isValidQuery && !!state?.length,
              "!border-green-500 dark:!border-green-500":
                isValidQuery && !!state?.length,
              "md:order-2 h-[300px]": type === "category",
              "md:order-1 h-[340px]": type === "kpi",
            }
          )}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            const clickedElement = e.target as HTMLElement;
            if (
              clickedElement.classList.contains("editor") ||
              clickedElement.classList.contains("items")
            ) {
              inputEl?.current?.setFocus();
            }
          }}
          onMouseLeave={() => setTooltip(HELP_TEXT.DEFAULT)}
          aria-hidden="true"
        >
          <ul className="items flex flex-wrap items-center">
            {!!state?.length &&
              state.map((v: ObjType, index: number) => {
                return (
                  <>
                    {index !== state.length &&
                      renderPlaceholder(index, !!v.is_editor_focused)}
                    {renderContent(v, index)}
                  </>
                );
              })}
            {renderPlaceholder(state.length, false)}
          </ul>
          {!!state?.length && (
            <div className="absolute bottom-3 right-3">
              {!!isValidQuery && (
                <CheckCircleIcon className="text-green-500 h-8 w-8" />
              )}
              {!isValidQuery && (
                <div className="group relative w-max ">
                  <XCircleIcon className="text-red-500 h-8 w-8 cursor-pointer" />
                  <ul className="bg-white rounded-lg w-60 text-red-500 dark:bg-dark p-2 text-xxs list-disc pl-6 shadow-lg pointer-events-none absolute bottom-8 right-0 opacity-0 transition-opacity group-hover:opacity-100">
                    {errors.map((v: string) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className={classNames(
            "grid order-1 h-auto sm:w-full grid-cols-4  mb-3 md:mb-0 gap-1.5",
            {
              "grid-rows-2":
                selectedOperators?.length > 4 && selectedOperators?.length <= 8,
              "grid-rows-1": selectedOperators?.length <= 4,
              "grid-rows-4": selectedOperators?.length > 8,
              "md:order-1 md:grid-rows-1 md:grid-cols-6 pb-4":
                type === "category",
              "md:order-2 md:grid-rows-4 md:grid-cols-3": type === "kpi",
            }
          )}
        >
          {selectedOperators.map((v, index) => (
            <button
              type="button"
              key={index}
              disabled={
                disabled ||
                (!memorizedVars?.isEnclosedWithCurlyBracket &&
                  operatorsWhenEnclosedWithBracket.indexOf(v) > -1) ||
                (memorizedVars?.isEnclosedWithCurlyBracket &&
                  operatorsWhenEnclosedWithoutBracket.indexOf(v) > -1) ||
                (memorizedVars?.findCategoryIfEnclosed &&
                  ["AND", "OR"].includes(v)) ||
                (memorizedVars?.isEnclosedWithBracket &&
                  ["(", ")", "=", "≠"].includes(v))
              }
              className={classNames(
                "text-base p-3 rounded bg-[#FAFAFA] dark:bg-dark-light dark:text-white text-[#8F8F8F] font-extrabold text-center",
                {
                  "cursor-not-allowed !bg-slate-200 !text-[#B0B0B0] dark:!bg-dark-light  dark:!text-[#5D5D5D]":
                    disabled ||
                    (!memorizedVars?.isEnclosedWithCurlyBracket &&
                      operatorsWhenEnclosedWithBracket.indexOf(v) > -1) ||
                    (memorizedVars?.isEnclosedWithCurlyBracket &&
                      operatorsWhenEnclosedWithoutBracket.indexOf(v) > -1) ||
                    (memorizedVars?.findCategoryIfEnclosed &&
                      ["AND", "OR"].includes(v)) ||
                    (memorizedVars?.isEnclosedWithBracket &&
                      ["(", ")", "=", "≠"].includes(v)),
                }
              )}
              onClick={() => {
                onhandleSelect({
                  label: v,
                  value: v,
                  type: "operator",
                  helper_text: "",
                });
                if (selectedField > -1) onSelection(selectedField + 1);
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
