import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

import { PersonsService } from './persons.service';
import { SignInDto, SignUpDto, UpdateDataDto, UpdatePasswordDto } from './dto';

@Controller('')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  // Sign Up
  @Post('register')
  signUP(
    @Body() signUpDto: SignUpDto
  ): Promise<Object> {
    return this.personsService.signUP(signUpDto);
  }

  // Sign In
  @Post('login')
  SignIN(
    @Body() SignInDto: SignInDto
  ): Promise<Object> {
    return this.personsService.signIN(SignInDto)
  }

  // Find All Users
  @Get('find-users')
  findUSERS(): Promise<Object> {
    return this.personsService.findUSERS()
  }

  // Find All Block Users
  @Get('find-block.users')
  findBlockUSERS(): Promise<Object> {
    return this.personsService.findBlockUSERS()
  }

  // Find All Admins
  @Get('find-admins')
  findADMINS(): Promise<Object> {
    return this.personsService.findADMINS()
  }

  // Find BY ID in User
  @Get('find-user/:id')
  findOneUSER(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.findOneUSER(id)
  }

  // Find By ID in Admin
  @Get('find-admin/:id')
  findOneADMIN(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.findOneADMIN(id)
  }

  // Update One Person
  @Put('update/:id')
  updateDATA(
    @Param('id') id: number, 
    @Body() updateDataDto: UpdateDataDto
  ): Promise<Object> {
    return this.personsService.updateDATA(id, updateDataDto)
  }

  // Update One Person Password
  @Put('update-pass/:id')
  updatePASSWORD(
    @Param('id') id: number, 
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<Object> {
    return this.personsService.updatePASSWORD(id, updatePasswordDto);
  }

  // Remove One Person BY ID
  @Delete('remove/:id')
  removePERSON(
    @Param('id') id: number
  ): Promise<Number> {
    return this.personsService.removePERSON(id);
  }

  // Person Blocking
  @Put('block.user/:id')
  isBlockPERSON(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.isBlockPERSON(id)
  } 

  // Person Unlocking
  @Put('block-not.user/:id')
  isBlockNotPERSON(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.isBlockNotPERSON(id)
  } 

  // Make The User An Administrator
  @Put('is-admin/:id')
  isAdminPerson(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.isAdminPerson(id)
  } 
}