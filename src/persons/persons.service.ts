import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';

import { Person } from './entities';
import { SignInDto, SignUpDto, UpdateDataDto, UpdatePasswordDto } from './dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)private personRepository: Repository<Person>,
    private jwtService: JwtService
  ){}

  async signUP(signUpDto: SignUpDto): Promise<Object>  {
    const [ person ] = await this.personRepository.findBy({ email: signUpDto.email });
    if(person) return { 
                        message: 'email already exists',
                        status: HttpStatus.CONFLICT
                      };

    const hashed_password = await bcrypt.hash(signUpDto.password, 7);

    const new_person = await this.personRepository.save(
      { 
        ...signUpDto,
        hashed_password
      }
    );
    
    const token = await this.getTokens(new_person);

    return {
      message: 'sign up successfully',
      status: HttpStatus.OK,
      person: new_person,
      token
    };
  }

  async signIN(signInDto: SignInDto): Promise<Object> {
    const [person] = await this.personRepository.findBy({ email: signInDto.email });
    console.log(person);
    
    if (!person) return {
                          message: 'Email or password is incorrect',
                          status: HttpStatus.NOT_FOUND
                        };

    const pass = await bcrypt.compare(signInDto.password, person.hashed_password);
    if (!pass) return { 
                        message: 'Email or password is incorrect',
                        status: HttpStatus.NOT_FOUND 
                      };

    if(person.is_block) return {
                                  message: 'person is blocked',
                                  status: HttpStatus.FORBIDDEN
                                };

    const token = await this.getTokens(person);

    if (person.is_admin) {
      return {
               message: 'Sign in succesfully Admin', 
               status: HttpStatus.OK,
               person: person,
               token
             }
    } else {
      return {
               message: 'Sign in succesfully User', 
               person: person,
               status: HttpStatus.OK,
               token: token
             }
   }
  }

  async findUSERS(): Promise<Person[] | Object> {
    const users = await this.personRepository.findBy({ is_admin: false, is_block: false });

    if(users.length === 0) return { 
                                    message: 'Users Not Found', 
                                    status: HttpStatus.NOT_FOUND
                                  };
    return {
            users: users,
            status: HttpStatus.OK,
           };
  }

  async findBlockUSERS(): Promise<Person[] | Object> {
    const users = await this.personRepository.findBy({ is_admin: false, is_block: true });

    if(users.length === 0) return { 
                                    message: 'Users Not Found', 
                                    status: HttpStatus.NOT_FOUND
                                  };
    return {
            users: users,
            status: HttpStatus.OK,
           };
  }

  async findADMINS(): Promise<Person[] | Object> {
    const admins = await this.personRepository.findBy({ is_admin: true });

    if(admins.length === 0) return { 
                                    message: 'Admins Not Found', 
                                    status: HttpStatus.NOT_FOUND
                                  };
    return {
             admins: admins,
             status: HttpStatus.OK,
           };
  }

  async findOneUSER(id: number): Promise<Person | Object> {
    const [ user ] = await this.personRepository.findBy({ person_id: id, is_admin: false });

    if (!user) return {
                        message: 'User Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    return {
            user: user,
            status: HttpStatus.OK
           };
  }

  async findOneADMIN(id: number): Promise<Person | Object> {
    const [ admin ] = await this.personRepository.findBy({ person_id: id, is_admin: true });

    if (!admin) return {
                        message: 'Admin Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    return {
            admin: admin,
            status: HttpStatus.OK
           };
  }

  async updateDATA(id: number, updateDataDto: UpdateDataDto): Promise<Person | Object> {
    const [ person ] = await this.personRepository.findBy({ person_id: id });
    if (!person) return {
                          message: 'Person Not Found',
                          status: HttpStatus.NOT_FOUND
                        };
    
    await this.personRepository.update(
      { 
        person_id: id
      },
      {
        ...updateDataDto
      }
    );

    const [ updatePerson ] =  await this.personRepository.findBy({ person_id: id });

    return {
            person: updatePerson,
            status: HttpStatus.OK
           }
  }

  async updatePASSWORD(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Person | Object>  {
    const [person] = await this.personRepository.findBy({ person_id: id });
    if (!person) return {
                          message: 'Person Not Found',
                          status: HttpStatus.NOT_FOUND
                        };

    const pass = await bcrypt.compare(updatePasswordDto.password, person.hashed_password);
    if (!pass) return { 
                        message: 'old password is incorrect', 
                        status: HttpStatus.CONFLICT
                      };

    if(updatePasswordDto.new_password != updatePasswordDto.confirm_password) return {
                                                                                      message: 'confirm password is incorrect',
                                                                                      status: HttpStatus.UNAUTHORIZED
                                                                                    };
                                                                                    
    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.personRepository.update(
      {
        person_id: id
      }, 
      {
        hashed_password
      }
    );

    const [ updatePerson ] =  await this.personRepository.findBy({ person_id: id });

    return {
             person: updatePerson,
             status: HttpStatus.OK
           }
  }

  async removePERSON(id: number): Promise<HttpStatus> {
    const [ removePerson ] = await this.personRepository.findBy({ person_id: id });
    if(!removePerson) return HttpStatus.NOT_FOUND;

    await this.personRepository.delete({ person_id: id });

    return HttpStatus.OK;
  }

  async isBlockPERSON(id: number): Promise<Object> {
    const [ person ] = await this.personRepository.findBy({ person_id: id, is_block: false, is_admin: false });

    if (!person) return {
                        message: 'User Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    await this.personRepository.update(
      { 
        person_id: id
      },
      {
        is_block: true
      }
    );
    const [ updatePerson ] =  await this.personRepository.findBy({ person_id: id });

    return {
            person: updatePerson,
            status: HttpStatus.OK
           }
  }
  
  async isBlockNotPERSON(id: number): Promise<Object> {
    const [ person ] = await this.personRepository.findBy({ person_id: id, is_block: true, is_admin: false });

    if (!person) return {
                        message: 'User Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    await this.personRepository.update(
      { 
        person_id: id
      },
      {
        is_block: false
      }
    );
    const [ updatePerson ] =  await this.personRepository.findBy({ person_id: id });

    return {
            person: updatePerson,
            status: HttpStatus.OK
           }
  }

  async isAdminPerson (id: number): Promise<Object> {
    const [ user ] = await this.personRepository.findBy({ person_id: id, is_admin: false });

    if (!user) return {
                        message: 'User Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    await this.personRepository.update(
      { 
        person_id: id
      },
      {
        is_admin: true
      }
    );
    const [ updatePerson ] =  await this.personRepository.findBy({ person_id: id });

    return {
            person: updatePerson,
            status: HttpStatus.OK
           }
  }


  async getTokens(person: Person) {
    const jwtPayload = { id: person.person_id, is_admin: person.is_admin, is_block: person.is_block }
  
    const token = await this.jwtService.signAsync(jwtPayload, {
                    secret: process.env.ACCES_TOKEN_KEY_PERSON,
                    expiresIn: process.env.ACCESS_TOKEN_TIME
                  })
    return token;
  }
}