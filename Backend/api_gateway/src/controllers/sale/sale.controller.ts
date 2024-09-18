import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('sale')
@UseGuards(JwtAuthGuard)
export class SaleController {}
