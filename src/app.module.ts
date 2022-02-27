import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

const CONNECTION_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  database: 'coffees',
  synchronize: true,
  autoLoadEntities: true,
  dropSchema: true,
};
@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(CONNECTION_OPTIONS)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
