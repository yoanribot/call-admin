import React from 'react';
import { Call } from 'types';

export interface CallContext {
  calls: Call[],
  currentCall: Call | undefined,
  getCall: (id: string) => void,
  getCalls: () => void,
}


export const Context = React.createContext<CallContext>({
  currentCall: undefined,
  calls: [],
  getCall: () => {},
  getCalls: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;