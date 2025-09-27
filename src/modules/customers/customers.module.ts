import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/entities/customers/customers.entity';
import { CustomersCreateResolver } from 'src/resolvers/customers/resolver.customers.create';
import { CustomersCreateService } from 'src/services/customers/service.customers.create';
import { CustomersFindResolver } from 'src/resolvers/customers/resolver.customers.find';
import { CustomersFindService } from 'src/services/customers/service.customers.find';
import { CustomersUpdateResolver } from 'src/resolvers/customers/resolver.customers.update';
import { CustomersUpdateService } from 'src/services/customers/service.customers.update';
import { CustomersDeleteResolver } from 'src/resolvers/customers/resolver.customers.delete';
import { CustomersDeleteService } from 'src/services/customers/service.customers.delete';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersFindResolver, CustomersCreateResolver, CustomersUpdateResolver, CustomersDeleteResolver, CustomersFindService, CustomersCreateService, CustomersUpdateService, CustomersDeleteService]
})

export class CustomersModule {}