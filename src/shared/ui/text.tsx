import { classNames } from "@/shared/utils/classnames";
import { Slot, type SlotProps } from "@radix-ui/react-slot";

export function Text({
  className,
  asChild,
  ...props
}: SlotProps & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "p";
  return <Comp {...props} className={classNames("text-primary", className)} />;
}
