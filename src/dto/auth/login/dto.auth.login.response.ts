import { ObjectType, Field } from '@nestjs/graphql';
import { DtoUsersFindResponse } from 'src/dto/users_dto/find/dto.users.find.response';

@ObjectType()
export class DtoAuthLoginResponse {
  @Field()
  accessToken: string;

  @Field(() => DtoUsersFindResponse)
  user: DtoUsersFindResponse;
}