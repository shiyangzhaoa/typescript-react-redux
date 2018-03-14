import * as React from 'react';

interface Props {
  state: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default function Hello(
  { state = false, onIncrement, onDecrement }: Props
) {
  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + state}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}