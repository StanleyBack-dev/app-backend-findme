import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CustomersCreateService } from 'src/services/customers_services/customers.create.service';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { CreateCustomersDto } from 'src/dto/customers_dto/customers_dto_create/customers.dto.create.request';

@Resolver(() => Customers)
export class CustomersCreateResolver {
  constructor(
    private readonly customersCreateService: CustomersCreateService
  ) {}

  @Mutation(() => Customers)
  async createCustomer(
    @Args('data') data: CreateCustomersDto,
    @Context() context: { req: any }
  ): Promise<Customers> {

    const createdBy = context.req.user.sub;

    return this.customersCreateService.execute({ ...data, created_by: createdBy });
  }
}