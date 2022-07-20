import { createContext, useContext, useMemo, ReactNode } from 'react';
import { DbViolation } from '../types';
type ViolationContext = { violation: DbViolation };
const ViolationContext = createContext<ViolationContext | undefined>(undefined);

type ProviderProps = {
  children: ReactNode | ReactNode[];
  violation: DbViolation;
};
export const ViolationProvider = (props: ProviderProps) => {
  const value: ViolationContext = useMemo(() => {
    return {
      violation: props.violation,
    };
  }, [props.violation]);
  return (
    <ViolationContext.Provider value={value}>
      {props.children}
    </ViolationContext.Provider>
  );
};

export const useViolationContext = (): ViolationContext => {
  const context = useContext(ViolationContext);

  if (context === undefined) {
    throw new Error('Must be use within ViolationContext');
  }

  return context;
};
