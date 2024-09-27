export class DealStockDocumentLine {
  LineType: number;
  LineOrder: number;
  DocumentId: string;
  Id: string;
  Quantity: number;
  QuantityDecimalNumber: number;
  PricesDecimalNumber: number;
  Amount: number;
  IncludedAmount: number;
  IncludeAmountInCost: boolean;
  StorehouseId: string;
  TargetStorehouseId: string;
  DealId: string;
  ParentLineId: string;
  DescriptionClear: string;
  ItemId: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  DocumentLineId: string;
  TechnicalDescriptionClear: string;
  ConstructionSiteId: string;
  PickStockOperationType: number;
}
