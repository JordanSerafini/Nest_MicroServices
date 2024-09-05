import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  BadRequestException,
  Request,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStockDocumentDto } from 'src/dto/create-stock.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomLogger } from 'src/logging/custom-logger.service';

@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StockController {
  private readonly logger = new CustomLogger('StockController');

  constructor(
    @Inject('STOCK_SERVICE') private readonly stockServiceClient: ClientProxy,
  ) {}

  // Créer un document de stock
  @Post('create')
  async createStockDocument(
    @Body() createStockDocumentDto: CreateStockDocumentDto,
    @Request() req,
  ) {
    const email = req.user.email;

    return this.stockServiceClient.send(
      { cmd: 'create_stock' },
      { createStockDto: createStockDocumentDto, email },
    );
  }

  // Récupérer tous les documents de stock
  @Get('all')
  async findAllStockDocuments(@Request() req) {
    const email = req.user.email;
    return this.stockServiceClient.send({ cmd: 'find_all_stocks' }, email);
  }

  @Get('paginate')
  async paginate(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('searchQuery') searchQuery: string,
    @Request() req,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated stock for user: ${email}`);

    const paginationParams = {
      limit: parseInt(limit, 10) || 25,
      offset: parseInt(offset, 10) || 0,
      searchQuery: searchQuery || '',
    };

    return this.stockServiceClient.send(
      { cmd: 'paginate_stocks' },
      { paginationParams, email },
    );
  }

  // Récupérer un document de stock par ID
  @Get(':id')
  async findOneStockDocument(@Param('id') id: number, @Request() req) {
    const email = req.user.email;

    // Vérification de l'ID
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    return this.stockServiceClient.send(
      { cmd: 'find_one_stock' },
      { id, email },
    );
  }

  // Récupérer toutes les lignes de document de stock
  @Get('lines')
  async getAllStockDocLines() {
    return this.stockServiceClient.send({ cmd: 'get_all_stock_doc_lines' }, {});
  }

  // Récupérer tous les entrepôts
  @Get('storehouses')
  async getAllStorehouses() {
    return this.stockServiceClient.send({ cmd: 'get_all_storehouses' }, {});
  }

  // Récupérer le nom d'un entrepôt par ID
  @Get('storehouse/:id')
  async getStorehouseNameById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Invalid Storehouse ID');
    }
    return this.stockServiceClient.send(
      { cmd: 'get_storehouse_name_by_id' },
      { id },
    );
  }

  // Récupérer tous les stocks avec leurs détails
  @Get('details/all')
  async getAllStockWithDetails() {
    return this.stockServiceClient.send(
      { cmd: 'get_all_stock_with_details' },
      {},
    );
  }

  // Récupérer un stock avec ses détails par DocumentId
  @Get('details/:DocumentId')
  async getStockWithDetailsByDocumentId(
    @Param('DocumentId') DocumentId: string,
  ) {
    if (!DocumentId) {
      throw new BadRequestException('Invalid Document ID');
    }
    return this.stockServiceClient.send(
      { cmd: 'get_stock_with_details_by_document_id' },
      { DocumentId },
    );
  }

  // Récupérer les stocks dans une plage de dates
  @Get('date-range')
  async getStockWithinDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('Invalid date range');
    }
    return this.stockServiceClient.send(
      { cmd: 'get_stock_within_date_range' },
      { startDate, endDate },
    );
  }

  // Récupérer les lignes de document de stock par DocumentId
  @Get('document-lines/:DocumentId')
  async getStockDocumentLineByDocId(@Param('DocumentId') DocumentId: string) {
    if (!DocumentId) {
      throw new BadRequestException('Invalid Document ID');
    }
    return this.stockServiceClient.send(
      { cmd: 'get_stock_document_line_by_doc_id' },
      { DocumentId },
    );
  }

  // Récupérer un stock par DocumentId
  @Get('document/:DocumentId')
  async getStockByDocId(@Param('DocumentId') DocumentId: string) {
    if (!DocumentId) {
      throw new BadRequestException('Invalid Document ID');
    }
    return this.stockServiceClient.send(
      { cmd: 'get_stock_by_doc_id' },
      { DocumentId },
    );
  }

  /*
    @Patch(':id')
    async updateStockDocument(
      @Param('id') id: number,
      @Body() updateStockDocumentDto: UpdateStockDocumentDto,
      @Request() req,
    ) {
      const email = req.user.email;
      return this.stockServiceClient.send(
        { cmd: 'update_stock' },
        { id, updateStockDocumentDto, email },
      );
    }
  
    @Delete(':id')
    async removeStockDocument(@Param('id') id: number, @Request() req) {
      const email = req.user.email;
      return this.stockServiceClient.send({ cmd: 'remove_stock' }, { id, email });
    }
    */
}
