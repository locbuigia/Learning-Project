import { useEffect, useRef, useState } from "react";

const useThrottle = (value: string, limit: number) => {
  const [throttleValue, setThrottleValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastExecuted.current >= limit) {
        setThrottleValue(value);
        lastExecuted.current = Date.now();
      }
    }, limit - (Date.now() - lastExecuted.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttleValue;
};

const ThrottleSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const throttleSearch = useThrottle(searchTerm, 2000);

  useEffect(() => {
    throttleSearch.length > 0 &&
      console.log("Fetch API with Search Term:", throttleSearch);
  }, [throttleSearch]);

  const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>ThrottleSearch</div>
      <input type="text" value={searchTerm} onChange={handleTextChanged} />
      <h2>Search term: {throttleSearch}</h2>
    </>
  );
};

export default ThrottleSearch;
