import { useLayoutEffect } from "react";
import create, { UseStore } from "zustand";
import createConext from "zustand/context";
import { combine } from "zustand/middleware";
import shallow from "zustand/shallow";

import { IAddress } from "../";

let store: any;
type InitialState = typeof initialState;
type UseStoreType = ReturnType<typeof initializeStore>;
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseStore<infer T>
  ? T
  : never;

const initialState = {
  allData: new Array<IAddress>(),
  filteredData: new Array<IAddress>(),
  mapFilter: new Array<IAddress>(),
  panelPoints: new Array<IAddress>(),
  searchQuery: "",
  grouping: "",
  panelOpen: false,
  mapFocus: [22.28020088065716, 114.155015444211, 0] as [
    number,
    number,
    number
  ],
  baseMap: false,
  checkedYear: new Set<number>(),
  checkedBusiness: new Set<string>(),
};

const zustandContext = createConext<UseStoreState>();
export const Provider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

const initializeStore = (preloadedState = {}) => {
  return create(
    combine({ ...initialState, ...preloadedState }, (set, get) => ({
      updateFilter: (newFilter: IAddress[]) => {
        set({ mapFilter: newFilter });
      },
      updateSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },
      updatePanelPoint: (points: IAddress[]) => {
        set({ panelPoints: points });
      },
      updateGrouping: (group: string) => {
        set({ grouping: group });
      },
      updatePanelOpen: (open: boolean) => {
        set({ panelOpen: open });
      },
      updateMapFocus: (latlng: [number, number, number]) => {
        set({ mapFocus: latlng });
      },
      updateBaseMap: () => {
        set({ baseMap: !get().baseMap });
      },
      updateCheckedYear: (checked: Set<number>) => {
        set({ checkedYear: checked });
      },
      updateFilteredData: (data: IAddress[]) => {
        set({ filteredData: data });
      },
      updateCheckedBusiness: (checked: Set<string>) => {
        set({ checkedBusiness: checked });
      },
    }))
  );
};

export function useHydrate(initialState: InitialState) {
  let _store: UseStoreType = store ?? initializeStore(initialState);

  // For SSR & SSG, always use a new store.
  if (typeof window !== "undefined") {
    // For CSR, always re-use same store.
    if (!store) {
      store = _store;
    }

    // And if initialState changes, then merge states in the next render cycle.
    //
    // eslint complaining "React Hooks must be called in the exact same order in every component render"
    // is ignorable as this code runs in the same order in a given environment (CSR/SSR/SSG)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (initialState && store) {
        store.setState({
          ...store.getState(),
          ...initialState,
        });
      }
    }, [initialState]);
  }

  return _store;
}

export const useMyStore = () => {
  return useStore((state) => state, shallow);
};
