import { Body, Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Get, Post, Patch, Delete, Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create' }, createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'find_one' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
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
