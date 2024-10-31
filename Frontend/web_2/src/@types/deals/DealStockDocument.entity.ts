export class DealStockDocument {
  IncludeAmountInCost: boolean;
  Amount: number;
  IncludedAmount: number;
  Id: string;
  DocumentId: string;
  DocumentNumber: string;
  DocumentDate: Date;
  DocumentType: number;
  StorehouseId: string;
  TargetStorehouseId: string;
  TransferedDocumentId: string;
  DealId: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  ConstructionSiteId: string;
  CreatedFromConstructionSiteConsumptions: boolean;
  PickStockOperationType: number;
  DocumentEditCounter: number;
}
