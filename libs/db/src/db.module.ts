import { DynamicModule, Module, Provider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
// import { DbService } from './db.service';

type ClassType = { new (...args: any[]): any };

@Module({})
export class DbModule {
  static forRoot(envKey: string, options = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DB_CONNECTION',
        useFactory: () => mongoose.connect(envKey, options),
      },
    ];
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
  static forFeature(models: ClassType[]): DynamicModule {
    const providers: Provider[] = models.map((model) => ({
      provide: model.name,
      useFactory: () => getModelForClass(model),
    }));
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
