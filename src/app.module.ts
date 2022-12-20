import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServiceMiddleware } from './auth/middleware/auth.middleware';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ProductManagement.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthServiceMiddleware).forRoutes('v1/products');
  }
}
