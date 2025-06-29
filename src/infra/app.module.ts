import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env/env';
import { HttpModule } from './http/http.module';
import { EnvModule } from './env/env.module';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
  }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventModule
  ]
})
export class AppModule {}
