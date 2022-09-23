import React from "react";
import { MouseEventHandler, useCallback, useState } from "react";

const App = () => {
  return (
    <>
      <div>Note: Watch console log entries for render messages</div>
      <NonMemoApp />
      <MemoApp />
    </>
  );
};

const NonMemoApp = () => {
  console.log("non-memo counter rendered");
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  return (
    <>
      <div>Non-Memo</div>
      <div>CountOne: {countOne}</div>
      <div>CountTwo: {countTwo}</div>
      <div>
        <Button
          handleClick={() => setCountOne(countOne + 1)}
          name="non-memo button1"
        />
        <Button
          handleClick={() => setCountTwo(countTwo + 1)}
          name="non-memo button2"
        />
      </div>
    </>
  );
};

type ButtonProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  name: string;
};

const Button = ({ handleClick, name }: ButtonProps) => {
  console.log(`${name} rendered`);
  return <button onClick={handleClick}>{name}</button>;
};

// TODO: Why is React.memo() here necessary when we already use useCallback hook.
const MemoButton = React.memo(({ handleClick, name }: ButtonProps) => {
  console.log(`${name} rendered`);
  return <button onClick={handleClick}>{name}</button>;
});

const MemoApp = () => {
  console.log("memo counter rendered");
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const memoizedSetCountOne = useCallback(
    () => setCountOne(countOne + 1),
    [countOne]
  );
  const memoizedSetCountTwo = useCallback(
    () => setCountTwo(countTwo + 1),
    [countTwo]
  );
  return (
    <>
      <div>Memo</div>
      <div>CountOne: {countOne}</div>
      <div>CountTwo: {countTwo}</div>
      <div>
        <MemoButton handleClick={memoizedSetCountOne} name="memo button1" />
        <MemoButton handleClick={memoizedSetCountTwo} name="memo button2" />
      </div>
    </>
  );
};

export default App;
