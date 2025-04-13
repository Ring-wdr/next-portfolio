import { ReactNode, ButtonHTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";
import clsx from "clsx";

const iconStyle = stylex.create({
  customIcon: {
    borderRadius: 100,
    border: "3px solid black",
    width: "max-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: {
      default: "black",
      ":hover": "#9aabce",
    },
    fontSize: 2 * 16,
    padding: 0.15 * 16,
    borderColor: {
      ":hover": "#9aabce",
    },
    boxShadow: {
      ":hover": "0 0 10px 5px #aff9f9",
    },
  },
});

export const IconWrapper = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const iconProps = stylex.props(iconStyle.customIcon);
  return (
    <button
      {...iconProps}
      className={clsx(iconProps.className, className)}
      {...props}
    >
      {children}
    </button>
  );
};
