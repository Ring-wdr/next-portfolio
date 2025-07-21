import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/shared/ui/button";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const additionalClass = "my-custom-class";
    render(<Button className={additionalClass}>Submit</Button>);
    const buttonElement = screen.getByRole("button", { name: /Submit/i });
    expect(buttonElement).toHaveClass(additionalClass);
  });

  it("passes other HTML button attributes", () => {
    render(
      <Button type="submit" disabled>
        Send
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /Send/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toBeDisabled();
  });
});
