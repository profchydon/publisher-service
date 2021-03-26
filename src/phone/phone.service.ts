import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PhoneService {
  constructor(
    @Inject('PHONE_SUBSCRIBER') private readonly phone: ClientProxy,
  ) {}

  async publish(topic: string, data: Record<string, unknown>) {
    const response = await this.phone.emit(topic, data);
    return response ? true : false;
  }
}
