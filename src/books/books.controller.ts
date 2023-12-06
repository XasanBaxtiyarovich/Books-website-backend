import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Create Book
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createBOOK(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.booksService.createBOOK(createBookDto, image);
  }

  // Find All Books
  @Get('find')
  findAllBOOK(): Promise<Object> {
    return this.booksService.findAllBOOK();
  }

  // Find By ID Book
  @Get('find.BY-id/:id')
  findOneBOOK(
    @Param('id') id: string
  ): Promise<Object> {
    return this.booksService.findOneBOOK(+id);
  }

  // Find By Name Book
  @Get('find.BY-name/:name')
  findOneName(
    @Param('name') name: string
  ): Promise<Object> {
    return this.booksService.findNameBOOK(name);
  }

  // Update BY ID, One Book
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateBOOK(
    @Param('id') id: string, 
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.booksService.updateBOOK(+id, updateBookDto, image);
  }

  // Remove BY ID, One Book
  @Delete('delete/:id')
  removeBOOK(
    @Param('id') id: string
  ): Promise<Number | Object> {
    return this.booksService.removeBOOK(+id);
  }
}
