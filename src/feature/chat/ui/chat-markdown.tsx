import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { classNames } from "@/shared/utils/classnames";

type ChatMarkdownProps = {
  content: string;
};

export function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        h1: ({ className, ...props }) => (
          <h1
            className={classNames(
              "text-base font-semibold tracking-tight",
              className,
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={classNames(
              "text-[0.95rem] font-semibold tracking-tight",
              className,
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={classNames("text-sm font-semibold", className)}
            {...props}
          />
        ),
        p: ({ className, ...props }) => (
          <p
            className={classNames("whitespace-pre-wrap", className)}
            {...props}
          />
        ),
        a: ({ className, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            className={classNames(
              "font-medium text-inherit underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current",
              className,
            )}
          />
        ),
        ul: ({ className, ...props }) => (
          <ul
            className={classNames("list-disc space-y-1 pl-5", className)}
            {...props}
          />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={classNames("list-decimal space-y-1 pl-5", className)}
            {...props}
          />
        ),
        li: ({ className, ...props }) => (
          <li className={classNames("pl-1", className)} {...props} />
        ),
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={classNames(
              "border-l-2 border-current/20 pl-3 italic text-current/80",
              className,
            )}
            {...props}
          />
        ),
        hr: ({ className, ...props }) => (
          <hr
            className={classNames("border-current/12", className)}
            {...props}
          />
        ),
        table: ({ className, ...props }) => (
          <table
            className={classNames(
              "mt-1 w-full border-collapse overflow-hidden rounded-xl text-left text-xs",
              className,
            )}
            {...props}
          />
        ),
        thead: ({ className, ...props }) => (
          <thead
            className={classNames("bg-black/5 dark:bg-white/6", className)}
            {...props}
          />
        ),
        th: ({ className, ...props }) => (
          <th
            className={classNames(
              "border border-current/10 px-2 py-1.5 font-semibold",
              className,
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <td
            className={classNames(
              "border border-current/10 px-2 py-1.5",
              className,
            )}
            {...props}
          />
        ),
        pre: ({ className, ...props }) => (
          <pre
            className={classNames(
              "overflow-x-auto rounded-xl border border-current/10 bg-black/6 p-3 text-xs leading-6 dark:bg-white/6",
              className,
            )}
            {...props}
          />
        ),
        code: ({ className, children, ...props }) => {
          const isBlock =
            typeof className === "string" && className.includes("language-");

          return (
            <code
              className={classNames(
                isBlock
                  ? "font-mono text-[0.78rem]"
                  : "rounded-md bg-black/6 px-1.5 py-0.5 font-mono text-[0.78rem] dark:bg-white/8",
                className,
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
