import { ObjectType, Field } from '@nestjs/graphql';
import { FindUsersResponseDto } from 'src/dto/users_dto/users_dto_find/users.dto.find.response';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;

  @Field(() => FindUsersResponseDto)
  user: FindUsersResponseDto;
}