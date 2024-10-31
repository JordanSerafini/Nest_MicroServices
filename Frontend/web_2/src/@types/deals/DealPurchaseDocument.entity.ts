export class DealPurchaseDocument {
  Id: string;
  DocumentId: string;
  DocumentNumber: string;
  DocumentDate: Date;
  InvoiceCorrectionType: number;
  DocumentType: number;
  SupplierId: string;
  SupplierName: string;
  IncludeAmountInCost: boolean;
  IncludedAmount: number;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  DocumentState: number;
  TransferedDocumentId: string;
  AmountVatExcluded: number;
  NetAmountVatExcludedWithDiscount: number;
  DocumentTotalAmountVatExcludedWithDiscount: number;
  NetAmountVatIncludedWithDiscount: number;
  DealId: string;
  ConstructionSiteId: string;
  GlobalDocumentState: string;
  DocumentEditCounter: number;
}
