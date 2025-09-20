import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { CustomersDeleteService } from 'src/services/customers_services/customers.delete.service';
import { DeleteCustomersResponseDto } from 'src/dto/customers_dto/customers_dto_delete/customers.dto.delete.response';
import { DeleteCustomersInputDto } from 'src/dto/customers_dto/customers_dto_delete/customer.dto.delete.input';

@Resolver()
export class CustomersDeleteResolver {
  constructor(
    private readonly customersDeleteService: CustomersDeleteService
  ) {}

  @Mutation(() => DeleteCustomersResponseDto)
  async deleteCustomer(
    @Args('data') data: DeleteCustomersInputDto,
    @Context() context: { req: any },
  ): Promise<DeleteCustomersResponseDto> {

    const inactivatedBy = context.req.user.sub;

    return this.customersDeleteService.deleteCustomers(data.id, inactivatedBy);
  }
}