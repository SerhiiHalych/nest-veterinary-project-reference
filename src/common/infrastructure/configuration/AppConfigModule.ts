import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './AppConfigService';
import { appConfigValidationSchema } from './appConfigValidationSchema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: appConfigValidationSchema,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
