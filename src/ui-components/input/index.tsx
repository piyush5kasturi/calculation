import classNames from "classnames";
import Label from "../label";
import React from "react";

interface Props {
  type?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  PrefixIcon?: any;
  PostfixIcon?: any;
  className?: string;
  errors?: boolean;
  required?: boolean;
  disabled?: boolean;
  ref?: any;
  isLoading?: boolean;
  autoComplete?: string;
  tooltip?: string | React.ReactNode;
  tooltipClass?: string;
  IconClassName?: string;
  min?: string | number | undefined;
  max?: string | number | undefined;
  maxLength?: number | undefined;
  readOnly?: boolean;
  name?: string | undefined;
  onKeyDown?: (value: any) => void;
  step?: number;
  hideArrow?: boolean;
}
export default function Input({
  type = "text",
  value,
  onChange,
  errors,
  placeholder = "Enter Value",
  label,
  required = false,
  disabled = false,
}: Props) {
  return (
    <div className="flex flex-col relative gap-2">
      {label && (
        <Label required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      <input
        value={value}
        onChange={onChange}
        className={classNames(
          `shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline`,
          { "border border-red-500": errors }
        )}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
