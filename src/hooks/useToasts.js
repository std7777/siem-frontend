import { useState, useCallback } from "react";
import { uid } from "../data/utils";

// ─── useToasts ────────────────────────────────────────────────────────────────
// Manages temporary notification toasts shown in the bottom-right corner.
export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, icon = "⚡") => {
    const id = uid();
    setToasts(t => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  return { toasts, push };
}
