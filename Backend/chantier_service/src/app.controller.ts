import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChantierService } from './app.service';
import { CreateChantierDto } from './dto/create-chantier.dto';
import { UpdateChantierDto } from './dto/update-chantier.dto';

@Controller()
export class ChantierController {
  constructor(private readonly chantierService: ChantierService) {}

  @MessagePattern({ cmd: 'create_chantier' })
  create(
    @Payload()
    {
      createChantierDto,
      email,
    }: {
      createChantierDto: CreateChantierDto;
      email: string;
    },
  ) {
    return this.chantierService.create(createChantierDto, email);
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
  findOne(@Payload() { id, email }: { id: string | number; email: string }) {
    if (!id) {
      console.error(`ID is missing or invalid: ${id}`);
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      console.error(`Unable to parse ID: ${id}`);
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    console.log(`Received ID: ${parsedId}, Email: ${email}`);
    return this.chantierService.findOne(parsedId, email);
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
}
