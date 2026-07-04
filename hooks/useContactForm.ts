"use client";

import { useState, useCallback, useEffect, useActionState } from "react";
import { SERVICES } from "@/lib/data";
import { submitContact, type ContactFormState } from "@/app/actions/contact";

const INITIAL_STATE: ContactFormState = { status: "idle" };

interface UseContactFormReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectValue: string;
  setSelectValue: (value: string) => void;
  state: ContactFormState;
  action: (payload: FormData) => void;
  pending: boolean;
  errors: Record<string, string>;
}

export function useContactForm(): UseContactFormReturn {
  const [open, setOpen] = useState(false);
  const [servicePreset, setServicePreset] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [state, action, pending] = useActionState(submitContact, INITIAL_STATE);

  const onOpen = useCallback((e: Event) => {
    const detail = (e as CustomEvent<{ service?: string }>).detail;
    const preset = detail?.service ?? "";
    setServicePreset(preset);
    setSelectValue(preset || `${SERVICES[0].name} ${SERVICES[0].italic}`);
    setOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener("open-contact", onOpen);
    return () => window.removeEventListener("open-contact", onOpen);
  }, [onOpen]);

  void servicePreset;

  const errors = state.status === "error" ? state.errors : ({} as Record<string, string>);

  return { open, setOpen, selectValue, setSelectValue, state, action, pending, errors };
}
