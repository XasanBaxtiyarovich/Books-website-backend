import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category)private categoryRepository: Repository<Category>) {}

  async createCATEGORY(createCategoryDto: CreateCategoryDto): Promise<Object> {
    const [ category ] = await this.categoryRepository.findBy({ category_name: createCategoryDto.category_name });
    if (category) return {
                          message: 'category name already exists',
                          status: HttpStatus.CONFLICT
                         };

    const newCategory = await this.categoryRepository.save(createCategoryDto);
    return {
            category: newCategory,
            status: HttpStatus.OK
           };
  }

  async findAllCATEGORY(): Promise<Object> {
    const categories = await this.categoryRepository.find();

    if (categories.length === 0) return {
                                          message: 'Categories Not Found',
                                          status: HttpStatus.NOT_FOUND
                                        };
    return {
            categories,
            status: HttpStatus.OK
           };
  }

  async findOneCATEGORY(id: number): Promise<Object> {
    const [ category ] = await this.categoryRepository.findBy({ category_id: id });
    if (!category) return {
                            message: 'Category Not Found',
                            status: HttpStatus.NOT_FOUND
                          };
    return {
            category,
            status: HttpStatus.OK
           };
  }

  async updateCATEGORY(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Object> {
    const category = await this.categoryRepository.findBy({ category_id: id });

    if (!category) return {
                            message: 'Categories Not Found',
                            status: HttpStatus.NOT_FOUND
                          };

    await this.categoryRepository.update(
      { 
        category_id: id
      },
      { 
        category_name: updateCategoryDto.category_name
      }
    );

    const [ updateCategory ] = await this.categoryRepository.findBy({ category_id: id });
    return {
            category: updateCategory,
            status: HttpStatus.OK
           };
  }

  async removeCATEGORY(id: number): Promise<Object> {
    const category = await this.categoryRepository.findBy({ category_id: id });

    if (!category) return {
                            message: 'Categories Not Found',
                            status: HttpStatus.NOT_FOUND
                          };

    await this.categoryRepository.delete({ category_id: id });

    return HttpStatus.OK; 
  }
}
