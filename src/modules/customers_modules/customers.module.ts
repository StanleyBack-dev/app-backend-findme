import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { CustomersGetResolver } from 'src/resolvers/customers_resolvers/customers.get.resolver';
import { CustomersGetService } from 'src/services/customers_services/customers.get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersGetResolver, CustomersGetService]
})

export class CustomersModule {}