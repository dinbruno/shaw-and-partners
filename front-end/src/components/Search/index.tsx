import React, { useState, useEffect } from "react";
import { useCsvData } from "@/context/CsvContext";

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const { searchCsvData, loading, error } = useCsvData();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input) {
        searchCsvData(input);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input, searchCsvData]);

  return (
      <input
        type="text"
        placeholder="Search..."
        id="search-field"
        className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />

  );
};

export default SearchComponent;
