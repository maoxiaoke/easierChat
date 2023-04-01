import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

export const AssistantRoleContext = createContext<{
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  remove: () => void;
}>({
  value: '',
  setValue: () => {},
  remove: () => {},
});

export const AssistantRoleProvider = ({children}: { children: React.ReactNode}) => {
  const [value, setValue, remove] = useLocalStorage<string>('ec-current-role');

  return (
    <AssistantRoleContext.Provider value={{
      value,
      setValue,
      remove,
    }}>
      {children}
    </AssistantRoleContext.Provider>
  )
}

export const useAssistantRole = () => {
  return useContext(AssistantRoleContext);
}
