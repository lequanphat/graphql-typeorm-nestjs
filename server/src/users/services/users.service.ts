import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { CreateUserInput } from 'src/graphql/types/CreateUserInput';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }
  createUser(createUserData: CreateUserInput) {
    const user = this.userRepository.create(createUserData);
    return this.userRepository.save(user);
  }
  getUserByID(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
    if (!user) throw new Error('User not found!!!');
    await this.userRepository.delete({ id });
    return user;
  }
}
