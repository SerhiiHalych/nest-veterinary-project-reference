export const hrtimeToMs = ([seconds, nanoseconds]: [number, number]): number =>
  (seconds * 1000000000 + nanoseconds) / 1000000;
