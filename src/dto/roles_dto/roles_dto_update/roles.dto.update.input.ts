import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateRolesDto {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    status?: boolean;
}