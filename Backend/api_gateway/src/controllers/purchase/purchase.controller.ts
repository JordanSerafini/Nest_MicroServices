import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('purchase')
@UseGuards(JwtAuthGuard)
export class PurchaseController {}
