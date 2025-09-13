import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashPassword } from "src/utils/hash.util";
import { Users } from "../../entities/users_entities/users.entity";

@Injectable()
export class UsersPostService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  async postUsers(data: {
    username: string;
    password?: string;
    created_by: string;
    idtb_customers: number;
    idtb_roles: number;
    name: string;
    last_name: string;
    cpf: string;
    email: string;
    phone: string;
  }): Promise<Users> {
    if (data.password) {
      data.password = await HashPassword(data.password);
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}