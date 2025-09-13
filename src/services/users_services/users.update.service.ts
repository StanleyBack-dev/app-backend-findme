import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users_entities/users.entity';

@Injectable()
export class UsersUpdateService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async updateUsers(
    idtb_users: number,
    idtb_customers: number,
    data: {
      name?: string;
      last_name?: string;
      idtb_customers?: number;
      idtb_roles?: number;
      username?: string;
      cpf?: string;
      email?: string;
      phone?: string;
      updated_by?: string;
      first_access?: boolean; 
      status?: boolean;
      inactivated_at?: Date;
      inactivated_by?: string;
    }
  ): Promise<Users> {

    const user = await this.usersRepository.findOne({ where: { idtb_customers, idtb_users } });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    Object.assign(user, {
      ...data,
      updated_by: idtb_users,
    });

    return await this.usersRepository.save(user);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.usersRepository.update(userId, {
      last_login_at: new Date(),
    });
  }
}