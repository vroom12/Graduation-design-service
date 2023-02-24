import { Car } from '@lib/db/schemas/cars.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

@Controller('cars')
export class CarsController {
  constructor(
    @Inject(Car.name) private readonly carModel: ReturnModelType<typeof Car>,
  ) {}

  @Get()
  async findAll() {
    const cars = await this.carModel.find();
    return {
      code: 200,
      data: cars,
      message: 'success',
    };
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const car = await this.carModel.findById(id);
    return {
      code: 200,
      data: car,
      message: 'success',
    };
  }

  @Get('brand/:brand')
  async findOneByBrand(@Param('brand') brand: string) {
    const car = await this.carModel.find({ brand: brand });
    return {
      code: 200,
      data: car,
      message: 'success',
    };
  }

  @Post('insert')
  async create(@Body() body: Car) {
    const createdCar = await this.carModel.create({ ...body });
    return {
      code: 200,
      data: createdCar,
      message: 'success',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Car) {
    const updatedCar = await this.carModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return {
      code: 200,
      data: updatedCar,
      message: 'success',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedCar = await this.carModel.findByIdAndDelete(id);
    return {
      code: 200,
      data: deletedCar,
      message: 'success',
    };
  }
}
