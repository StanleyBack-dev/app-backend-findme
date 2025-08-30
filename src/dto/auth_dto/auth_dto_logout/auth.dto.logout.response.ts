import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponseDto {
  @Field()
  message: string;
}