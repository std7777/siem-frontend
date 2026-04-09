import { useState, useCallback } from "react";
import { uid } from "../data/utils";

function rmToast(ts, id) {
  return ts.filter((t) => t.id !== id);
}

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg) => {
    const id = uid();

    setToasts((currentToasts) => {
      const next = [...currentToasts, { id, msg }];
      return next;
    });

    setTimeout(() => {
      setToasts((currentToasts) => rmToast(currentToasts, id));
    }, 3500);
  }, []);

  return { toasts, push };
}
