import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateChantierDto } from '../../dto/create-chantier.dto';
import { UpdateChantierDto } from '../../dto/update-chantier.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';

@Controller('chantiers')
@UseGuards(JwtAuthGuard)
export class ChantierController {
  private readonly logger = new CustomLogger('ChantierController');

  constructor(
    @Inject('CHANTIER_SERVICE')
    private readonly chantierServiceClient: ClientProxy,
  ) {}

  @Post()
  createChantier(@Body() createChantierDto: CreateChantierDto, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Creating chantier for user: ${email}`);
    return this.chantierServiceClient.send(
      { cmd: 'create_chantier' },
      { createChantierDto, email },
    );
  }

  @Get()
  findAllChantiers(@Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all chantiers for user: ${email}`);
    return this.chantierServiceClient.send(
      { cmd: 'find_all_chantiers' },
      { email },
    );
  }

  @Get('paginate')
  paginate(
    @Request() req,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated chantiers for user: ${email}`);

    const paginationParams = {
      limit: limit ? parseInt(limit, 10) : 10,
      offset: offset ? parseInt(offset, 10) : 0,
      searchQuery: searchQuery ? searchQuery : '',
    };

    return this.chantierServiceClient.send(
      { cmd: 'paginate_chantiers' },
      { email, paginationParams },
    );
  }

  @Get(':id')
  findOneChantier(@Param('id') id: number | string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching chantier with ID ${id} for user: ${email}`);
    return this.chantierServiceClient.send(
      { cmd: 'find_one_chantier' },
      { id, email },
    );
  }

  @Patch(':id')
  updateChantier(
    @Param('id') id: string,
    @Body() updateChantierDto: UpdateChantierDto,
    @Request() req,
  ) {
    const email = req.user.email;
    this.logger.log(`Updating chantier with ID ${id} for user: ${email}`);
    return this.chantierServiceClient.send(
      { cmd: 'update_chantier' },
      { id, updateChantierDto, email },
    );
  }

  @Delete(':id')
  removeChantier(@Param('id') id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Removing chantier with ID ${id} for user: ${email}`);
    return this.chantierServiceClient.send(
      { cmd: 'remove_chantier' },
      { id, email },
    );
  }
}
