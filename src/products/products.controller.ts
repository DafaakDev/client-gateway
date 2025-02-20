import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Esto deberia crear un producto';
  }

  @Get()
  findAllProducts() {
    return 'Esto deberia retornar todos los productos';
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
