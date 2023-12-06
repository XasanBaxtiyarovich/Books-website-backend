import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Person
      ]
    ),
    JwtModule.register(
      {}
    ),
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}