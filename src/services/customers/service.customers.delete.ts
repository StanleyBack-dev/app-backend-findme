import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers/customers.entity";
import { DtoCustomersDeleteResponse } from "src/dto/customers/delete/dto.customers.delete.response";

@Injectable()
export class CustomersDeleteService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>
  ) {}

  async deleteCustomers(idtb_customers: number, inactivated_by: number): Promise<DtoCustomersDeleteResponse> {
    
    const customer = await this.customersRepository.findOne({
      where: { idtb_customers }
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    customer.status = false;
    customer.inactivated_at = new Date();
    customer.inactivated_by = inactivated_by;

    const savedCustomer = await this.customersRepository.save(customer);

    return {
      idtb_customers: savedCustomer.idtb_customers,
      status: savedCustomer.status,
      inactivated_at: savedCustomer.inactivated_at,
      inactivated_by: savedCustomer.inactivated_by,
    };
  }
}