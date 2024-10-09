export class PurchaseCommitment {
  GenerateSettlement: boolean;
  CurrencyAmount: number;
  CurrencyBalanceDue: number;
  LiquidationType: number;
  IsCorrected: boolean;
  Id: string;
  DueDate: Date;
  Amount: number;
  BalanceDue: number;
  IsDeposit: boolean;
  DaysNumber: number;
  CommitmentType: number;
  AccountingMonth: boolean;
  IsLiquidated: boolean;
  AccountingTransferState: number;
  LiquidationAmount: number;
  TransferedLiquidationAmount: number;
  DocumentType: number;
  LiquidationAccountingTransferState: number;
  LiquidationAccountingExchangeGroupId: string;
  ExternalDocumentId: string;
  DocumentSubType: number;
  LiquidationStateChangeDate: Date;
  TransferedLiquidationStateChangeDate: Date;
  AccountingExchangeGroupId: string;
  ThirdId: string;
  PaymentTypeId: string;
  DayOfMonth: number;
  PercentageDistribution: number;
  DocumentId: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  sysModuleId: string;
  sysDatabaseId: string;
  PreviousLiquidationType: number;
  LiquidationCurrencyAmount: number;
  TransferedLiquidationCurrencyAmount: number;
  CurrencyId: string;
  PaymentThirdId: string;
  WithoutSettlementGapAccountingEntry: boolean;
}
