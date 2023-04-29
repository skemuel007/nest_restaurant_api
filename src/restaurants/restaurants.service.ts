import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restuarantModel: mongoose.Model<Restaurant>,
  ) {}

  // Get all Restuarants
  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restuarantModel.find();
    return restaurants;
  }

  // Create a new Restuarant
  async create(restaurant: CreateRestaurantDto): Promise<Restaurant> {
    const response = await this.restuarantModel.create(restaurant);
    return response;
  }

  // Get restaurant by id
  async findById(id: string): Promise<Restaurant> {
    const restaurant = await this.restuarantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async updateById(
    id: string,
    restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restuarantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Restaurant> {
    return await this.restuarantModel.findByIdAndDelete(id);
  }
}
