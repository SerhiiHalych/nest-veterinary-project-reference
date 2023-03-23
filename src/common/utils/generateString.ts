import { randomBytes } from 'crypto';

export const generateString = (length: number) =>
  randomBytes(Math.floor(length / 2)).toString('hex');
