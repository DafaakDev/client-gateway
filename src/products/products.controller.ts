import {
  BadRequestException,
  Controller,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Get, Post, Patch, Delete, Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/dtos';
import { firstValueFrom } from 'rxjs';

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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one' }, { id }),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
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
