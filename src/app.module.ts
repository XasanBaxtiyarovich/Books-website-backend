import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PersonsModule } from './persons/persons.module';

import { Person } from './persons/entities';
import { Category } from './categories/entities';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    
    ServeStaticModule.forRoot(
      {
        rootPath: resolve(__dirname, 'static')
      }
    ),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ Person, Category, Book ],
      synchronize: true,
    }),

    PersonsModule,

    CategoriesModule,

    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
