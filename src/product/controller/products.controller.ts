import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Request,
  Body,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProductsService } from '../service/products.service';
import { Product } from '../product.entity';
import { ProductDto } from '../product.dto';

@Controller('v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async GetAll(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Post()
  async Create(@Request() req, @Body() product: ProductDto): Promise<Product> {
    return await this.productsService.create(product);
  }

  @Get(':id')
  async GetOne(@Param() id: number): Promise<Product> {
    return await this.productsService.getOne(id);
  }

  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: ProductDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product);
  }

  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id);
  }
}
