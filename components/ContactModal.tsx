"use client";

import { useState, useEffect, useActionState } from "react";
import { SERVICES } from "@/lib/data";
import { submitContact, type ContactFormState } from "@/app/actions/contact";

const INITIAL_STATE: ContactFormState = { status: "idle" };

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [servicePreset, setServicePreset] = useState("");
  const [state, action, pending] = useActionState(submitContact, INITIAL_STATE);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      setServicePreset(detail?.service ?? "");
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("open-contact", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-contact", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const errors =
    state.status === "error" ? state.errors : ({} as Record<string, string>);

  return (
    <div
      className={`modal-scrim ${open ? "open" : ""}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains("modal-scrim"))
          setOpen(false);
      }}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Reserve a chair"
      >
        <button
          type="button"
          className="modal-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>

        <aside className="modal-aside">
          <div className="eyebrow eyebrow-warm">
            Maison Noire · Reservations
          </div>
          <div>
            <h3>
              Reserve a <em>chair.</em>
            </h3>
            <p>
              Tell me a little about what you&apos;d like done. I&apos;ll write
              back within 24 hours with two or three time options that fit.
            </p>
          </div>
          <div className="meta">
            <div>
              Stylist <span>Amara Osei</span>
            </div>
            <div>
              Studio <span>217 Franklin St · Brooklyn</span>
            </div>
            <div>
              Hours <span>Tue–Sat · 10:00–20:00</span>
            </div>
          </div>
        </aside>

        <div className="modal-main">
          {state.status === "success" ? (
            <div className="confirm">
              <div className="seal">✓</div>
              <h4>
                Thank <em>you.</em>
              </h4>
              <p>
                Your request is in. I&apos;ll be in touch at{" "}
                <strong className="confirm-email">{state.email}</strong> within
                24 hours with a time and a confirmation.
              </p>
              <button type="button" className="btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          ) : (
            <form action={action} className="contact-form">
              <div>
                <div className="eyebrow eyebrow-warm">
                  Booking request — N° 01
                </div>
                <h4>
                  A few <em>details.</em>
                </h4>
              </div>

              {state.status === "failure" && (
                <p className="form-error-msg">{state.message}</p>
              )}

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="m-name">Full name</label>
                  <input
                    id="m-name"
                    name="name"
                    required
                    placeholder="Imani A."
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="m-email">Email</label>
                  <input
                    id="m-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="m-phone">Phone</label>
                  <input
                    id="m-phone"
                    name="phone"
                    placeholder="+1 (—) — —"
                    autoComplete="tel"
                  />
                </div>

                <div className="field">
                  <label htmlFor="m-date">Preferred date</label>
                  <input id="m-date" name="date" type="date" />
                </div>

                <div className="field full">
                  <label htmlFor="m-service">Service</label>
                  <select
                    id="m-service"
                    name="service"
                    defaultValue={servicePreset || SERVICES[0].name + " " + SERVICES[0].italic}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id}>
                        {s.name} {s.italic}
                      </option>
                    ))}
                    <option>Not sure — I&apos;d like a consultation</option>
                  </select>
                </div>

                <div className="field full">
                  <label htmlFor="m-notes">
                    Notes (hair length, references, anything I should know)
                  </label>
                  <textarea
                    id="m-notes"
                    name="notes"
                    placeholder="Currently shoulder-length, last colored in February…"
                  />
                </div>
              </div>

              <div className="form-actions">
                <small>I&apos;ll respond within 24 hours · personally</small>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={pending}
                >
                  {pending ? "Sending…" : "Send request →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
