import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class DtoRolesUpdateInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    status?: boolean;
}