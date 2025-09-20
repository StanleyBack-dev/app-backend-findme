import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/entities/users_entities/users.entity";
import { DeleteUsersResponseDto } from "src/dto/users_dto/users_dto_delete/users.dto.delete.response";

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
  ): Promise<DeleteUsersResponseDto> {
    
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