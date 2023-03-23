import { createObjectSchema } from '../validation/joi/createObjectSchema';
import { extendedJoi } from '../validation/joi/extendedJoi';
import { AppConfigs } from './AppConfigs';

export const appConfigValidationSchema = createObjectSchema<AppConfigs>({
  API_PORT: extendedJoi.number().positive(),
  DB_HOST: extendedJoi.string().min(1),
  DB_NAME: extendedJoi.string().min(1),
  DB_PASSWORD: extendedJoi.string().min(1),
  DB_PORT: extendedJoi.number().positive(),
  DB_USER: extendedJoi.string().min(1),
});
