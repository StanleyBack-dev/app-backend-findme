import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers/customers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DtoCustomersFindResponse } from "src/dto/customers/find/dto.customers.find.response";
import { DtoCustomersFindInput } from "src/dto/customers/find/dto.customers.find.input";

@Injectable()
export class CustomersFindService {
  constructor(
    @InjectRepository(Customers) private customerRepository: Repository<Customers>
  ) {}

  async getAllCustomers(filters: DtoCustomersFindInput, tenantId: number): Promise<DtoCustomersFindResponse[]> {
    const customers = await this.customerRepository.find({
      where: {
        ...filters,
        created_by: tenantId,
      },
    });

    return customers.map((c) => ({
    idtb_customers: c.idtb_customers,
    public_id_customers: c.public_id_customers,
    name: c.name,
    last_name: c.last_name,
    cpf: c.cpf,
    email: c.email,
    contact: c.contact,
    status: c.status,
    image_url: c.image_url,
    address: c.address,
    created_by: c.created_by,
    created_at: c.created_at,
    updated_at: c.updated_at,
    }));
  }
}
