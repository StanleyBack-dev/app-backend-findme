import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DtoRolesCreateInput {
    @Field()
    name: string;

    @Field()
    description: string;
}