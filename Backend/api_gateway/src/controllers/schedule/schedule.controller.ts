import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('schedule')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  private readonly logger = new CustomLogger('ScheduleController');

  constructor(
    @Inject('SCHEDULE_SERVICE')
    private readonly scheduleServiceClient: ClientProxy,
  ) {}

  //* ------------------- Dynamic Routes ------------------- *//
  @Get(':Id')
  findOneItem(@Param('Id') Id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all items for user: ${email}`);
    return this.scheduleServiceClient.send(
      { cmd: 'find_one_scheduleEvent' },
      { Id, email },
    );
  }
}
