export interface ContactPrefill {
  service?: string;
}

export function openContact(prefill?: ContactPrefill): void {
  window.dispatchEvent(
    new CustomEvent("open-contact", { detail: prefill ?? {} })
  );
}
