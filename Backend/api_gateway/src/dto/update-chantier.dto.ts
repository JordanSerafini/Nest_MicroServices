import { PartialType } from '@nestjs/mapped-types';
import { CreateChantierDto } from './create-chantier.dto';

export class UpdateChantierDto extends PartialType(CreateChantierDto) {}
