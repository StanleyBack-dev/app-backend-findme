import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users_entities/users.entity';
import { FindUsersResponseDto } from 'src/dto/users_dto/users_dto_find/users.dto.find.response';
import { FindUsersInputDto } from 'src/dto/users_dto/users_dto_find/user.dto.find.input';

@Injectable()
export class UsersFindService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getAllUsers(filters: FindUsersInputDto, tenantId: number): Promise<FindUsersResponseDto[]> {
    const users = await this.userRepository.find({
      where: {
        ...filters,
        idtb_customers: tenantId,
      },
    });

    return users.map((u) => ({
      idtb_users: u.idtb_users,
      public_id_users: u.public_id_users,
      username: u.username,
      name: u.name,
      last_name: u.last_name,
      cpf: u.cpf,
      email: u.email,
      phone: u.phone,
      status: u.status,
      first_access: u.first_access,
      last_login_at: u.last_login_at,
      created_by: u.created_by,
      updated_by: u.updated_by,
      inactivated_by: u.inactivated_by,
      inactivated_at: u.inactivated_at,
      created_at: u.created_at,
      updated_at: u.updated_at,
    }));
  }

  async getByIdUsers(idtb_users: number, idtb_customers: number): Promise<FindUsersResponseDto | null> {
    const user = await this.userRepository.findOne({
      where: { idtb_users, idtb_customers },
    });
    if (!user) return null;

    return {
      idtb_users: user.idtb_users,
      public_id_users: user.public_id_users,
      username: user.username,
      name: user.name,
      last_name: user.last_name,
      cpf: user.cpf,
      email: user.email,
      phone: user.phone,
      status: user.status,
      first_access: user.first_access,
      last_login_at: user.last_login_at,
      created_by: user.created_by,
      updated_by: user.updated_by,
      inactivated_by: user.inactivated_by,
      inactivated_at: user.inactivated_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async getEntityByUsername(username: string): Promise<Users | null> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async getEntityById(idtb_users: number, idtb_customers: number): Promise<Users | null> {
    return this.userRepository.findOne({
      where: { idtb_users, idtb_customers },
    });
  }

}