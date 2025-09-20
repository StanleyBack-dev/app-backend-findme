import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers_entities/customers.entity";

@Injectable()
export class CustomersUpdateService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>
  ) {}

  async updateCustomers(
    idtb_customers: number,
    idtb_users: number,
    data: {
      name?: string;
      last_name?: string;
      cpf?: string;
      email?: string;
      contact?: string;
      updated_by?: number;
      status?: boolean;
      image?: string;
      inactivated_at?: Date;
      inactivated_by?: number;
    }
  ): Promise<Customers> {

    const customer = await this.customersRepository.findOne({ where: { idtb_customers } });

    if (!customer) {
      throw new NotFoundException(`Cliente encontrado`);
    }

    Object.assign(customer, {
      ...data,
      updated_by: idtb_users,
    });

    return await this.customersRepository.save(customer);
  }
}