import { Body, Controller, Param, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CarService } from 'src/car/car.service';
import { PhoneService } from 'src/phone/phone.service';

@Controller('publish')
export class PublishController {
  constructor(
    private readonly carService: CarService,
    private readonly phoneService: PhoneService,
  ) {}

  @Post(':topic')
  async publish(
    @Param() param,
    @Body() data: Record<string, unknown>,
    @Res() res: Response,
  ): Promise<any> {
    const { topic } = param;

    let response;

    if (topic === 'car') {
      response = await this.carService.publish(topic, data);
    }

    if (topic === 'phone') {
      response = await this.phoneService.publish(topic, data);
    }

    if (!response) {
      return res.status(HttpStatus.NOT_IMPLEMENTED);
    }

    const payload = {
      topic,
      data,
    };

    return res.status(HttpStatus.ACCEPTED).json(payload);
  }
}
