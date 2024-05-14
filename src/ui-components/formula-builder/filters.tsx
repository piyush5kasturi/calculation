import classNames from "classnames";
import { useParams } from "react-router-dom";
// import { fetchKPIsDataForDropdown } from "src/pages/data/kpi/builder/builder.services";
import React from "react";
// import Shorthand from "./components/shorthand";
import { ObjType } from "./formula-builder.interface";
import Dropdown from "../dropdown";
interface Props {
  onChange: (v: any) => void;
  onhandleSelect: (v: any) => void;
  items: any[];
  column?: number;
  disabled: boolean;
  state: ObjType[];
  type: "kpi" | "category";
  memorizedVars: {
    isEnclosedWithCurlyBracket: boolean;
    isEnclosedWithBracket: boolean;
    isKPIHasCategory: boolean;
    isKPIHasClassifications: boolean;
    findClassificationIfEnclosed: string | boolean;
    findCategoryFilterIfEnclosed: string | boolean;
    findCategoryFilterIfNotEnclosed: string[];
    findClassificationIfNotEnclosed: string[];
    findClassificationItemsIfEnclosed: string[];
    findCategoryIfEnclosed: string | boolean;
  };
}

export default function Filters({
  onChange,
  onhandleSelect,
  items,
  disabled: isComponentDisabled,
  memorizedVars,
  column,
  state,
  type: builderType,
}: Props) {
  const { id: KPIId } = useParams();
  const {
    isEnclosedWithBracket,
    findClassificationIfEnclosed,
    findClassificationIfNotEnclosed,
    isKPIHasCategory,
    isKPIHasClassifications,
    isEnclosedWithCurlyBracket,
    findClassificationItemsIfEnclosed,
    findCategoryFilterIfEnclosed,
    findCategoryFilterIfNotEnclosed,
    findCategoryIfEnclosed,
  } = memorizedVars;
  const columnClassName = `lg:grid-cols-${column}`;

  const getKPIBuilderOptions = (options: any, type: string) => {
    if (isKPIHasCategory && !isEnclosedWithBracket && type === "classification")
      return options.filter(
        (v: ObjType) =>
          findClassificationIfNotEnclosed.indexOf(v?.value) === -1 &&
          v?.value === "userType" &&
          v?.items?.length !== findClassificationItemsIfEnclosed?.length
      );

    if (isEnclosedWithBracket && type === "classification")
      return options.filter(
        (v: ObjType) =>
          v?.value === findClassificationIfEnclosed &&
          v?.items?.length !== findClassificationItemsIfEnclosed?.length
      );

    if (!isEnclosedWithBracket && type === "classification")
      return options.filter(
        (v: ObjType) => findClassificationIfNotEnclosed.indexOf(v?.value) === -1
      );

    return options;
  };

  const getCategoryBuilderOptions = (options: any, type: string) => {
    /** Category Builder Conditions - Starts here */
    if (isEnclosedWithBracket && type === "category_filters")
      return options.filter(
        (v: ObjType) => v?.value === findCategoryFilterIfEnclosed
      );

    if (!isEnclosedWithBracket && type === "category_filters")
      return options.filter(
        (v: ObjType) => findCategoryFilterIfNotEnclosed.indexOf(v?.value) === -1
      );
    /** Category Builder Conditions - Ends here */
    return options;
  };

  return (
    <div className={classNames("mb-1 grid grid-cols-1 gap-x-12")}>
      <div
        className={classNames(
          "grid grid-cols-1 md:grid-cols-2 gap-4 mb-1",
          columnClassName
        )}
      >
        {items?.length &&
          items.map(
            ({
              placeholder,
              disabled = false,
              type,
              items: options,
              span = 1,
              end = null,
              start = null,
              label = null,
              filter = null,
              tooltip,
              content,
            }) => {
              const updatedOptions =
                builderType === "kpi"
                  ? getKPIBuilderOptions(options, type)
                  : getCategoryBuilderOptions(options, type);
              const buttonClassName =
                disabled ||
                isComponentDisabled ||
                !updatedOptions?.length ||
                (isEnclosedWithCurlyBracket && type === "kpi") ||
                (isKPIHasCategory && type === "category") ||
                (isKPIHasClassifications && type === "category") ||
                (!isEnclosedWithCurlyBracket &&
                  (type === "classification" ||
                    type === "category" ||
                    type === "operator" ||
                    (!!state?.length && type === "category_filters"))) ||
                (findCategoryIfEnclosed && type === "operator")
                  ? ""
                  : `!text-base dark:bg-dark-light/90 !text-[#3D3D3D] dark:!text-white dark:placeholder:!text-white`;
              const isDisabled =
                disabled ||
                !updatedOptions?.length ||
                isComponentDisabled ||
                (isEnclosedWithCurlyBracket && type === "kpi") ||
                (isKPIHasCategory && type === "category") ||
                (isKPIHasClassifications && type === "category") ||
                (!isEnclosedWithCurlyBracket &&
                  (type === "classification" ||
                    type === "category" ||
                    type === "operator" ||
                    (!!state?.length && type === "category_filters"))) ||
                (findCategoryIfEnclosed && type === "operator");
              return (
                <div
                  key={type}
                  className={classNames({
                    [`col-start-${start}`]: start,
                    [`col-end-${end}`]: end,
                    [`col-span-${span}`]: span,
                  })}
                >
                  {{
                    kpi: (
                      <Dropdown
                        items={updatedOptions}
                        label="KPI"
                        buttonClassName={buttonClassName}
                        placeholder={placeholder}
                        onChange={(v) => onhandleSelect({ ...v, type })}
                      />
                    ),
                    // shorthand: (
                    //   <Shorthand
                    //     onAction={(values: any[]) =>
                    //       onChange(() => [...values])
                    //     }
                    //     tooltip={tooltip}
                    //   />
                    // ),
                    content,
                  }[type] || (
                    <Dropdown
                      items={updatedOptions}
                      label={label ? label : ""}
                      buttonClassName={buttonClassName}
                      placeholder={placeholder}
                      onChange={(v) => onhandleSelect({ ...v, type })}
                    />
                  )}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}
