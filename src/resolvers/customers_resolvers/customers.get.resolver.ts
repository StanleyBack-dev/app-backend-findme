import { Resolver, Query, Context } from '@nestjs/graphql';
import { CustomersGetService } from 'src/services/customers_services/customers.get.service';
import { Customers } from 'src/entities/customers_entities/customers.entity';

@Resolver(() => Customers)
export class CustomersGetResolver {
    constructor(private readonly customersGetService: CustomersGetService) {}

    @Query(() => [Customers])
    async customers (@Context() context: any): Promise<Customers[]> {
        const tenantId = context.req.user?.tenantId;
        if(!tenantId) throw new Error('TenatID missing');
        return this.customersGetService.getAllCustomers(tenantId);
    }
}
