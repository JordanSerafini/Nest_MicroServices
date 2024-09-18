import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('colleague')
@UseGuards(JwtAuthGuard)
export class ColleagueController {}
