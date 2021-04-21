import { IAddress } from "../";

type Params = {
  searchQuery: string;
  mapFilter: IAddress[];
  allData: IAddress[];
};

export const getDataToDisplay = ({
  searchQuery,
  mapFilter,
  allData,
}: Params) => {
  if (!mapFilter || !searchQuery) {
    return allData;
  }

  if (searchQuery && mapFilter.length == 0) {
    return [];
  }
  return mapFilter;
};
