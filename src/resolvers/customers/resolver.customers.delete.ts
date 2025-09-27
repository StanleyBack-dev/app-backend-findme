import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { CustomersDeleteService } from 'src/services/customers/service.customers.delete';
import { DtoCustomersDeleteResponse } from 'src/dto/customers/delete/dto.customers.delete.response';
import { DtoCustomersDeleteInput } from 'src/dto/customers/delete/dto.customers.delete.input';

@Resolver()
export class CustomersDeleteResolver {
  constructor(
    private readonly customersDeleteService: CustomersDeleteService
  ) {}

  @Mutation(() => DtoCustomersDeleteResponse)
  async deleteCustomer(
    @Args('data') data: DtoCustomersDeleteInput,
    @Context() context: { req: any },
  ): Promise<DtoCustomersDeleteResponse> {

    const inactivatedBy = context.req.user.sub;

    return this.customersDeleteService.deleteCustomers(data.id, inactivatedBy);
  }
}