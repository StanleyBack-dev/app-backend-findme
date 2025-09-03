import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { CustomersUpdateService } from 'src/services/customers_services/customers.update.service';
import { UpdateCustomersDto } from 'src/dto/customers_dto/customers_dto_update/customers.dto.update.request';

@Resolver(() => Customers)
export class CustomersUpdateResolver {
  constructor(
    private readonly customersUpdateService: CustomersUpdateService,
  ) {}

  @Mutation(() => Customers)
  async updateCustomer(
    @Args('data') data: UpdateCustomersDto,
    @Context() context: { req: any },
  ): Promise<Customers> {

    const customerId = context.req.user.tenantId;

    return this.customersUpdateService.updateCustomers(customerId, data);
  }
}