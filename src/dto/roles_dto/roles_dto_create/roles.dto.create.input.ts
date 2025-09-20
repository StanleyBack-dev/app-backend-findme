import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRolesDto {
    @Field()
    name: string;

    @Field()
    description: string;
}