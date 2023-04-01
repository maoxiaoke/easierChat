import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

export const OpenaiKeyContext = createContext<{
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  remove: () => void;
}>({
  value: '',
  setValue: () => {},
  remove: () => {},
});

export const OpenaiKeyProvider = ({children}: { children: React.ReactNode}) => {
  const [value, setValue, remove] = useLocalStorage<string>('ec-openai-key');

  return (
    <OpenaiKeyContext.Provider value={{
      value,
      setValue,
      remove,
    }}>
      {children}
    </OpenaiKeyContext.Provider>
  )
}

export const useOpenaiKey = () => {
  return useContext(OpenaiKeyContext);
}
