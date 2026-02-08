import { toast } from "sonner";

/**
 * Opens a URL in a new browser tab using window.open().
 * Falls back to copying the URL to clipboard if popup is blocked.
 */
export function openExternal(url: string, event?: React.MouseEvent): void {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const newWindow = window.open(url, "_blank", "noopener,noreferrer");

  if (!newWindow) {
    // Popup was blocked, copy to clipboard as fallback
    navigator.clipboard.writeText(url).then(() => {
      toast("Link copiado. Ábrelo en una nueva pestaña.", {
        duration: 4000,
      });
    }).catch(() => {
      toast("No se pudo abrir el enlace. Visita: " + url, {
        duration: 6000,
      });
    });
  }
}
