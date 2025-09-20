import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers_entities/customers.entity";
import { DeleteCustomersResponseDto } from "src/dto/customers_dto/customers_dto_delete/customers.dto.delete.response";

@Injectable()
export class CustomersDeleteService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>
  ) {}

  async deleteCustomers(idtb_customers: number, inactivated_by: number): Promise<DeleteCustomersResponseDto> {
    
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