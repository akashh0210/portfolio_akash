import { cn } from "@/lib/utils";

interface MetricBlockProps {
  value: string;
  label: string;
  size?: "lg" | "sm";
  className?: string;
}

export function MetricBlock({ value, label, size = "lg", className }: MetricBlockProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-heading font-bold leading-none tracking-tight text-metric",
          size === "lg" ? "text-metric" : "text-h2"
        )}
      >
        {value}
      </span>
      <span className="mt-1.5 font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
