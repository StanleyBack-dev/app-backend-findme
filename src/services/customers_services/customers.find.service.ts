import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers_entities/customers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindCustomersResponseDto } from "src/dto/customers_dto/customers_dto_find/customers.dto.find.response";
import { FindCustomersInputDto } from "src/dto/customers_dto/customers_dto_find/customers.dto.find.input";

@Injectable()
export class CustomersFindService {
  constructor(
    @InjectRepository(Customers) private customerRepository: Repository<Customers>
  ) {}

  async getAllCustomers(filters: FindCustomersInputDto, tenantId: number): Promise<FindCustomersResponseDto[]> {
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
