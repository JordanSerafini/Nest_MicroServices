import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
// import { CustomLogger } from '../../logging/custom-logger.service';

@Controller('incident')
@UseGuards(JwtAuthGuard)
export class IncidentController {}
