import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Address } from 'src/entities/customers_entities/address.customers.entity';

@ObjectType()
export class FindCustomersResponseDto {
  @Field(() => Int)
  idtb_customers: number;

  @Field()
  public_id_customers: string;

  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  cpf?: string;

  @Field()
  email?: string;

  @Field()
  contact?: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => Boolean)
  status: boolean;

  @Field(() => Int)
  created_by: number;

  @Field({ nullable: true })
  updated_by?: number;

  @Field({ nullable: true })
  inactivated_by?: number;

  @Field({ nullable: true })
  inactivated_at?: Date;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}