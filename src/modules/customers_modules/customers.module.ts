import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { CustomersCreateResolver } from 'src/resolvers/customers_resolvers/customers.create.resolver';
import { CustomersCreateService } from 'src/services/customers_services/customers.create.service';
import { CustomersGetResolver } from 'src/resolvers/customers_resolvers/customers.get.resolver';
import { CustomersGetService } from 'src/services/customers_services/customers.get.service';
import { CustomersUpdateResolver } from 'src/resolvers/customers_resolvers/customers.update.resolver';
import { CustomersUpdateService } from 'src/services/customers_services/customers.update.service';
import { CustomersDeleteResolver } from 'src/resolvers/customers_resolvers/customers.delete.resolver';
import { CustomersDeleteService } from 'src/services/customers_services/customers.delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersGetResolver, CustomersCreateResolver, CustomersUpdateResolver, CustomersDeleteResolver, CustomersGetService, CustomersCreateService, CustomersUpdateService, CustomersDeleteService]
})

export class CustomersModule {}