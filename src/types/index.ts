export type User = {
  id: string,
  username: string
};

export type Note = {
  id: string,
  content: string,
};

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
export type Pagination = { offset: number, limit: number, hasNextPage: boolean, totalCount: number };