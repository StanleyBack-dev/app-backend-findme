import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Customers } from "src/entities/customers_entities/customers.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CustomersGetService {
    constructor(
        @InjectRepository(Customers) private customerRepository: Repository<Customers>
    ) {}

    async getAllCustomers(tenatId: number):Promise<Customers[]> {
        return this.customerRepository.find({
            where: { idtb_customers: tenatId },
        });
    }
}