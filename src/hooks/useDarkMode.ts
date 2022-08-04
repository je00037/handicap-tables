import { Dispatch, SetStateAction, useState, useEffect } from 'react';

export function useDarkMode(): readonly [
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  // FIX THE FLASH WHEN THIS IS INITALISED TO TRUE
  const [isEnabled, setIsEnabled] = useState(false);
  const nextValue = isEnabled ? false : true;

  useEffect(() => {
    const root = window.document.documentElement;
    isEnabled ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isEnabled]);

  return [nextValue, setIsEnabled] as const;
}
