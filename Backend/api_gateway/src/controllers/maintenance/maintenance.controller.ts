import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
// import { CustomLogger } from '../../logging/custom-logger.service';

@Controller('maintenance')
@UseGuards(JwtAuthGuard)
export class MaintenanceController {}
