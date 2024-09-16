//import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @IsBoolean()
  DisallowOrderAssort: boolean | null;

  @IsOptional()
  @IsNumber()
  DueCommitmentsXDay: number | null;

  @IsOptional()
  @IsNumber()
  EffectOfTradeAmount: number | null;

  @IsOptional()
  @IsBoolean()
  GenerateVcs: boolean | null;

  @IsOptional()
  @IsNumber()
  InvoicingChargesAmount: number | null;

  @IsOptional()
  @IsBoolean()
  AutomaticStockBooking: boolean | null;

  @IsOptional()
  @IsNumber()
  CustomerToUseInCustomerProducts: number | null;

  @IsOptional()
  @IsNumber()
  ExtendedCurrentAmount: number | null;

  @IsOptional()
  @IsNumber()
  ThresholdBeforeExceedAmount: number | null;

  @IsOptional()
  @IsBoolean()
  UseInvoicingAddressAsDeliveryAddress: boolean | null;

  @IsOptional()
  @IsBoolean()
  UseInvoicingContactAsDeliveryContact: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainDeliveryAddress_NPAI: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainInvoicingAddress_NPAI: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainDeliveryContact_NaturalPerson: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainDeliveryContact_Optin: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainInvoicingContact_NaturalPerson: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainInvoicingContact_Optin: boolean | null;

  @IsOptional()
  @IsBoolean()
  NaturalPerson: boolean | null;

  @IsOptional()
  @IsString()
  TerritorialityId: string | null;

  @IsOptional()
  @IsNumber()
  FinancialDiscountType: number | null;

  @IsOptional()
  @IsNumber()
  FinancialDiscountRate: number | null;

  @IsOptional()
  @IsNumber()
  FinancialDiscountPaymentDelay: number | null;

  @IsOptional()
  @IsNumber()
  ActiveState: number | null;

  @IsOptional()
  @IsNumber()
  DiscountRate: number | null;

  @IsOptional()
  @IsNumber()
  SecondDiscountRate: number | null;

  @IsOptional()
  @IsNumber()
  AllowedAmount: number | null;

  @IsOptional()
  @IsNumber()
  CurrentAmount: number | null;

  @IsOptional()
  @IsNumber()
  InitialAmount: number | null;

  @IsOptional()
  @IsNumber()
  ExceedAmount: number | null;

  @IsOptional()
  @IsBoolean()
  MustRetrieveCommitmentsFromAccounting: boolean | null;

  @IsOptional()
  @IsBoolean()
  PriceWithTaxBased: boolean | null;

  @IsOptional()
  @IsBoolean()
  MustBeReminder: boolean | null;

  @IsOptional()
  @IsNumber()
  DayNumberToFirstReminder: number | null;

  @IsOptional()
  @IsNumber()
  DayNumberToSecondReminder: number | null;

  @IsOptional()
  @IsNumber()
  DayNumberToThirdReminder: number | null;

  @IsOptional()
  @IsBoolean()
  IsCustomerAccount: boolean | null;

  @IsOptional()
  @IsNumber()
  WebContactSendKind: number | null;

  @IsOptional()
  @IsBoolean()
  SubjectToRe: boolean | null;

  @IsOptional()
  @IsString()
  UniqueId: string | null;

  @IsOptional()
  @IsBoolean()
  CheckExceedCommitmentDate: boolean | null;

  @IsOptional()
  @IsBoolean()
  DisallowDeliveryAssort: boolean | null;

  @IsOptional()
  @IsBoolean()
  SendReminderToPayerThird: boolean | null;

  @IsOptional()
  @IsBoolean()
  Xx_EnvoiCarteVoeux: boolean | null;

  @IsOptional()
  @IsBoolean()
  AssortDeliveryByOrder: boolean | null;

  @IsOptional()
  @IsBoolean()
  CreatePosDeliveryOrderByDefault: boolean | null;

  @IsOptional()
  @IsNumber()
  LoyaltyOriginReportType: number | null;

  @IsOptional()
  @IsNumber()
  LoyaltyOriginReportValue: number | null;

  @IsOptional()
  @IsNumber()
  LoyaltyValue: number | null;

  @IsOptional()
  @IsDate()
  LoyaltyCardCreationDate: Date | null;

  @IsOptional()
  @IsNumber()
  LoyaltyCardValidityDuration: number | null;

  @IsOptional()
  @IsDate()
  LoyaltyCardExpiryDate: Date | null;

  @IsOptional()
  @IsDate()
  LoyaltyCardRenewalDate: Date | null;

  @IsOptional()
  @IsNumber()
  SysRecordVersion: number | null;

  @IsOptional()
  @IsString()
  SysRecordVersionId: string | null;

  @IsOptional()
  @IsNumber()
  SysEditCounter: number | null;

  @IsOptional()
  @IsString()
  SelectedReminderReport: string | null;

  @IsOptional()
  @IsNumber()
  IdentificationType: number | null;

  @IsOptional()
  @IsNumber()
  Type: number | null;

  @IsOptional()
  @IsString()
  Group1: string | null;

  @IsOptional()
  @IsString()
  Group2: string | null;

  @IsOptional()
  @IsDate()
  FirstInvoicingDate: Date | null;

  @IsOptional()
  @IsNumber()
  PaymentDate: number | null;

  @IsOptional()
  @IsNumber()
  MainDeliveryAddress_Longitude: number | null;

  @IsOptional()
  @IsNumber()
  MainDeliveryAddress_Latitude: number | null;

  @IsOptional()
  @IsDate()
  SysCreatedDate: Date | null;

  @IsOptional()
  @IsDate()
  SysModifiedDate: Date | null;

  @IsOptional()
  @IsString()
  TaxIds_0: string | null;

  @IsOptional()
  @IsString()
  TaxIds_1: string | null;

  @IsOptional()
  @IsString()
  TaxIds_2: string | null;

  @IsOptional()
  @IsString()
  InvoicingCharges_VatId: string | null;

  @IsOptional()
  @IsDate()
  LastInvoicingDate: Date | null;

  @IsOptional()
  @IsString()
  StorehouseId: string | null;

  @IsOptional()
  @IsNumber()
  SchedulerColor: number | null;

  @IsOptional()
  @IsBoolean()
  ShowTechnicalSheetOnFront: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainDeliveryContact_AllowUsePersonnalDatas: boolean | null;

  @IsOptional()
  @IsBoolean()
  MainInvoicingContact_AllowUsePersonnalDatas: boolean | null;

  @IsOptional()
  @IsBoolean()
  AllowUsePersonnalDatas: boolean | null;

  @IsOptional()
  @IsNumber()
  LoyaltyCumulativeTurnoverReport: number | null;

  @IsOptional()
  @IsNumber()
  LoyaltyCumulativeTurnover: number | null;

  @IsOptional()
  @IsNumber()
  DepositPercentage: number | null;

  @IsOptional()
  @IsNumber()
  SecurityBondRate: number | null;

  @IsOptional()
  @IsNumber()
  SecurityBondRateForGoodCompletedWork: number | null;

  @IsOptional()
  @IsString()
  DefaultBankAccountId: string | null;

  // Text fields
  @IsOptional()
  @IsString()
  MainInvoicingContact_Civility: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Name: string | null;

  @IsOptional()
  @IsString()
  ThirdLanguage: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Firstname: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Phone: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Cellphone: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Fax: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Email: string | null;

  @IsOptional()
  @IsString()
  Name: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Function: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_Department: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Website: string | null;

  @IsOptional()
  @IsString()
  DocumentPrintMention: string | null;

  @IsOptional()
  @IsString()
  Nic: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Civility: string | null;

  @IsOptional()
  @IsString()
  Id: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Name: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Firstname: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Phone: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_CellPhone: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Fax: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Email: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Function: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_Department: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Website: string | null;

  @IsOptional()
  @IsString()
  Accounts_AuxiliaryAccount: string | null;

  @IsOptional()
  @IsString()
  Accounts_DoubtfulAccount: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Address1: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Address2: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Address3: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Address4: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Zipcode: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_City: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_State: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Countryisocode: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Description: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Civility: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingAddress_Thirdname: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Address1: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Address2: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Address3: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Address4: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Zipcode: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_City: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_State: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Countryisocode: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Description: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Civility: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryAddress_Thirdname: string | null;

  @IsOptional()
  @IsString()
  LoyaltyCard_Type: string | null;

  @IsOptional()
  @IsString()
  LoyaltyCard_Id: string | null;

  @IsOptional()
  @IsString()
  Gocardless_ThirdId: string | null;

  @IsOptional()
  @IsString()
  SysCreatedUser: string | null;

  @IsOptional()
  @IsString()
  TravelExpenseId: string | null;

  @IsOptional()
  @IsString()
  SysModifiedUser: string | null;

  @IsOptional()
  @IsString()
  NotesClear: string | null;

  @IsOptional()
  @IsString()
  Notes: string | null;

  @IsOptional()
  @IsString()
  Accounts_BillofexchangeAccountingAccount: string | null;

  @IsOptional()
  @IsString()
  Accounts_SecurityBondAccount: string | null;

  @IsOptional()
  @IsString()
  ShippingId: string | null;

  @IsOptional()
  @IsString()
  DocumentSerialId: string | null;

  @IsOptional()
  @IsString()
  Accounts_SecurityBondForGoodCompletedWorkAccount: string | null;

  @IsOptional()
  @IsString()
  AnalyticAccountingGridId: string | null;

  @IsOptional()
  @IsString()
  BuyerReference: string | null;

  @IsOptional()
  @IsString()
  Accounts_Account: string | null;

  @IsOptional()
  @IsString()
  CurrencyId: string | null;

  @IsOptional()
  @IsString()
  PaymentThirdId: string | null;

  @IsOptional()
  @IsString()
  InvoicingThirdId: string | null;

  @IsOptional()
  @IsString()
  ColleagueId: string | null;

  @IsOptional()
  @IsString()
  TechnicalSheetClear: string | null;

  @IsOptional()
  @IsString()
  SettlementModeId: string | null;

  @IsOptional()
  @IsString()
  TechnicalSheet: string | null;

  @IsOptional()
  @IsString()
  PricelistCategoryId: string | null;

  @IsOptional()
  @IsString()
  Siren: string | null;

  @IsOptional()
  @IsString()
  Naf: string | null;

  @IsOptional()
  @IsString()
  FamilyId: string | null;

  @IsOptional()
  @IsString()
  SubfamilyId: string | null;

  @IsOptional()
  @IsString()
  IntracommunityVatNumber: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_ExternalId_GoogleId: string | null;

  @IsOptional()
  @IsString()
  MainInvoicingContact_ExternalId_OutlookId: string | null;

  @IsOptional()
  @IsString()
  Civility: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_ExternalId_GoogleId: string | null;

  @IsOptional()
  @IsString()
  MainDeliveryContact_ExternalId_OutlookId: string | null;

  @IsOptional()
  @IsString()
  Lat: string | null;

  @IsOptional()
  @IsString()
  Lon: string | null;
}

//export class CreateCustomerPartialDto extends PartialType(CreateCustomerDto) {}
