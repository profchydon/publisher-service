import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublishController } from './publish/publish.controller';
import { PublishService } from './publish/publish.service';
import { CarController } from './car/car.controller';
import { PhoneController } from './phone/phone.controller';
import { PhoneService } from './phone/phone.service';
import { CarService } from './car/car.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAR_SUBSCRIBER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cars',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PHONE_SUBSCRIBER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'phones',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, PublishController, CarController, PhoneController],
  providers: [AppService, PublishService, PhoneService, CarService],
})
export class AppModule {}
