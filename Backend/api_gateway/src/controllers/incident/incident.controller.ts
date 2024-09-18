import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('incident')
@UseGuards(JwtAuthGuard)
export class IncidentController {}
