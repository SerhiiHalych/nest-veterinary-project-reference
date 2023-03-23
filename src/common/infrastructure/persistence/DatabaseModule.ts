import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BaseToken } from '../../diTokens';
import { AppConfigService } from '../configuration/AppConfigService';
import { GlobalDBContext } from './GlobalDBContext';
import { GlobalReadDBContext } from './GlobalReadDBContext';

const constructTypeOrmConfiguration = (
  appConfigService: AppConfigService,
): DataSourceOptions => {
  const distPath = join(__dirname, '../../../');

  return {
    type: 'mssql',
    host: appConfigService.database.HOST,
    port: appConfigService.database.PORT,
    username: appConfigService.database.USER,
    password: appConfigService.database.PASSWORD,
    database: appConfigService.database.NAME,
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    entities: [join(distPath, '**', '*Entity{.ts,.js}')],
    migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
    logging: ['error', 'migration'],
    options: {
      encrypt: true,
      packetSize: 32768,
    },
  };
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return constructTypeOrmConfiguration(appConfigService);
      },
    }),
  ],
  providers: [
    {
      inject: [AppConfigService],
      provide: BaseToken.DATA_SOURCE,
      useFactory: (appConfigService: AppConfigService) => {
        const dataSource = new DataSource(
          constructTypeOrmConfiguration(appConfigService),
        );

        return dataSource.initialize();
      },
    },

    {
      provide: BaseToken.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
    {
      provide: BaseToken.GLOBAL_READ_DB_CONTEXT,
      useClass: GlobalReadDBContext,
    },
  ],
  exports: [BaseToken.GLOBAL_DB_CONTEXT, BaseToken.GLOBAL_READ_DB_CONTEXT],
})
export class DatabaseModule {}
