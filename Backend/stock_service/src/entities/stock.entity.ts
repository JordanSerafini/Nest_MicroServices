export class StockDocumentLine {
  id: number;
  ItemId: string;
  DocumentId: string;
  Quantity: number | string;
  DescriptionClear: string;
  StorehouseId: string;

  constructor(
    id: number,
    ItemId: string,
    DocumentId: string,
    Quantity: number | string,
    DescriptionClear: string,
    StorehouseId: string,
  ) {
    this.id = id;
    this.ItemId = ItemId;
    this.DocumentId = DocumentId;
    this.Quantity = Quantity;
    this.DescriptionClear = DescriptionClear;
    this.StorehouseId = StorehouseId;
  }

  // Méthode optionnelle pour afficher les détails d'une ligne
  toString(): string {
    return `StockDocumentLine: ItemId=${this.ItemId}, Quantity=${this.Quantity}`;
  }
}

export class StockDocument {
  id: number;
  DocumentDate: Date;
  Id: string;
  NumberPrefix: string;
  NumberSuffix: string;
  StorehouseId: string;
  TotalWeight?: number | string;
  TotalVolume?: number | string;
  StockDocumentLines: StockDocumentLine[];

  constructor(
    id: number,
    DocumentDate: Date,
    Id: string,
    NumberPrefix: string,
    NumberSuffix: string,
    StorehouseId: string,
    TotalWeight: number | string | undefined,
    TotalVolume: number | string | undefined,
    StockDocumentLines: StockDocumentLine[],
  ) {
    this.id = id;
    this.DocumentDate = DocumentDate;
    this.Id = Id;
    this.NumberPrefix = NumberPrefix;
    this.NumberSuffix = NumberSuffix;
    this.StorehouseId = StorehouseId;
    this.TotalWeight = TotalWeight;
    this.TotalVolume = TotalVolume;
    this.StockDocumentLines = StockDocumentLines;
  }

  // Méthode optionnelle pour afficher les détails du document
  toString(): string {
    return `StockDocument: Id=${this.Id}, Number=${this.NumberPrefix}-${this.NumberSuffix}, TotalWeight=${this.TotalWeight}, TotalVolume=${this.TotalVolume}`;
  }
}
