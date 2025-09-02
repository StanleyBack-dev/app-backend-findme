import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersPostService } from '../../services/users_services/users.post.service';
import { User } from '../../entities/users_entities/users.entity';
import { CreateUsersDto } from 'src/dto/users_dto/users_dto_create/users.dto.create.request';

@Resolver(() => User)
export class UsersPostResolver {
  constructor(private readonly usersPostService: UsersPostService
  ) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUsersDto): Promise<User> {
    return this.usersPostService.postUsers(data);
  }
}