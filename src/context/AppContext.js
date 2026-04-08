import { createContext } from "react";

export const ThemeContext = createContext({ theme: "dark", toggle: () => {} });
export const AlertContext = createContext({ alerts: [], dispatch: () => {} });
