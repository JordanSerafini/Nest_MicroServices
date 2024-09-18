import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('deal')
@UseGuards(JwtAuthGuard)
export class DealController {}
