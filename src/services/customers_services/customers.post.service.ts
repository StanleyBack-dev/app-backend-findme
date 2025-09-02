import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers_entities/customers.entity";

@Injectable()
export class CustomersPostService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>
  ) {}

  async postCustomers(data: {
    name: string;
    last_name: string;
    cpf: string;
    email: string;
    contact: string;
    created_by: string;
    image: string;
  }): Promise<Customers> {
    const customer = this.customersRepository.create(data);
    return this.customersRepository.save(customer);
  }
}