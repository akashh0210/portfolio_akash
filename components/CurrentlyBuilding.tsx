import { Container } from "@/components/Container";

export function CurrentlyBuilding() {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
            Currently building
          </p>
          <p className="text-sm text-muted-foreground">
            A multi-agent PM research tool — autonomous agents for competitive analysis,
            user research synthesis, and spec generation, built on Claude&apos;s agent SDK.
          </p>
        </div>
      </Container>
    </section>
  );
}
