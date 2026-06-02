import React, { createContext, useContext, useState } from 'react';
import type { Category } from '../data/competitorData';

const ALL_CATEGORIES: Category[] = [
  'Ecosystem Utilities',
  'Mass Market AI',
  'Creator Platforms',
  'Professional Tools',
  'Other',
];

interface FilterContextValue {
  activeCategories: Category[];
  toggleCategory: (cat: Category) => void;
  allCategories: Category[];
}

const FilterContext = createContext<FilterContextValue>({
  activeCategories: ALL_CATEGORIES,
  toggleCategory: () => {},
  allCategories: ALL_CATEGORIES,
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [activeCategories, setActiveCategories] = useState<Category[]>(ALL_CATEGORIES);

  function toggleCategory(cat: Category) {
    setActiveCategories(prev =>
      prev.includes(cat)
        ? prev.length === 1 ? prev : prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  }

  return (
    <FilterContext.Provider value={{ activeCategories, toggleCategory, allCategories: ALL_CATEGORIES }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
