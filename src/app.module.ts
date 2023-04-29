import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    RestaurantsModule,
    ConfigModule.forRoot(
      /* { envFilePath: `.env.${process.env.NODE_ENV}`} */
      {
        isGlobal: true,
      },
    ),
    MongooseModule.forRoot(
      // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}?retryWrites=true&w=majority&db=${process.env.DB_NAME}`,
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        dbName: `${process.env.DB_NAME}`,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
