import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

export interface ModelSetting {
  model: string;
  temperature: number;
  maxTokens: number;
}

export const ModelSettingContext = createContext<{
  value?: ModelSetting;
  setValue: React.Dispatch<React.SetStateAction<ModelSetting | undefined>>;
  remove: () => void;
}>({
  value: {
    model: 'claude-instant-v1',
    temperature: 0.7,
    maxTokens: 400,
  },
  setValue: () => {},
  remove: () => {},
});

export const ModelSettingProvider = ({children}: { children: React.ReactNode}) => {
  const [value, setValue, remove] = useLocalStorage<ModelSetting>('ec-model-setting');

  return (
    <ModelSettingContext.Provider value={{
      value,
      setValue,
      remove,
    }}>
      {children}
    </ModelSettingContext.Provider>
  )
}

export const useModelSetting = () => {
  return useContext(ModelSettingContext);
}
