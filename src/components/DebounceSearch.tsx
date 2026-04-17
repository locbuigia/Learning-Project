import React, { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DebounceSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    debounceValue.length > 0 &&
      console.log("Fetch API with search term:", debounceValue);
  }, [debounceValue]);

  const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>DebounceSearch</div>
      <input type="text" value={searchTerm} onChange={handleTextChanged} />
      <h2>Search term: {debounceValue}</h2>
    </>
  );
};

export default DebounceSearch;
