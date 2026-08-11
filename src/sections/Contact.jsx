import { useId, useState } from "react";
import emailjs from "@emailjs/browser";
import Container from "@/components/layout/Container";
import TextReveal from "@/components/animations/TextReveal";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOCIALS = [
  {
    label: "Email",
    value: "davantrian@gmail.com",
    href: "mailto:davantrian@gmail.com",
  },
  {
    label: "GitHub",
    value: "danieltriandavan25-a11y",
    href: "https://github.com/danieltriandavan25-a11y",
  },
  {
    label: "Facebook",
    value: "Facebook",
    href: "https://www.facebook.com/danieltrian09",
  },
];

const INITIAL_FORM = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

/**
 * Contact — final section.
 * Two-column editorial layout: intro + contact channels on the left,
 * a bordered EmailJS-powered form on the right. Mirrors the spacing,
 * borders, and typography tokens used by Services/About/Skills.
 */
export default function Contact() {
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const isSubmitting = status === "submitting";

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY."
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus("success");
      setValues(INITIAL_FORM);
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Intro + contact channels */}
          <TextReveal as="div">
            <p className="text-sm font-medium text-[var(--color-ink-muted)]">
              Let&rsquo;s work together
            </p>

            <h2
              id="contact-heading"
              className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl"
            >
              Have a project in mind? Let&rsquo;s build it.
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg">
              Whether it&rsquo;s a new website, a web app, or an improvement
              to something existing, I&rsquo;d love to hear about it. Send a
              message or reach out directly below.
            </p>

            <ul className="mt-10 border-t border-[var(--color-border)]">
              {SOCIALS.map((social) => (
                <li
                  key={social.label}
                  className="flex items-center justify-between border-b border-[var(--color-border)] py-4"
                >
                  <span className="text-sm text-[var(--color-ink-muted)]">
                    {social.label}
                  </span>
                  <a
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={
                      social.label === "Email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-ink-muted)]"
                  >
                    {social.value}
                  </a>
                </li>
              ))}
            </ul>
          </TextReveal>

          {/* Form */}
          <TextReveal as="div" delay={80}>
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor={nameId}
                  className="block text-sm font-medium text-[var(--color-ink)]"
                >
                  Name
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  className="mt-2 w-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-ink)] disabled:opacity-60"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p
                    id={`${nameId}-error`}
                    className="mt-2 text-xs text-[var(--color-ink-muted)]"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={emailId}
                  className="block text-sm font-medium text-[var(--color-ink)]"
                >
                  Email
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? `${emailId}-error` : undefined
                  }
                  className="mt-2 w-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-ink)] disabled:opacity-60"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p
                    id={`${emailId}-error`}
                    className="mt-2 text-xs text-[var(--color-ink-muted)]"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={messageId}
                  className="block text-sm font-medium text-[var(--color-ink)]"
                >
                  Message
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? `${messageId}-error` : undefined
                  }
                  className="mt-2 w-full resize-none border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-ink)] disabled:opacity-60"
                  placeholder="Tell me a bit about your project..."
                />
                {errors.message && (
                  <p
                    id={`${messageId}-error`}
                    className="mt-2 text-xs text-[var(--color-ink-muted)]"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-3 text-sm font-medium text-[var(--color-surface)] transition-colors hover:bg-transparent hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>

              <div role="status" aria-live="polite">
                {status === "success" && (
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    Thanks for reaching out — I&rsquo;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    Something went wrong sending your message. Please try
                    again, or email me directly.
                  </p>
                )}
              </div>
            </form>
          </TextReveal>
        </div>
      </Container>
    </section>
  );
}
