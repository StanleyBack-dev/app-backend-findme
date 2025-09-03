import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { CustomersDeleteService } from 'src/services/customers_services/customers.delete.service';

@Resolver(() => Customers)
export class CustomersDeleteResolver {
  constructor(
    private readonly customersDeleteService: CustomersDeleteService,
  ) {}

  @Mutation(() => Customers)
  async deleteCustomer(@Context() context: { req: any }): Promise<Customers> {

     const customerId = context.req.user.tenantId;

    const inactivatedBy = context.req.user.sub;

    return this.customersDeleteService.deleteCustomers(customerId, inactivatedBy);
  }
}