import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers_entities/customers.entity";

@Injectable()
export class CustomersDeleteService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  async deleteCustomers(idtb_customers: number, inactivated_by: string): Promise<Customers> {
    
    const customer = await this.customersRepository.findOne({
      where: { idtb_customers },
    });

    if (!customer) {
      throw new NotFoundException(`Cliente não encontrado`);
    }

    customer.status = false;
    customer.inactivated_at = new Date();
    customer.inactivated_by = inactivated_by;

    return await this.customersRepository.save(customer);
  }
}