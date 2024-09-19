import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
// import { CustomLogger } from '../../logging/custom-logger.service';

@Controller('supplier')
@UseGuards(JwtAuthGuard)
export class SupplierController {}
