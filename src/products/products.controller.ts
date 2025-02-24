import { Body, Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Get, Post, Patch, Delete, Inject } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send({ cmd: 'create' }, createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send({ cmd: 'find_one' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send({ cmd: 'delete' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.natsClient
      .send({ cmd: 'update' }, { ...updateProductDto, id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
