import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/entities/users/users.entity";
import { DtoUsersDeleteResponse } from "src/dto/users_dto/delete/dto.users.delete.response";

@Injectable()
export class UsersDeleteService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  async deleteUsers(
    idtb_customers: number,
    idtb_users: number,
    inactivated_by: number
  ): Promise<DtoUsersDeleteResponse> {
    
    const user = await this.userRepository.findOne({
      where: { idtb_users, idtb_customers },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    user.status = false;
    user.inactivated_at = new Date();
    user.inactivated_by = inactivated_by;

    return this.userRepository.save(user);
  }
}