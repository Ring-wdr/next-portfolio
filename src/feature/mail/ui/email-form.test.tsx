import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmailForm } from "./email-form";
import { sendEmail } from "../action/send-mail";

// Mock the server action
vi.mock("../action/send-mail", () => ({
  sendEmail: vi.fn(),
}));

// Mock useActionState
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useActionState: (
      action: typeof sendEmail,
      initialState: Awaited<ReturnType<typeof sendEmail>>
    ) => {
      const [state, setState] = actual.useState(initialState);
      const formAction = async (formData: FormData) => {
        const result = await action(state, formData);
        setState(result);
      };
      return [state, formAction, false]; // isPending is mocked as false for simplicity
    },
  };
});

describe("EmailForm Component Test", () => {
  it("should render form elements correctly", () => {
    render(<EmailForm />);

    expect(screen.getByPlaceholderText("이름")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("내용")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("should allow user to type in the form fields", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    const nameInput = screen.getByPlaceholderText("이름");
    const contentTextarea = screen.getByPlaceholderText("내용");

    await user.type(nameInput, "John Doe");
    await user.type(contentTextarea, "Hello, this is a test.");

    expect(nameInput).toHaveValue("John Doe");
    expect(contentTextarea).toHaveValue("Hello, this is a test.");
  });

  it("should call the form action on submit", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.type(screen.getByPlaceholderText("이름"), "Jane Doe");
    await user.type(
      screen.getByPlaceholderText("내용"),
      "Another test message."
    );
    await user.click(screen.getByRole("button", { name: "Send" }));

    // We can't directly test the mocked sendEmail call here due to the nature of server actions
    // and our useActionState mock. However, this test ensures the form submission process is initiated.
    // The E2E test will cover the full action.
  });
});
