import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { GasstationService } from './services/gasstation.service';

@Controller('gasstations')
export class GasstationsController {
    constructor(private readonly gasolinerasService: GasstationService) {}

  @Get(':location')
  getById(@Res() response: Response, @Param('location') location: string): void {
    this.gasolinerasService
      .getByLocation(location)
      .then((msg) => {
        response.status(HttpStatus.OK).json(msg);
      })
      .catch((error) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ error, msg: 'error in get gasStation by location' });
      });
  }
}
