import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Book } from './entities';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)private bookRepository: Repository<Book>,
    private fileService: FilesService
  ){}

  async createBOOK(createBookDto: CreateBookDto, image: any): Promise<Object> {
    const [ book ] = await this.bookRepository.findBy({ name: createBookDto.name, author: createBookDto.author });
    if (book) return {
                      message: 'This book already exists',
                      status: HttpStatus.CONFLICT
                     };

    const file = await this.fileService.createFile(image);

    const newBook = await this.bookRepository.save(
      {
        ...createBookDto,
        img_url: file
      }
    );

    return {
            message: 'Create successfully',
            book: newBook,
            status: HttpStatus.OK
           };
  }

  async findAllBOOK(): Promise<Object> {
    const books = await this.bookRepository.find();

    if(books.length === 0) return {
                                    message: 'Books Not Found',
                                    status: HttpStatus.NOT_FOUND
                                  };
    return {
            books,
            status: HttpStatus.OK
           };
  }

  async findOneBOOK(id: number): Promise<Object> {
    const [ book ] = await this.bookRepository.findBy({ book_id: id });
    if (!book) return {
                        message: 'Book Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    return {
            book,
            status: HttpStatus.OK
           };
  }

  async findNameBOOK(name: string): Promise<Object> {
    const [ book ] = await this.bookRepository.findBy({ name: name });
    if (!book) return {
                        message: 'Book Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    return {
            book,
            status: HttpStatus.OK
           };
  }

  async updateBOOK(id: number, updateBookDto: UpdateBookDto, image: any): Promise<Object> {
    const [ book ] = await this.bookRepository.findBy({ book_id: id });
    if (!book) return {
                        message: 'Book Not Found',
                        status: HttpStatus.NOT_FOUND
                      };

    const file = await this.fileService.createFile(image);
    
    await this.bookRepository.update(
      { 
        book_id: id
      },
      {
        ...updateBookDto,
        img_url: file
      }
    );

    const [ updateBook ] =  await this.bookRepository.findBy({ book_id: id });

    return {
            book: updateBook,
            status: HttpStatus.OK
           };
  }

  async removeBOOK(id: number): Promise<HttpStatus | Object> {
    const [ book ] = await this.bookRepository.findBy({ book_id: id });
    if (!book) return {
                        message: 'Book Not Found',
                        status: HttpStatus.NOT_FOUND
                      };

    await this.bookRepository.delete({ book_id: id });

    return HttpStatus.OK;
  }
}