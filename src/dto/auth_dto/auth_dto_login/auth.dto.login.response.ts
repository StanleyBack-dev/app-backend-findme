import { ObjectType, Field } from '@nestjs/graphql';
import { GetUsersDto } from 'src/dto/users_dto/users_dto_get/users.dto.get.response';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;

  @Field(() => GetUsersDto)
  user: GetUsersDto;
}