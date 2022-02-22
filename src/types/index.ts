export type User = {
  id: string,
  username: string
};

export type Note = {
  id: string,
  content: string,
};

export type CallGroups<T> = {
  [key: string]: T[],
}

export type Call = {
  id: string,
  direction: string,
  from: string,
  to: string,
  duration: number,
  is_archived: boolean,
  call_type: string,
  via: string,
  created_at: string,
  notes: Note[],
};

export type Secret = { access_token: string, refresh_token: string };
export type Pagination = { currentPage: number, pageLimit: number, hasNextPage: boolean, totalCount: number };