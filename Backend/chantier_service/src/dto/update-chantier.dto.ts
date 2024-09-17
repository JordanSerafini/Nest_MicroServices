import { PartialType } from '@nestjs/mapped-types';
import { CreateConstructionSiteDto } from './create-chantier.dto';

export class UpdateChantierDto extends PartialType(CreateConstructionSiteDto) {}
