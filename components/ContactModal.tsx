"use client";

import { useState, useEffect, useActionState } from "react";
import { SERVICES } from "@/lib/data";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_STATE: ContactFormState = { status: "idle" };

type InputFieldDef = {
  kind: "input";
  name: string;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
};

type SelectFieldDef = {
  kind: "select";
  name: string;
  id: string;
  label: string;
  className?: string;
};

type TextareaFieldDef = {
  kind: "textarea";
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  className?: string;
};

type FieldDef = InputFieldDef | SelectFieldDef | TextareaFieldDef;

const FIELDS: FieldDef[] = [
  { kind: "input", name: "name", id: "m-name", label: "Full name", placeholder: "Imani A.", autoComplete: "name", required: true },
  { kind: "input", name: "email", id: "m-email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", required: true },
  { kind: "input", name: "phone", id: "m-phone", label: "Phone", placeholder: "+1 (212) 000 0000", autoComplete: "tel" },
  { kind: "input", name: "date", id: "m-date", label: "Preferred date", type: "date" },
  { kind: "select", name: "service", id: "m-service", label: "Service", className: "full" },
  { kind: "textarea", name: "notes", id: "m-notes", label: "Notes (hair length, references, anything I should know)", placeholder: "Currently shoulder-length, last colored in February…", className: "full" },
];

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [servicePreset, setServicePreset] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [state, action, pending] = useActionState(submitContact, INITIAL_STATE);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      const preset = detail?.service ?? "";
      setServicePreset(preset);
      setSelectValue(preset || `${SERVICES[0].name} ${SERVICES[0].italic}`);
      setOpen(true);
    };
    window.addEventListener("open-contact", onOpen);
    return () => window.removeEventListener("open-contact", onOpen);
  }, []);

  const errors = state.status === "error" ? state.errors : ({} as Record<string, string>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="modal" aria-describedby="modal-desc">
        <DialogTitle className="sr-only">Reserve a chair</DialogTitle>
        <DialogDescription id="modal-desc" className="sr-only">
          Fill in your details and we&apos;ll confirm a time within 24 hours.
        </DialogDescription>

        <aside className="modal-aside">
          <div className="eyebrow eyebrow-warm">Maison Noire · Reservations</div>
          <div>
            <h3>Reserve a <em>chair.</em></h3>
            <p>
              Tell me a little about what you&apos;d like done. I&apos;ll write
              back within 24 hours with two or three time options that fit.
            </p>
          </div>
          <div className="meta">
            <div>Stylist <span>Amara Osei</span></div>
            <div>Studio <span>217 Franklin St · Brooklyn</span></div>
            <div>Hours <span>Tue-Sat · 10:00-20:00</span></div>
          </div>
        </aside>

        <div className="modal-main">
          {state.status === "success" ? (
            <div className="confirm">
              <div className="seal">✓</div>
              <h4>Thank <em>you.</em></h4>
              <p>
                Your request is in. I&apos;ll be in touch at{" "}
                <strong className="confirm-email">{state.email}</strong> within
                24 hours with a time and a confirmation.
              </p>
              <Button variant="outline" className="btn" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <form action={action} className="contact-form">
              <div>
                <div className="eyebrow eyebrow-warm">Booking request · N° 01</div>
                <h4>A few <em>details.</em></h4>
              </div>

              {state.status === "failure" && (
                <p className="form-error-msg">{state.message}</p>
              )}

              <div className="form-grid">
                {FIELDS.map((field) => (
                  <div key={field.name} className={`field${field.className ? ` ${field.className}` : ""}`}>
                    <Label htmlFor={field.id}>{field.label}</Label>

                    {field.kind === "input" && (
                      <Input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        required={field.required}
                      />
                    )}

                    {field.kind === "select" && (
                      <>
                        <input type="hidden" name={field.name} value={selectValue} />
                        <Select
                          value={selectValue}
                          onValueChange={setSelectValue}
                          defaultValue={servicePreset || `${SERVICES[0].name} ${SERVICES[0].italic}`}
                        >
                          <SelectTrigger id={field.id}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICES.map((s) => (
                              <SelectItem key={s.id} value={`${s.name} ${s.italic}`}>
                                {s.name} {s.italic}
                              </SelectItem>
                            ))}
                            <SelectItem value="Not sure, I'd like a consultation">
                              Not sure, I&apos;d like a consultation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}

                    {field.kind === "textarea" && (
                      <Textarea
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                      />
                    )}

                    {errors[field.name] && (
                      <span className="field-error">{errors[field.name]}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <small>I&apos;ll respond within 24 hours · personally</small>
                <Button type="submit" className="btn primary" disabled={pending}>
                  {pending ? "Sending…" : "Send request →"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
