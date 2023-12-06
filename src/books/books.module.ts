import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Book
      ]
    ),
    FilesModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}