"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: (searchTerm: string) => { console.log("Yo: " + searchTerm); },
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
