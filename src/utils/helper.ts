import { Call, Groups, ICallFilter } from 'types'

export function groupByDate (calls: Call[]) {
  const groups: Groups<Call> = {};

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

export function applyFilters (calls: Call[], filters: ICallFilter) {
  console.log('applyFilters -----------------------');
  console.log('calls', calls);
  console.log('filters', filters);

  let result = calls.filter(call => (filters.callType.length === 0 || call.call_type === filters.callType));

  console.log('result', result);

  return result;
}
