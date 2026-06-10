"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  if (!email.includes("@") || !email.includes("."))
    errors.email = "Enter a valid email address.";

  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  else if (message.length > 2000) errors.message = "Message must be 2000 characters or fewer.";

  return errors;
}

const EMPTY_FORM: FormState = { name: "", email: "", message: "", company: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field !== "company" && errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        setStatus("success");
      } else if (data.error === "rate_limited") {
        setSubmitError("Too many messages sent. Please wait 10 minutes before trying again.");
        setStatus("error");
      } else {
        setSubmitError(
          "Message could not be sent. Email me directly at akash102502@gmail.com"
        );
        setStatus("error");
      }
    } catch {
      setSubmitError("Message could not be sent. Email me directly at akash102502@gmail.com");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-lg border border-border bg-card p-8 text-center"
      >
        <p className="font-heading text-h3 font-semibold text-foreground">Message sent.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          I&apos;ll reply to {form.email} within 24 hours.
        </p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — visually hidden, should remain empty */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] -top-[9999px] overflow-hidden opacity-0"
      >
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          required
          disabled={isSubmitting}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(
            "w-full rounded-md border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
            errors.name ? "border-destructive" : "border-input",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSubmitting}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            "w-full rounded-md border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
            errors.email ? "border-destructive" : "border-input",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-eyebrow uppercase tracking-[0.1em] text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          disabled={isSubmitting}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "w-full resize-y rounded-md border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
            errors.message ? "border-destructive" : "border-input",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
          placeholder="What you would like to discuss..."
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "rounded-md bg-accent px-6 py-2.5 font-mono text-sm font-medium text-background",
            "transition-colors hover:bg-accent/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isSubmitting && "cursor-not-allowed opacity-60"
          )}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {status === "error" && submitError && (
          <p role="alert" aria-live="polite" className="mt-3 text-xs text-destructive">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
