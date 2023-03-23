import * as _ from 'lodash';

export const createHashMap = <TElement, TKey extends string | number | symbol>(
  array: TElement[],
  iteratee: _.ValueIterateeCustom<TElement, TKey>,
): HashMap<TElement, TKey> =>
  new HashMap(
    _(array)
      .keyBy(iteratee)
      .mapValues((data) => data)
      .value() as { [x in TKey]: TElement },
  );

export class HashMap<TElement, TKey extends string | number | symbol> {
  private _hashMap: { [x in TKey]: TElement };

  constructor(hashMap: { [x in TKey]: TElement }) {
    this._hashMap = hashMap;
  }

  public get(key: TKey): TElement | null {
    return this._hashMap[key] ?? null;
  }

  public getTrust(key: TKey): TElement {
    return this._hashMap[key];
  }
}
