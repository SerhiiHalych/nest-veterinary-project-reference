import _ from 'lodash';

export const createGroupHashMap = <TArrayElement>(
  array: TArrayElement[],
  iteratee: _.ValueIterateeCustom<TArrayElement, string | number | symbol>,
): GroupHashMap<TArrayElement> =>
  new GroupHashMap(
    _(array)
      .groupBy(iteratee)
      .mapValues((data) => data)
      .value(),
  );

export class GroupHashMap<TElement> {
  private _hashMap: { [x: string]: TElement[] };

  constructor(hashMap: { [x: string]: TElement[] }) {
    this._hashMap = hashMap;
  }

  public get(key: string): TElement[] {
    return this._hashMap[key] ?? [];
  }
}
