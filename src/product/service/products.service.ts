import { Injectable } from '@nestjs/common';
import { Product } from '../product.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from '../product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(product: ProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id: number, product: ProductDto): Promise<UpdateResult> {
    return await this.productRepository.update(id, product);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
