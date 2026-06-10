import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sk Akash Ali for AI PM roles, consulting, or collaboration.",
  openGraph: {
    title: "Contact — Sk Akash Ali",
    description: "Get in touch for AI PM roles, consulting, or collaboration.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="reading">
        <header>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            Get in touch
          </p>
          <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-foreground">
            Contact
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            For PM roles, consulting, or collaboration. I typically reply within 24 hours.
          </p>
        </header>

        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
