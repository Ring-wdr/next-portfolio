import type { PortfolioSpec } from "../lib/spec";

type LinkElementProps = {
  spec: PortfolioSpec;
  elementId: string;
};

function LinkElement({ spec, elementId }: LinkElementProps) {
  const el = spec.elements[elementId];
  if (!el) return null;

  if (el.type === "LinkGroup") {
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {el.children.map((childId) => (
          <LinkElement key={childId} spec={spec} elementId={childId} />
        ))}
      </div>
    );
  }

  const label = typeof el.props.label === "string" ? el.props.label : "";
  const url = typeof el.props.url === "string" ? el.props.url : "#";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {label}
    </a>
  );
}

export function LinkRenderer({ spec }: { spec: PortfolioSpec }) {
  return <LinkElement spec={spec} elementId={spec.root} />;
}
