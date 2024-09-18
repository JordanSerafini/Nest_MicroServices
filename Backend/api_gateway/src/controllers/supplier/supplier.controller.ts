import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('supplier')
@UseGuards(JwtAuthGuard)
export class SupplierController {}
