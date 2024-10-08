export class DealItem {
  ItemType: number;
  Quantity: number;
  Id: string;
  ItemId: string;
  ItemCaption: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  AmountVatExcluded: number;
  NetAmountVatExcludedWithDiscount: number;
  InterestAmount: number;
  NetInterestAmount: number;
  GrossInterestAmount: number;
  DealId: string;
  ConstructionSiteId: string;
  TotalConsumedQuantity: number;
  TotalConsumedAmount: number;
}
