export class CreateStockDocumentLineDto {
  id: number;

  ItemId: string;

  DocumentId: string;

  Quantity: number | string;

  DescriptionClear: string;

  StorehouseId: string;
}

export class UpdateStockDocumentLineDto {
  id?: number;

  ItemId?: string;

  DocumentId?: string;

  Quantity?: number | string;

  DescriptionClear?: string;

  StorehouseId?: string;
}

export class CreateStockDocumentDto {
  id: number;

  DocumentDate: Date;

  Id: string;

  NumberPrefix: string;

  NumberSuffix: string;

  StorehouseId: string;

  TotalWeight?: number | string;

  TotalVolume?: number | string;

  StockDocumentLines: CreateStockDocumentLineDto[];
}

export class UpdateStockDocumentDto {
  id?: number;

  DocumentDate?: Date;

  Id?: string;

  NumberPrefix?: string;

  NumberSuffix?: string;

  StorehouseId?: string;

  TotalWeight?: number | string;

  TotalVolume?: number | string;

  StockDocumentLines?: UpdateStockDocumentLineDto[];
}
