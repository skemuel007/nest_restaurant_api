import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Cateogory {
  FAST_FOOD = 'Fast Food',
  CAFE = 'Cafe',
  FINE_DINING = 'Fine Dining',
}

@Schema()
export class Restaurant {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  email: string;

  @Prop()
  phoneNo: string;

  @Prop()
  address: string;

  @Prop()
  category: Cateogory;

  @Prop()
  images?: object[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
