export class DealPurchaseDocumentLine {
  QuantityDecimalNumber: number;
  PricesDecimalNumber: number;
  IncludeAmountInCost: boolean;
  PurchasePrice: number;
  Quantity: number;
  GrossInterestBase: number;
  Id: string;
  LineType: number;
  LineOrder: number;
  DocumentId: string;
  IncludedAmount: number;
  DescriptionClear: string;
  ItemId: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  ParentLineId: string;
  AmountVatExcluded: number;
  NetAmountVatExcludedWithDiscount: number;
  NetAmountVatIncludedWithDiscount: number;
  DealId: string;
  DocumentLineId: string;
  TechnicalDescriptionClear: string;
  ConstructionSiteId: string;
  HasCostDispatch: boolean;
  QuantityToInclude: number;
  CostAmount: number;
}
