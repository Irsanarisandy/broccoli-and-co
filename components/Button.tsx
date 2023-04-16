import type { CSSProperties } from "react";

interface IProp {
  testId?: string;
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  classes?: string;
  styles?: CSSProperties;
  onClick?: () => void;
}

export function Button({
  testId,
  label,
  type = "button",
  disabled,
  classes,
  styles,
  onClick,
}: IProp) {
  return (
    <button
      data-testid={testId || `${type === "button" ? "default" : type}-button`}
      type={type}
      disabled={disabled}
      className={`border-2 border-gray-400 px-3 py-2 hover:bg-gray-100 disabled:opacity-30 ${classes}`}
      style={styles}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
