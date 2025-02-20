import { Controller, Query } from '@nestjs/common';
import { Get, Post, Patch, Delete, Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/dtos';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Esto deberia crear un producto';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  findOne() {
    return 'Esto deberia retornar un producto';
  }

  @Delete(':id')
  delete() {
    return 'Esto deberia eliminar un producto';
  }

  @Patch(':id')
  update() {
    return 'Esto deberia actualizar un producto';
  }
}
