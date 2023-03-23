import * as _ from 'lodash';

export const invertObject = <
  TKey extends number | string,
  TValue extends string | number,
>(
  obj: Record<TKey, TValue>,
): Record<TValue, TKey> => {
  return _.invert(obj) as any as Record<TValue, TKey>;
};
