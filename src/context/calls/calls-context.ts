import React from 'react';
import { Call, Pagination } from 'types';

export interface CallContext {
  currentCall: Call | undefined,
  calls: Call[],
  pagination: Pagination,
  updatePagination: (page: number) => void,
  getCall: (id: string) => void,
  getCalls: () => void,
}


export const Context = React.createContext<CallContext>({
  currentCall: undefined,
  calls: [],
  pagination: {
    currentPage: 0,
    pageLimit: 10,
    hasNextPage: false,
    totalCount: 0,
  },
  updatePagination: () => {},
  getCall: () => {},
  getCalls: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;