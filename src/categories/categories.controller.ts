import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';


@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create Category
  @Post('create')
  createCATEGORY(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Object> {
    return this.categoriesService.createCATEGORY(createCategoryDto);
  }

  // Find All Categories
  @Get('findall')
  findAllCATEGORY(): Promise<Object> {
    return this.categoriesService.findAllCATEGORY();
  }

  // Find One Category
  @Get('find/:id')
  findOneCATEGORY(
    @Param('id') id: string
  ): Promise<Object> {
    return this.categoriesService.findOneCATEGORY(+id);
  }

  // Update One Category
  @Patch('update/:id')
  updateCATEGORY(
    @Param('id') id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Object> {
    return this.categoriesService.updateCATEGORY(+id, updateCategoryDto);
  }

  // Remove One Category
  @Delete('delete/:id')
  removeCATEGORY(
    @Param('id') id: string
  ): Promise<Object> {
    return this.categoriesService.removeCATEGORY(+id);
  }
}