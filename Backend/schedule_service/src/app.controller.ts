import { Controller } from '@nestjs/common';
import { ScheduleService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ScheduleController {
  constructor(private readonly ScheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'find_one_scheduleEvent' })
  findOne(@Payload() { Id, email }: { Id: string; email: string }) {
    return this.ScheduleService.findOne(Id, email);
  }
}
