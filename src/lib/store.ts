import { useMemo } from "react";
import create from "zustand";
import shallow from "zustand/shallow";

import { IAddress } from "../";
import { useStore } from "./zustandProvider";

let store: ZustandStore;

export type ZustandStore = ReturnType<typeof initStore> | undefined;

export type ZustandState = {
  allData: IAddress[];
  filteredData: IAddress[];
  mapFilter: IAddress[];
  panelPoints: IAddress[];
  searchQuery: string;
  grouping: string;
  panelOpen: boolean;
  mapFocus: [number, number, number];
  baseMap: boolean;
  checkedYear: Set<number>;
  checkedBusiness: Set<string>;
} & {
  updateFilter: (newFilter: IAddress[]) => void;
  updateSearchQuery: (query: string) => void;
  updatePanelPoint: (points: IAddress[]) => void;
  updateGrouping: (group: string) => void;
  updatePanelOpne: (open: boolean) => void;
  updateMapFocus: (latlng: [number, number, number]) => void;
  updateBaseMap: () => void;
  updateCheckedYear: (checked: Set<number>) => void;
  updateCheckedBusiness: (checked: Set<string>) => void;
  updateFilteredData: (data: IAddress[]) => void;
};

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

const initStore = (preloadedState = initialState) => {
  return create<ZustandState>((set, get) => ({
    ...initialState,
    ...preloadedState,
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
    updatePanelOpne: (open: boolean) => {
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
  }));
};

export const initializeStore = (preloadedState: ZustandState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Zustand state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useHydrate(initialState: ZustandState) {
  const state =
    typeof initialState === "string"
      ? (JSON.parse(initialState) as ZustandState)
      : initialState;
  const store = useMemo(() => initializeStore(state), [state]);
  return store;
}

export const useMyStore = () => {
  const {
    allData,
    panelPoints,
    updateGrouping,
    grouping,
    panelOpen,
    updatePanelOpne,
    mapFilter,
    searchQuery,
    updateFilter,
    updatePanelPoint,
    updateSearchQuery,
    mapFocus,
    updateMapFocus,
    baseMap,
    updateBaseMap,
    checkedYear,
    updateCheckedYear,
    checkedBusiness,
    updateCheckedBusiness,
    filteredData,
    updateFilteredData,
  } = useStore(
    (state) => ({
      allData: state.allData,
      mapFilter: state.mapFilter,
      searchQuery: state.searchQuery,
      panelPoints: state.panelPoints,
      updateGrouping: state.updateGrouping,
      grouping: state.grouping,
      panelOpen: state.panelOpen,
      updatePanelOpne: state.updatePanelOpne,
      updateFilter: state.updateFilter,
      updatePanelPoint: state.updatePanelPoint,
      updateSearchQuery: state.updateSearchQuery,
      mapFocus: state.mapFocus,
      updateMapFocus: state.updateMapFocus,
      baseMap: state.baseMap,
      updateBaseMap: state.updateBaseMap,
      checkedYear: state.checkedYear,
      updateCheckedYear: state.updateCheckedYear,
      checkedBusiness: state.checkedBusiness,
      updateCheckedBusiness: state.updateCheckedBusiness,
      filteredData: state.filteredData,
      updateFilteredData: state.updateFilteredData,
    }),
    shallow
  );

  return {
    allData: allData!,
    panelPoints: panelPoints!,
    updateGrouping: updateGrouping!,
    grouping: grouping!,
    panelOpen: panelOpen!,
    updatePanelOpen: updatePanelOpne!,
    mapFilter: mapFilter!,
    searchQuery: searchQuery!,
    updateFilter: updateFilter!,
    updatePanelPoint: updatePanelPoint!,
    updateSearchQuery: updateSearchQuery!,
    mapFocus: mapFocus!,
    updateMapFocus: updateMapFocus!,
    baseMap: baseMap!,
    updateBaseMap: updateBaseMap!,
    checkedYear: checkedYear!,
    updateCheckedYear: updateCheckedYear!,
    checkedBusiness: checkedBusiness!,
    updateCheckedBusiness: updateCheckedBusiness!,
    filteredData: filteredData!,
    updateFilteredData: updateFilteredData!,
  };
};
