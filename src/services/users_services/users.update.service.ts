import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users_entities/users.entity';

@Injectable()
export class UsersUpdateService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async updateLastLogin(userId: string): Promise<void> {
    await this.usersRepository.update(userId, {
      last_login_at: new Date(),
    });
  }
}