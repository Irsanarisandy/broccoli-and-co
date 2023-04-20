import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IProp {
  testId?: string;
}

export function Button({
  testId,
  type = "button",
  disabled,
  className,
  style,
  onClick,
  children,
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  IProp) {
  return (
    <button
      data-testid={testId || `${type === "button" ? "default" : type}-button`}
      type={type}
      disabled={disabled}
      className={`border-2 border-gray-400 hover:bg-gray-100 disabled:opacity-30 ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
