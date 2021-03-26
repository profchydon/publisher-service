import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CarService {
  constructor(@Inject('CAR_SUBSCRIBER') private readonly car: ClientProxy) {}

  async publish(topic: string, data: Record<string, unknown>) {
    const response = await this.car.emit(topic, data);
    return response ? true : false;
  }
}
