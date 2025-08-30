import { ObjectType, Field } from "@nestjs/graphql";
import { Column } from 'typeorm';

@ObjectType()
export class Address {
  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  neighborhood: string;

  @Field()
  @Column()
  number: string;

  @Field()
  @Column()
  state: string;
}