import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { CustomersFindService } from 'src/services/customers/service.customers.find';
import { DtoCustomersFindResponse } from 'src/dto/customers/find/dto.customers.find.response';
import { DtoCustomersFindInput } from 'src/dto/customers/find/dto.customers.find.input';

@Resolver(() => DtoCustomersFindResponse)
export class CustomersFindResolver {
  constructor(private readonly customersFindService: CustomersFindService) {}

  @Query(() => [DtoCustomersFindResponse])
  async customers(
    @Args('filters', { nullable: true }) filters: DtoCustomersFindInput,
    @Context() context: any,
  ): Promise<DtoCustomersFindResponse[]> {

    const tenantId = context.req.user?.tenantId;

    return this.customersFindService.getAllCustomers(filters || {}, tenantId);
  }
}
