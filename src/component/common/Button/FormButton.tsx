"use client";

import { ButtonHTMLAttributes } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./Button";

export const FormButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" {...props}>
      {pending ? "Sending..." : "Send"}
    </Button>
  );
};
