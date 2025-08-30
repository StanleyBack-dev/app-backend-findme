import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashPassword } from "src/utils/hash.util";
import { User } from "../../entities/users_entities/users.entity";

@Injectable()
export class UsersPostService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async postUsers(data: {
    username: string;
    password?: string;
    name: string;
    last_name: string;
    cpf: string;
    email: string;
    phone: string;
  }): Promise<User> {
    if (data.password) {
      data.password = await HashPassword(data.password);
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}