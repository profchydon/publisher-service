import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublishService {
  constructor(
    @Inject('CAR_SUBSCRIBER') private readonly car: ClientProxy,
    @Inject('PHONE_SUBSCRIBER') private readonly phone: ClientProxy,
  ) {}

  async publish(topic: string, data: Record<string, unknown>) {
    let response;
    if (topic === 'car') {
      response = await this.car.emit(topic, data);
    }

    if (topic === 'phone') {
      response = await this.phone.emit(topic, data);
    }
    return response ? true : false;
  }
}
