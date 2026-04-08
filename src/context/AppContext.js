import { createContext } from "react";

export const AlertContext = createContext({ alerts: [], dispatch: () => {} });
export const RulesContext = createContext({ rules: [], setRules: () => {} });
