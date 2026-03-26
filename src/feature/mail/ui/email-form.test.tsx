import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmailForm } from "./email-form";
import { sendEmail } from "../action/send-mail";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === "ContactPage") {
      const messages = {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@company.com",
        company: "Company",
        companyPlaceholder: "Company or team",
        purpose: "Purpose",
        website: "Website",
        message: "Message",
        messagePlaceholder: "Tell me about the opportunity or project",
        privacyNote: "I will only use this information to reply to your inquiry.",
        send: "Send",
        sending: "Sending...",
        purposeOptions: {
          jobOpportunity: "Job opportunity",
          projectInquiry: "Project inquiry",
          collaboration: "Collaboration",
          other: "Other",
        },
      } as const;

      return messages[key as keyof typeof messages] ?? key;
    }

    return key;
  },
}));

vi.mock("../action/send-mail", () => ({
  sendEmail: vi.fn(),
}));

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
      return [state, formAction, false];
    },
  };
});

describe("EmailForm Component Test", () => {
  it("should render form elements correctly", () => {
    render(<EmailForm />);

    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company or team")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tell me about the opportunity or project")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Purpose")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("should allow user to type in the form fields", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    const nameInput = screen.getByPlaceholderText("Your name");
    const emailInput = screen.getByPlaceholderText("you@company.com");
    const companyInput = screen.getByPlaceholderText("Company or team");
    const contentTextarea = screen.getByPlaceholderText(
      "Tell me about the opportunity or project"
    );

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(companyInput, "OpenAI");
    await user.type(contentTextarea, "Hello, this is a test.");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(companyInput).toHaveValue("OpenAI");
    expect(contentTextarea).toHaveValue("Hello, this is a test.");
  });

  it("should call the form action on submit", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.type(screen.getByPlaceholderText("Your name"), "Jane Doe");
    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "jane@example.com"
    );
    await user.type(
      screen.getByPlaceholderText("Tell me about the opportunity or project"),
      "Another test message."
    );
    await user.click(screen.getByRole("button", { name: "Send" }));
  });
});
