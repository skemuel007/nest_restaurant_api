import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restuarantService: RestaurantsService) {}

  @Get()
  async getAllRestuarants(): Promise<Restaurant[]> {
    return this.restuarantService.findAll();
  }

  @Post()
  async createRestuarant(
    @Body() restaurant: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restuarantService.create(restaurant);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
    return this.restuarantService.findById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    await this.restuarantService.findById(id);
    return this.restuarantService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    await this.restuarantService.findById(id);
    const restaurant = this.restuarantService.deleteById(id);
    if (restaurant) {
      return {
        deleted: true,
      };
    }
  }
}
