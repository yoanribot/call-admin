import React from 'react';
import { User } from 'types';

export interface UserContext {
  user: User | undefined,
  isAuth: boolean,
  login: () => void,
}

export const Context = React.createContext<UserContext>({
    user: undefined,
    isAuth: false,
    login: () => {}
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;