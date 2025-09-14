import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users_entities/users.entity';

@Injectable()
export class UsersFindService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getAllUsers(tenatId: number): Promise<Users[]> {
    return this.userRepository.find({
      where: { idtb_customers: tenatId },
    });
  }

  async getByIdUsers(idtb_users: number, idtb_customers: number): Promise<Users | null> {
    return this.userRepository.findOne({
      where: { idtb_users, idtb_customers },
    });
  }

  async getByUsernameAndCustomers(username: string): Promise<Users | null> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}