declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export function gtmEvent(event: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
