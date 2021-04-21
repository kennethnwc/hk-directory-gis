import { createContext, useContext } from "react";

import { ZustandState, ZustandStore } from "./store";

export const StoreContext = createContext<ZustandStore>(undefined);

export const StoreProvider: React.FC<{ store: ZustandStore }> = ({
  children,
  store,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = (
  selector: (state: Partial<ZustandState>) => Partial<ZustandState>,
  eqFn: any
) => {
  const store = useContext(StoreContext)!;
  const values = store(selector, eqFn);

  return values;
};
