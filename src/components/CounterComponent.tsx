import { memo, useCallback, useState } from "react";

const Button = memo(
  ({
    onClick,
    label,
    disabled,
  }: {
    onClick: () => void;
    label: string;
    disabled: boolean;
  }) => {
    console.log("Button render:", label);
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {label}
      </button>
    );
  }
);

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const isMin = count === 0;
  const isMax = count === 10;

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <div>CounterComponent</div>
      <Button onClick={decrement} disabled={isMin} label="-" />
      <h1 style={{ width: 80 }}>{count}</h1>
      <Button onClick={increment} disabled={isMax} label="+" />
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default CounterComponent;
