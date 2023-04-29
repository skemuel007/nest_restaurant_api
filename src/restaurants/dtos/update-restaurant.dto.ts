import { Cateogory } from '../schemas/restaurant.schema';

export class UpdateRestaurantDto {
  readonly name: string;
  readonly description: string;
  readonly email: string;
  readonly phoneNo: string;
  readonly address: string;
  readonly category: Cateogory;
  readonly images?: object[];
}
