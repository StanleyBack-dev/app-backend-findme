import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users_entities/users.entity';

@Injectable()
export class UsersGetService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(tenatId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { idtb_customers: tenatId },
    });
  }

  async getByIdUsers(idtb_users: string, idtb_customers: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { idtb_users, idtb_customers },
    });
  }

  async getByUsernameAndCustomers(username: string, idtb_customers: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username, idtb_customers },
    });
  }
}