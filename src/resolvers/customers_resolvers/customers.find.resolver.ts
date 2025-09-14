import { Resolver, Query, Context } from '@nestjs/graphql';
import { CustomersFindService } from 'src/services/customers_services/customers.find.service';
import { Customers } from 'src/entities/customers_entities/customers.entity';

@Resolver(() => Customers)
export class CustomersFindResolver {
    constructor(private readonly customersFindService: CustomersFindService) {}

    @Query(() => [Customers])
    async customers (@Context() context: any): Promise<Customers[]> {
        const tenantId = context.req.user?.tenantId;
        if(!tenantId) throw new Error('TenatID missing');
        return this.customersFindService.getAllCustomers(tenantId);
    }
}
