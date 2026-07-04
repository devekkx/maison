export interface ContactPrefill {
  /** Pre-select this service in the booking form dropdown. */
  service?: string;
}

/**
 * Dispatches the `open-contact` custom event to open the booking modal.
 * Pass a `prefill` object to pre-select a service in the form.
 */
export function openContact(prefill?: ContactPrefill): void {
  window.dispatchEvent(
    new CustomEvent("open-contact", { detail: prefill ?? {} })
  );
}
