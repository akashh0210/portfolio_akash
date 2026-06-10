interface MetadataBarProps {
  role: string;
  stack: string[];
  timeframe: string;
  outcome: string;
}

export function MetadataBar({ role, stack, timeframe, outcome }: MetadataBarProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground">
            Role
          </p>
          <p className="mt-1.5 text-sm text-foreground">{role}</p>
        </div>

        <div>
          <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground">
            Stack
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground">
            Timeframe
          </p>
          <p className="mt-1.5 text-sm text-foreground">{timeframe}</p>
        </div>
      </div>

      <div>
        <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground">
          Outcome
        </p>
        <p className="mt-1.5 text-sm leading-6 text-foreground">{outcome}</p>
      </div>
    </div>
  );
}
