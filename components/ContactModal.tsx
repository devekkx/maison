"use client";

import { SERVICES } from "@/lib/data";
import { STUDIO_INFO } from "@/lib/studio-data";
import { useContactForm } from "@/hooks/useContactForm";
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
  { kind: "input", name: "phone", id: "m-phone", label: "Phone (optional)", type: "tel", placeholder: "+233 20 000 0000", autoComplete: "tel" },
  { kind: "input", name: "date", id: "m-date", label: "Preferred date", type: "date" },
  { kind: "select", name: "service", id: "m-service", label: "Service", className: "full" },
  { kind: "textarea", name: "notes", id: "m-notes", label: "Notes (hair length, references, anything I should know)", placeholder: "Currently shoulder-length, last colored in February…", className: "full" },
];

export default function ContactModal() {
  const { open, setOpen, selectValue, setSelectValue, state, action, pending, errors } = useContactForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="modal" aria-describedby="modal-desc">
        <DialogTitle className="sr-only">Reserve a chair</DialogTitle>
        <DialogDescription id="modal-desc" className="sr-only">
          Fill in your details and we&apos;ll confirm a time within 24 hours.
        </DialogDescription>

        <aside className="modal-aside">
          <div className="eyebrow eyebrow-warm">{STUDIO_INFO.name} · Reservations</div>
          <div>
            <h3>Reserve a <em>chair.</em></h3>
            <p>
              Tell me a little about what you&apos;d like done. I&apos;ll write
              back within 24 hours with two or three time options that fit.
            </p>
          </div>
          <div className="meta">
            <div>Stylist <span>{STUDIO_INFO.stylist}</span></div>
            <div>Studio <span>{STUDIO_INFO.address.short}, {STUDIO_INFO.address.city}</span></div>
            <div>Hours <span>{STUDIO_INFO.hours.display}</span></div>
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
                <p className="form-error-msg" role="alert">{state.message}</p>
              )}

              <div className="form-grid">
                {FIELDS.map((field) => {
                  const errorId = `${field.id}-error`;
                  const hasError = !!errors[field.name];
                  return (
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
                          aria-invalid={hasError}
                          aria-describedby={hasError ? errorId : undefined}
                        />
                      )}

                      {field.kind === "select" && (
                        <>
                          <input type="hidden" name={field.name} value={selectValue} />
                          <Select
                            value={selectValue}
                            onValueChange={setSelectValue}
                            defaultValue={`${SERVICES[0].name} ${SERVICES[0].italic}`}
                          >
                            <SelectTrigger id={field.id} aria-invalid={hasError} aria-describedby={hasError ? errorId : undefined}>
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
                          aria-invalid={hasError}
                          aria-describedby={hasError ? errorId : undefined}
                        />
                      )}

                      {hasError && (
                        <span id={errorId} className="field-error" role="alert">
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="form-actions">
                <small>I&apos;ll respond within 24 hours · personally</small>
                <Button type="submit" className="btn primary" disabled={pending} aria-busy={pending} aria-live="polite">
                  {pending ? "Sending…" : "Send request →"}
                </Button>
              </div>
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {pending ? "Sending your booking request, please wait." : ""}
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
