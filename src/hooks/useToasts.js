import { useState, useCallback } from "react";
import { uid } from "../data/utils";

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg) => {
    const id = uid();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  return { toasts, push };
}

