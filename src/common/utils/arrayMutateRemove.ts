export const arrayMutateRemove = <TArrayElement>(
  array: TArrayElement[],
  predicate: (element: TArrayElement, index?: number) => boolean,
): TArrayElement[] =>
  array.reduce(
    (acc, currentElement, index) =>
      predicate(currentElement, index)
        ? [...acc, array.splice(index, 1)[0]]
        : acc,
    [] as TArrayElement[],
  );
