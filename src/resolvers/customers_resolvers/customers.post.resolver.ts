import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CustomersPostService } from 'src/services/customers_services/customers.post.service';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { CreateCustomersDto } from 'src/dto/customers_dto/customers_dto_create/customers.dto.create.request';

@Resolver(() => Customers)
export class CustomersPostResolver {
    constructor(
        private readonly customersPostService: CustomersPostService
    ) {}

    @Mutation(() => Customers)
    async createCustomers(@Args('data') data: CreateCustomersDto): Promise<Customers> {
        return this.customersPostService.postCustomers(data);
    }
}