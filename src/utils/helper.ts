import { Call, CallGroups } from 'types'

export function groupByDate (calls: Call[]) {
  const groups: CallGroups<Call> = {};

  for (const item of calls) {
    const key = new Date(item.created_at).toDateString();

    if (groups[key]) {
      groups[key].push(item);
    } else {
      groups[key] = [item];
    }
  }

  return groups;
};
