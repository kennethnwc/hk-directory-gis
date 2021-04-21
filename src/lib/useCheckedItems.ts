import { useEffect, useState } from "react";

import { getDataToDisplay } from "./getDataToDisplay";
import { useMyStore } from "./store";

export const useCheckedItems = () => {
  const { mapFilter, allData, searchQuery } = useMyStore();
  const data = getDataToDisplay({ mapFilter, allData, searchQuery });

  // const yearInit = new Set([1900]);
  const yearInit = new Set(data.map(({ year }) => year));

  const [checkedItems, setCheckedItems] = useState<
    Record<"year" | "business", Set<any>>
  >({
    year: yearInit,
    business: new Set(
      new Set(
        data.flatMap((item) => item.categories).map(({ category }) => category)
      )
    ),
  });

  const handleChecked = (
    field: "year" | "business",
    value: string | number
  ) => {
    if (field === "business") {
      const newSet = new Set(checkedItems["business"]);
      if (newSet.has(value)) {
        newSet.delete(value);
        setCheckedItems((prev) => {
          const year = prev.business.size > 0 ? new Set(prev.year) : new Set();
          return {
            business: newSet,
            year,
          };
        });
      } else {
        newSet.add(value);
        setCheckedItems((prev) => {
          return {
            ...prev,
            business: newSet,
          };
        });
      }
    }

    if (field === "year") {
      const newSet = new Set(checkedItems["year"]);
      if (newSet.has(value)) {
        newSet.delete(value);
        setCheckedItems((prev) => {
          const business = newSet.size > 0 ? new Set(prev.business) : new Set();
          return {
            year: newSet,
            business,
          };
        });
      } else {
        newSet.add(value);
        setCheckedItems((prev) => {
          return {
            ...prev,
            year: newSet,
          };
        });
      }
    }
  };

  useEffect(() => {
    setCheckedItems(() => ({
      // year: new Set(data.map(({ year }) => year)),
      year: yearInit,
      business: new Set(
        new Set(
          data
            .flatMap((item) => item.categories)
            .map(({ category }) => category)
        )
      ),
    }));
  }, [mapFilter, searchQuery]);

  return { checkedItems, handleChecked, setCheckedItems };
};
