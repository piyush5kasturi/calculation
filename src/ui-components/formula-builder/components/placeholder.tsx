import classNames from "classnames";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { HELP_TEXT } from "../constants";
import { ObjType } from "../formula-builder.interface";
import { setDefaultState } from "../helpers";
import React from "react";
interface Props {
  index: number;
  onHover: (v: string) => void;
  onChange: (v: any) => void;
  isEditing: boolean;
  onKeyPress?: () => void;
  operators: string[];
  filters: any;
  type: "kpi" | "category";
  allowTyping?: boolean;
  onhandleFocus: (v: number) => void;
  memorizedVars: {
    isEnclosedWithCurlyBracket: boolean;
    isEnclosedWithBracket: boolean;
    isKPIHasCategory: boolean;
    isKPIHasClassifications: boolean;
    findClassificationIfEnclosed: string | boolean;
    findClassificationIfNotEnclosed: string[];
    findClassificationItemsIfEnclosed: string[];
    findCategoryFilterIfEnclosed: string | boolean;
    findCategoryFilterIfNotEnclosed: string[];
    findCategoryFilterItemsIfEnclosed: string[];
  };
  placeholder?: string;
}

const PlaceholderEl = forwardRef<HTMLElement, Props>(
  (
    {
      index,
      onHover,
      onChange,
      isEditing: defaultEditing = false,
      onKeyPress,
      operators = [],
      filters,
      onhandleFocus,
      memorizedVars,
      placeholder = "",
      type,
      allowTyping,
    }: Props,
    ref: any
  ): JSX.Element => {
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
      findCategoryFilterItemsIfEnclosed,
    } = memorizedVars;
    const inputEl = useRef<any>(null);
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
      setEditing(defaultEditing);
    }, [defaultEditing]);

    useEffect(() => {
      if (inputEl?.current && isEditing) {
        setTimeout(() => inputEl?.current?.focus(), 0);
        onhandleFocus(index);
      }
    }, [index, isEditing, onhandleFocus, ref]);

    useImperativeHandle(ref, () => ({
      setFocus() {
        setEditing(true);
      },
    }));

    const findItemsCategoryBuilder = () => {
      const items =
        filters.find((v: ObjType) => v?.type === "category_filters")?.items ||
        [];
      if (
        !isEnclosedWithCurlyBracket ||
        (!isEnclosedWithBracket && isEnclosedWithCurlyBracket) ||
        (isEnclosedWithBracket && !findCategoryFilterIfEnclosed)
      ) {
        return (
          items
            .filter(
              (v: ObjType) =>
                findCategoryFilterIfNotEnclosed.indexOf(v?.value) === -1
            )
            .map(
              (v: ObjType) =>
                [
                  {
                    label: `${v?.label}`,
                    value: `${v?.value}`,
                    isGroup: true,
                  },
                  ...(v?.items?.length ? v.items : []),
                ] || []
            )
            .flat(1) || []
        );
      } else if (isEnclosedWithBracket && isEnclosedWithCurlyBracket) {
        return (
          items
            .find(
              (v: { value: string }) => v.value === findCategoryFilterIfEnclosed
            )
            ?.items.filter(
              (v: ObjType) =>
                findCategoryFilterItemsIfEnclosed.indexOf(v?.value) === -1 ||
                v?.type === "custom_field"
            ) || []
        );
      }
    };

    const findItemsKPIBuilder = () => {
      const items =
        filters.find((v: ObjType) => v?.type === "classification")?.items || [];
      const kpiItems =
        filters.find((v: ObjType) => v?.type === "kpi")?.items || [];
      const categoryItems = !isKPIHasClassifications
        ? filters.find((v: ObjType) => v?.type === "category")?.items || []
        : [];
      if (!isEnclosedWithCurlyBracket) {
        return kpiItems?.map((v: ObjType) => {
          v.type = "kpi";
          return v;
        });
      } else if (isEnclosedWithCurlyBracket && !isEnclosedWithBracket) {
        const filteredItems =
          items
            .filter((v: ObjType) =>
              isKPIHasCategory
                ? findClassificationIfNotEnclosed.indexOf(v?.value) === -1 &&
                  v?.value === "userType"
                : findClassificationIfNotEnclosed.indexOf(v?.value) === -1
            )
            .map(
              (v: ObjType) =>
                [
                  {
                    label: `${v?.value}s`,
                    value: `${v?.value}s`,
                    isGroup: true,
                  },
                  ...(v?.items?.length ? v.items : []),
                ] || []
            )
            .flat(1) || [];
        return isKPIHasCategory
          ? [...filteredItems]
          : [
              ...filteredItems,
              ...(!isKPIHasClassifications
                ? [
                    { label: "categories", value: "categories", isGroup: true },
                    ...categoryItems,
                  ]
                : []),
            ];
      } else if (
        isEnclosedWithBracket &&
        isKPIHasClassifications &&
        isEnclosedWithCurlyBracket
      ) {
        return (
          items
            .find(
              (v: { value: string }) => v.value === findClassificationIfEnclosed
            )
            ?.items.filter(
              (v: ObjType) =>
                findClassificationItemsIfEnclosed.indexOf(v?.value) === -1
            ) || []
        );
      }

      return [];
    };

    const onhandleChange = (key: string) => {
      onChange((prevState: any) => {
        const updatedState = setDefaultState(prevState);
        const items =
          type === "kpi" ? findItemsKPIBuilder() : findItemsCategoryBuilder();
        console.log(items, "sadadadasdad");
        return [
          ...updatedState.slice(0, index),
          { label: `Enter`, value: key, type: "none", is_editing: true, items },
          ...updatedState.slice(index),
        ];
      });
      setEditing(false);
    };

    return isEditing ? (
      <div
        className="w-3 h-6 flex justify-center mb-3 align-middle relative top-[1.5px]"
        aria-hidden
      >
        <input
          className={classNames(
            "w-3 text-base dark:text-white text-center bg-inherit font-inter outline-none focus:outline-none"
          )}
          onMouseEnter={() =>
            onHover && onHover(HELP_TEXT.PLACEHOLDER_INPUT_TEXT)
          }
          ref={inputEl}
          onBlur={() => setEditing(false)}
          onKeyDown={(e: any) => {
            const findOperator = operators.find((v) => v === e.key);
            if (
              allowTyping &&
              ((e.keyCode >= 48 && e.keyCode <= 57) ||
                (e.keyCode >= 65 && e.keyCode <= 90))
            ) {
              onhandleChange(e.key);
            }
            if (findOperator) {
              onChange((prevState: ObjType[]) => {
                const updatedState = setDefaultState(prevState);

                console.log(updatedState, "assasasppppp");
                if (prevState.length === index && onKeyPress) onKeyPress();
                return [
                  ...updatedState.slice(0, index),
                  {
                    value: e.key,
                    label: e.key,
                    type: "operator",
                  },
                  ...(prevState.length !== index
                    ? [
                        {
                          ...updatedState[index],
                          is_editor_focused: true,
                        },
                      ]
                    : []),
                  ...updatedState.slice(index + 1),
                ];
              });
            }
            if (e.key === "Backspace") {
              onChange((prevState: ObjType[]) => {
                const updatedState = setDefaultState(prevState);
                let popPreviousItem: ObjType[] = [];
                if (index === prevState?.length) {
                  popPreviousItem = [
                    ...updatedState.slice(0, updatedState?.length - 1),
                  ];
                } else if (index > 0) {
                  popPreviousItem = [
                    ...updatedState.slice(0, index - 1),
                    {
                      ...updatedState[index],
                      is_editor_focused: true,
                    },
                    ...updatedState.slice(index + 1),
                  ];
                  setEditing(false);
                } else {
                  popPreviousItem = [...updatedState];
                }
                return popPreviousItem;
              });
            } else if (e.key === "ArrowLeft") {
              onChange((prevState: ObjType[]) => {
                const updatedState = setDefaultState(prevState);
                if (index >= 1) {
                  updatedState[index - 1].is_editor_focused = true;
                  return updatedState;
                } else if (prevState.length)
                  return [
                    { ...updatedState[0], is_editor_focused: true },
                    ...prevState.slice(1),
                  ];
              });
            } else if (e.key === "ArrowRight") {
              onChange((prevState: ObjType[]) => {
                const updatedState = setDefaultState(prevState);
                if (index < prevState.length - 1) {
                  updatedState[index + 1].is_editor_focused = true;
                  return updatedState;
                } else {
                  if (onKeyPress) onKeyPress();
                  return prevState;
                }
              });
            } else {
              e.preventDefault();
            }
            onHover && onHover(HELP_TEXT.DEFAULT);
          }}
        />
      </div>
    ) : (
      <li
        aria-hidden
        className={classNames(
          "h-6 flex justify-start items-center mb-3 relative top-[1.5px]",
          {
            "w-54 ml-3 text-[#6D6D6D]": placeholder,
            "w-3": !placeholder,
          }
        )}
        onMouseEnter={() => onHover && onHover(HELP_TEXT.PLACEHOLDER_TEXT)}
        onClick={() => {
          setEditing(true);
        }}
      >
        {placeholder}
      </li>
    );
  }
);

PlaceholderEl.displayName = "Placeholder";
export default PlaceholderEl;
