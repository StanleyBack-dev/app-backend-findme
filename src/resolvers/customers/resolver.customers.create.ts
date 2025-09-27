import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CustomersCreateService } from 'src/services/customers/service.customers.create';
import { Customers } from 'src/entities/customers/customers.entity';
import { DtoCustomersCreateInput } from 'src/dto/customers/create/dto.customers.create.input';

@Resolver(() => Customers)
export class CustomersCreateResolver {
  constructor(
    private readonly customersCreateService: CustomersCreateService
  ) {}

  @Mutation(() => Customers)
  async createCustomer(
    @Args('data') data: DtoCustomersCreateInput,
    @Context() context: { req: any }
  ): Promise<Customers> {

    const createdBy = context.req.user.sub;

    return this.customersCreateService.execute({ ...data, created_by: createdBy });
  }
}