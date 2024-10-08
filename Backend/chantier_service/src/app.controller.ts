import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChantierService } from './app.service';
import { CreateConstructionSiteDto } from './dto/create-chantier.dto';
import { UpdateChantierDto } from './dto/update-chantier.dto';

@Controller()
export class ChantierController {
  constructor(private readonly chantierService: ChantierService) {}

  @MessagePattern({ cmd: 'create_chantier' })
  create(
    @Payload()
    {
      CreateConstructionSiteDto,
      email,
    }: {
      CreateConstructionSiteDto: CreateConstructionSiteDto;
      email: string;
    },
  ) {
    return this.chantierService.create(CreateConstructionSiteDto, email);
  }

  @MessagePattern({ cmd: 'find_all_chantiers' })
  findAll(@Payload() email: string) {
    return this.chantierService.findAll(email);
  }

  @MessagePattern({ cmd: 'paginate_chantiers' })
  paginate(
    @Payload()
    {
      email,
      paginationParams,
    }: {
      email: string;
      paginationParams: { limit: number; offset: number; searchQuery: string };
    },
  ) {
    return this.chantierService.paginate(paginationParams, email);
  }

  @MessagePattern({ cmd: 'find_one_chantier' })
  findOne(@Payload() { id, email }: { id: string; email: string }) {
    if (!id) {
      console.error(`ID is missing or invalid: ${id}`);
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    return this.chantierService.findOne(id, email);
  }

  @MessagePattern({ cmd: 'update_chantier' })
  update(
    @Payload()
    {
      id,
      updateChantierDto,
      email,
    }: {
      id: string;
      updateChantierDto: UpdateChantierDto;
      email: string;
    },
  ) {
    return this.chantierService.update(+id, updateChantierDto, email);
  }

  @MessagePattern({ cmd: 'remove_chantier' })
  remove(@Payload() { id, email }: { id: string; email: string }) {
    return this.chantierService.remove(+id, email);
  }

  //* ----------------------------------Construction Site Documents

  @MessagePattern({ cmd: 'get_chantierdoc_byid' })
  getDocumentById(@Payload() { id, email }: { id: string; email: string }) {
    return this.chantierService.getConstructionSiteDocuments(id, email);
  }

  @MessagePattern({ cmd: 'get_chantierdoc_line' })
  getDocumentLine(@Payload() { id, email }: { id: string; email: string }) {
    return this.chantierService.getConstructionSiteDocumentLine(id, email);
  }

  @MessagePattern({ cmd: 'get_chantierdeal_byid' })
  getDealById(@Payload() { id, email }: { id: string; email: string }) {
    return this.chantierService.getDealDocument(id, email);
  }
}
