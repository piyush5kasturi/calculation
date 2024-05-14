export interface Props {
  text: string | null | undefined;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  full?: boolean;
  isDropdown?: boolean;
  className?: any;
  variant?:
    | "primary"
    | "primary-light"
    | "secondary"
    | "action-danger"
    | "action-button"
    | "danger"
    | "danger-light"
    | "bordered"
    | "dark";
  type?: "button" | "submit" | "reset" | undefined;
  Icon?: any;
  size?:
    | "small"
    | "normal"
    | "medium"
    | "large"
    | "wide"
    | "extra-wide"
    | "extra-small";
  iconClassName?: string;
  hideTextOnMobile?: boolean;
  svgStyle?: "fill" | "stroke";
  iconPosition?: "before" | "after";
}
