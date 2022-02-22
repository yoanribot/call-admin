import React from 'react';
import { Call, Pagination } from 'types';

export interface CallContext {
  currentCall: Call | undefined,
  calls: Call[],
  pagination: Pagination,
  updatePagination: (page: number) => void,
  getCall: (id: string) => void,
  getCalls: () => void,
  archive: (callIds: string[]) => void,
  addNote: (callId: string, text: string) => void,
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
  archive: () => {},
  addNote: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;