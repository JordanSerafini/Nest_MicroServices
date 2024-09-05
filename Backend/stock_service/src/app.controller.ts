import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StockService } from './app.service';
import { CreateStockDocumentDto } from './dto/create-stock.dto';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // Créer un document de stock
  @MessagePattern({ cmd: 'create_stock' })
  create(
    @Payload()
    {
      createStockDto,
      email,
    }: {
      createStockDto: CreateStockDocumentDto;
      email: string;
    },
  ) {
    return this.stockService.create(createStockDto, email);
  }

  // Récupérer tous les documents de stock
  @MessagePattern({ cmd: 'find_all_stocks' })
  findAll(@Payload() email: string) {
    return this.stockService.findAll(email);
  }

  // Pagination des documents de stock
  @MessagePattern({ cmd: 'paginate_stocks' })
  paginate(
    @Payload()
    {
      paginationParams,
      email,
    }: {
      paginationParams: { limit: number; offset: number; searchQuery: string };
      email: string;
    },
  ) {
    return this.stockService.paginate({ paginationParams, email });
  }

  // Récupérer un document de stock par ID
  @MessagePattern({ cmd: 'find_one_stock' })
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

    return this.stockService.findOne(parsedId, email);
  }

  // Récupérer toutes les lignes de document de stock
  @MessagePattern({ cmd: 'get_all_stock_doc_lines' })
  getAllStockDocLines() {
    return this.stockService.getAllStockDocLines();
  }

  // Récupérer tous les entrepôts
  @MessagePattern({ cmd: 'get_all_storehouses' })
  getAllStorehouses() {
    return this.stockService.getAllStoreHouse();
  }

  // Récupérer le nom d'un entrepôt par ID
  @MessagePattern({ cmd: 'get_storehouse_name_by_id' })
  getStorehouseNameById(@Payload() { id }: { id: string }) {
    if (!id) {
      console.error(`ID is missing or invalid: ${id}`);
      throw new BadRequestException(`Invalid ID: ${id}`);
    }
    return this.stockService.getStorehouseNameById(id);
  }

  // Récupérer tous les stocks avec leurs détails
  @MessagePattern({ cmd: 'get_all_stock_with_details' })
  getAllStockWithDetails() {
    return this.stockService.getAllStockWithDetails();
  }

  // Récupérer un stock avec ses détails par son DocumentId
  @MessagePattern({ cmd: 'get_stock_with_details_by_document_id' })
  getStockWithDetailsByDocumentId(
    @Payload() { DocumentId }: { DocumentId: string },
  ) {
    if (!DocumentId) {
      console.error(`Document ID is missing or invalid: ${DocumentId}`);
      throw new BadRequestException(`Invalid Document ID: ${DocumentId}`);
    }
    return this.stockService.getStockWithDetailsByDocumentId(DocumentId);
  }

  // Récupérer les stocks dans une plage de dates
  @MessagePattern({ cmd: 'get_stock_within_date_range' })
  getStockWithinDateRange(
    @Payload() { startDate, endDate }: { startDate: string; endDate: string },
  ) {
    if (!startDate || !endDate) {
      console.error(`Invalid date range: ${startDate} to ${endDate}`);
      throw new BadRequestException('Invalid date range');
    }
    return this.stockService.getStockWithinDateRange(startDate, endDate);
  }

  // Récupérer les lignes de document de stock par DocumentId
  @MessagePattern({ cmd: 'get_stock_document_line_by_doc_id' })
  getStockDocumentLineByDocId(
    @Payload() { DocumentId }: { DocumentId: string },
  ) {
    if (!DocumentId) {
      console.error(`Document ID is missing or invalid: ${DocumentId}`);
      throw new BadRequestException(`Invalid Document ID: ${DocumentId}`);
    }
    return this.stockService.getStockDocumentLineByDocId(DocumentId);
  }

  // Récupérer un stock par son DocumentId
  @MessagePattern({ cmd: 'get_stock_by_doc_id' })
  getStockByDocId(@Payload() { DocumentId }: { DocumentId: string }) {
    if (!DocumentId) {
      console.error(`Document ID is missing or invalid: ${DocumentId}`);
      throw new BadRequestException(`Invalid Document ID: ${DocumentId}`);
    }
    return this.stockService.getStockByDocId(DocumentId);
  }

  /*
  @MessagePattern({ cmd: 'update_stock' })
  update(
    @Payload()
    {
      id,
      updateStockDto,
      email,
    }: {
      id: string;
      updateStockDto: UpdateStockDocumentDto;
      email: string;
    },
  ) {
    return this.stockService.update(+id, updateStockDto, email);
  }

  @MessagePattern({ cmd: 'remove_stock' })
  remove(@Payload() { id, email }: { id: string; email: string }) {
    return this.stockService.remove(+id, email);
  }
    */
}
