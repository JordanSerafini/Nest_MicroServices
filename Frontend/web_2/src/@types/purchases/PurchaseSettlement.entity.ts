export class PurchaseSettlement {
  FinancialDiscountAmount: number;
  CurrencyFinancialDiscountAmount: number;
  ThirdId: string;
  SettlementDate: Date;
  PaymentTypeId: string;
  Amount: number;
  RemainingAmount: number;
  CurrencyRemainingAmount: number;
  ValidationState: number;
  IsDeposit: boolean;
  IsLiquidated: boolean;
  Id: string;
  LiquidationAccountingTransferState: number;
  AccountingTransferMode: number;
  CurrencyConversionRate: number;
  CurrencyAmount: number;
  CurrencyExchangeDifference: boolean;
  BillOfExchangeCommitmentId: string;
  BillOfExchangePointingId: string;
  BankRemittanceChargeAmounts0: number;
  BankRemittanceChargeAmounts1: number;
  BankRemittanceChargeAmounts2: number;
  BankRemittanceChargeAmounts3: number;
  BankRemittanceChargeAmounts4: number;
  PreviousLiquidationType: number;
  ThirdBankAccountId: string;
  AssociatedOrderId: string;
  AssociatedDeliveryId: string;
  AssociatedInvoiceId: string;
  CurrencyId: string;
  LiquidationAccountingExchangeGroupId: string;
  DisbursementId: string;
  Reference: string;
  DraweeReference: string;
  LiquidationAmount: number;
  TransferedLiquidationAmount: number;
  LiquidationStateChangeDate: Date;
  TransferedLiquidationStateChangeDate: Date;
  EconomicReasonId: string;
  RecoveredFrom: number;
  sysRecordVersion: number;
  sysRecordVersionId: string;
  AccountingExchangeGroupId: string;
  BankId: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  NotesClear: string;
  Notes: string;
  LiquidationCurrencyAmount: number;
  TransferedLiquidationCurrencyAmount: number;
  AcceptationId: number;
  BankRemittancePlannedDate: Date;
  BankRemittanceOperationDate: Date;
  FinancialDiscountId: string;
  sysEditCounter: number;
  AssociatedQuoteId: string;
  AssociatedProgressStateId: string;
}