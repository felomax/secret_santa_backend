import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people/people.module';
import { GifModule } from './gif/gif.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:WeBuGbzLQmqUjQmMiyHlnXrxyUezUaCd@postgres.railway.internal:5432/railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      ssl: false,
    }),
    PeopleModule,
    GifModule,
  ],
})
export class AppModule {}
