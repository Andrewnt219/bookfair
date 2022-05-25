import { useState } from 'react';

export const useToggle = <T extends string>(keys: T[]) => {
  const [toggleIndex, setToggleIndex] = useState(0);

  const toggle = () =>
    setToggleIndex((index) => (index === keys.length - 1 ? 0 : index + 1));
  const currentKey = keys[toggleIndex];

  return { currentKey, toggle };
};
