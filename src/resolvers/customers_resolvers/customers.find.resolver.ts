import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { CustomersFindService } from 'src/services/customers_services/customers.find.service';
import { FindCustomersResponseDto } from 'src/dto/customers_dto/customers_dto_find/customers.dto.find.response';
import { FindCustomersInputDto } from 'src/dto/customers_dto/customers_dto_find/customers.dto.find.input';

@Resolver(() => FindCustomersResponseDto)
export class CustomersFindResolver {
  constructor(private readonly customersFindService: CustomersFindService) {}

  @Query(() => [FindCustomersResponseDto])
  async customers(
    @Args('filters', { nullable: true }) filters: FindCustomersInputDto,
    @Context() context: any,
  ): Promise<FindCustomersResponseDto[]> {

    const tenantId = context.req.user?.tenantId;

    return this.customersFindService.getAllCustomers(filters || {}, tenantId);
  }
}
