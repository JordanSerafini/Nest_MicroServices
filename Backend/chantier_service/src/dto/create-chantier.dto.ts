import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateConstructionSiteDto {
  @IsOptional()
  @IsNumber()
  ProfitsOnDuration: number;

  @IsOptional()
  @IsDate()
  sysCreatedDate: Date;

  @IsOptional()
  @IsNumber()
  PredictedSales: number;

  @IsOptional()
  @IsNumber()
  PredictedGrossMargin: number;

  @IsOptional()
  @IsNumber()
  PredictedDuration: number;

  @IsOptional()
  @IsNumber()
  AccomplishedCosts: number;

  @IsOptional()
  @IsNumber()
  AccomplishedSales: number;

  @IsOptional()
  @IsNumber()
  AccomplishedGrossMargin: number;

  @IsOptional()
  @IsNumber()
  AccomplishedDuration: number;

  @IsOptional()
  @IsNumber()
  ProfitsOnCosts: number;

  @IsOptional()
  @IsNumber()
  ProfitsOnSales: number;

  @IsOptional()
  @IsNumber()
  ProfitsOnGrossMargin: number;

  @IsOptional()
  @IsNumber()
  ActualTreasury: number;

  @IsOptional()
  @IsNumber()
  CustomerCommitmentBalanceDues: number;

  @IsOptional()
  @IsNumber()
  SupplierCommitmentBalanceDues: number;

  @IsOptional()
  @IsNumber()
  SubContractorCommitmentBalanceDues: number;

  @IsOptional()
  @IsNumber()
  OtherCosts: number;

  @IsOptional()
  @IsNumber()
  TreasuryBalanceDue: number;

  @IsOptional()
  @IsUUID()
  ReferenceDocumentId: string;

  @IsOptional()
  @IsUUID()
  ConstructionSiteReferenceDocumentId: string;

  @IsOptional()
  @IsDate()
  StartDate: Date;

  @IsOptional()
  @IsDate()
  EndDate: Date;

  @IsOptional()
  @IsNumber()
  Status: number;

  @IsOptional()
  @IsNumber()
  DeliveryAddressType: number;

  @IsOptional()
  @IsNumber()
  ManagementStockType: number;

  @IsOptional()
  @IsUUID()
  StorehouseId: string;

  @IsOptional()
  @IsBoolean()
  UseConstructionSiteAddressAsDeliveryAddressForSales: boolean;

  @IsOptional()
  @IsUUID()
  ConstructionSiteAddressId: string;

  @IsOptional()
  @IsBoolean()
  ConstructionSiteAddress_Npai: boolean;

  @IsOptional()
  @IsNumber()
  ConstructionSiteAddress_Longitude: number;

  @IsOptional()
  @IsNumber()
  ConstructionSiteAddress_Latitude: number;

  @IsOptional()
  @IsUUID()
  InvoicingAddressId: string;

  @IsOptional()
  @IsBoolean()
  InvoicingAddress_Npai: boolean;

  @IsOptional()
  @IsNumber()
  InvoicingAddress_Longitude: number;

  @IsOptional()
  @IsNumber()
  InvoicingAddress_Latitude: number;

  @IsOptional()
  @IsString()
  Description: string;

  @IsOptional()
  @IsNumber()
  GlobalCost: number;

  @IsOptional()
  @IsString()
  CustomerId: string;

  @IsOptional()
  @IsString()
  sysCreatedUser: string;

  @IsOptional()
  @IsString()
  sysModifiedUser: string;

  @IsOptional()
  @IsString()
  Notes: string;
}

export class ConstructionSiteAssociatedFilesDTO {
  @IsOptional()
  @IsNumber()
  StorageType?: number;

  @IsOptional()
  @IsDate()
  sysCreatedDate?: Date;

  @IsOptional()
  @IsDate()
  sysModifiedDate?: Date;

  @IsOptional()
  @IsUUID()
  Id?: string;

  @IsOptional()
  Content?: Buffer;

  @IsOptional()
  @IsNumber()
  DocumentType?: number;

  @IsOptional()
  @IsNumber()
  sysEditCounter?: number;

  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  OneDriveItemId?: string;

  @IsOptional()
  @IsString()
  OneDriveCode?: string;

  @IsOptional()
  @IsString()
  sysCreatedUser?: string;

  @IsOptional()
  @IsString()
  TypeMime?: string;

  @IsOptional()
  @IsString()
  sysModifiedUser?: string;

  @IsOptional()
  @IsString()
  OneDriveShareUrl?: string;

  @IsOptional()
  @IsString()
  ParentId?: string;

  @IsOptional()
  @IsString()
  Name?: string;
}

export class ConstructionSiteReferenceDocumentDto {
  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsDate()
  sysCreatedDate?: Date;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyConversionRate?: number;

  @IsOptional()
  @IsNumber()
  CurrencyTotalDueAmount?: number;

  @IsOptional()
  @IsNumber()
  CommitmentsCurrencyBalanceDue?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyApplicationType?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcludedWithDiscountAndShipping?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountWithFinancialDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyShippingAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcludedWithDiscountAndShippingWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyFinancialDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyVatAmountWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyVatAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  ShippingAmountInclusionType?: number;

  @IsOptional()
  @IsBoolean()
  Printed?: boolean;

  @IsOptional()
  @IsUUID()
  AppliedPriceListLineId?: string;

  @IsOptional()
  @IsBoolean()
  SubjectToRE?: boolean;

  @IsOptional()
  @IsNumber()
  REAmount?: number;

  @IsOptional()
  @IsNumber()
  TotalNetWeight?: number;

  @IsOptional()
  @IsNumber()
  CorrectionType?: number;

  @IsOptional()
  @IsNumber()
  IRPFAmount?: number;

  @IsOptional()
  @IsNumber()
  IRPFRate?: number;

  @IsOptional()
  @IsNumber()
  IdentificationType?: number;

  @IsOptional()
  @IsBoolean()
  AutomaticSettlementGeneration?: boolean;

  @IsOptional()
  @IsNumber()
  RemainingDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  RemainingDepositCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  DeliveryOrderPreparationState?: number;

  @IsOptional()
  @IsNumber()
  ReturnOrderPreparationState?: number;

  @IsOptional()
  @IsNumber()
  RemainingAmountToDeliver?: number;

  @IsOptional()
  @IsNumber()
  RemainingAmountToDeliverVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  TaxIds0?: string;

  @IsOptional()
  @IsUUID()
  TaxIds1?: string;

  @IsOptional()
  @IsUUID()
  TaxIds2?: string;

  @IsOptional()
  @IsBoolean()
  SendedByMail?: boolean;

  @IsOptional()
  @IsBoolean()
  KeepDepositVatAmount?: boolean;

  @IsOptional()
  @IsBoolean()
  IsStructuredSepaCommunication?: boolean;

  @IsOptional()
  @IsBoolean()
  InvoicingChargesNotSubjectToFinancialDiscount?: boolean;

  @IsOptional()
  @IsNumber()
  InvoicingChargesAmountVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  InvoicingChargesVatId?: string;

  @IsOptional()
  @IsNumber()
  CurrencyInvoicingChargesAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  LoadFabricationComponentsMode?: number;

  @IsOptional()
  @IsBoolean()
  FixedShippingAmount?: boolean;

  @IsOptional()
  @IsBoolean()
  DoNotCreateMovement?: boolean;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionMode?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeBase?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeTotalAmount?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributedAmount?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionRates_GoodDistributeRate?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionRates_ServiceDistributeRate?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionRates_EquipmentDistributeRate?: number;

  @IsOptional()
  @IsDate()
  LastRefreshPurchaseStateDate?: Date;

  @IsOptional()
  @IsNumber()
  DocumentType?: number;

  @IsOptional()
  @IsNumber()
  OriginDocumentType?: number;

  @IsOptional()
  @IsNumber()
  InterestAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  InterestRate?: number;

  @IsOptional()
  @IsNumber()
  Priority?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceTotalAmount?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceAmountSettledByOther?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceAmountSettledByCESU?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceAmountSettledByCESUP?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceDeductibleAmount?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestBase?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestRate?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  BrandRate?: number;

  @IsOptional()
  @IsNumber()
  NetBrandRate?: number;

  @IsOptional()
  @IsNumber()
  DeliveryAddressType?: number;

  @IsOptional()
  @IsBoolean()
  CountermarForcedkOnLines?: boolean;

  @IsOptional()
  @IsUUID()
  DocumentOptionsId?: string;

  @IsOptional()
  @IsNumber()
  sysEditCounter?: number;

  @IsOptional()
  @IsNumber()
  sysRecordVersion?: number;

  @IsOptional()
  @IsUUID()
  sysRecordVersionId?: string;

  @IsOptional()
  @IsUUID()
  sysModuleId?: string;

  @IsOptional()
  @IsUUID()
  sysDatabaseId?: string;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount0_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount1_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount2_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount3_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount4_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount5_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  CustomerHeadOfficeAddressId?: string;

  @IsOptional()
  @IsDate()
  sysModifiedDate?: Date;

  @IsOptional()
  @IsUUID()
  Id?: string;

  @IsOptional()
  @IsNumber()
  NumberSuffix?: number;

  @IsOptional()
  @IsDate()
  DocumentDate?: Date;

  @IsOptional()
  @IsNumber()
  GlobalDocumentOrder?: number;

  @IsOptional()
  @IsUUID()
  StorehouseId?: string;

  @IsOptional()
  @IsBoolean()
  DispatchedByStorehouse?: boolean;

  @IsOptional()
  @IsUUID()
  TransferedDocumentId?: string;

  @IsOptional()
  @IsNumber()
  TotalVolume?: number;

  @IsOptional()
  @IsNumber()
  TotalWeight?: number;

  @IsOptional()
  @IsNumber()
  RecoveredFrom?: number;

  @IsOptional()
  @IsBoolean()
  ModifiedSinceRecovery?: boolean;

  @IsOptional()
  @IsUUID()
  Hash_ChainedId?: string;

  @IsOptional()
  Hash_Hash?: Buffer; // Pas de validation ici

  @IsOptional()
  @IsUUID()
  AssociatedInvoiceId?: string;

  @IsOptional()
  @IsUUID()
  AssociatedDeliveryOrderId?: string;

  @IsOptional()
  @IsUUID()
  AssociatedOrderId?: string;

  @IsOptional()
  @IsUUID()
  TerritorialityId?: string;

  @IsOptional()
  @IsUUID()
  VatId?: string;

  @IsOptional()
  @IsUUID()
  InvoicingAddressId?: string;

  @IsOptional()
  @IsUUID()
  InvoicingContactId?: string;

  @IsOptional()
  @IsUUID()
  DeliveryAddressId?: string;

  @IsOptional()
  @IsUUID()
  DeliveryContactId?: string;

  @IsOptional()
  @IsBoolean()
  InvoicingAddress_Npai?: boolean;

  @IsOptional()
  @IsNumber()
  InvoicingAddress_Longitude?: number;

  @IsOptional()
  @IsNumber()
  InvoicingAddress_Latitude?: number;

  @IsOptional()
  @IsBoolean()
  DeliveryAddress_Npai?: boolean;

  @IsOptional()
  @IsNumber()
  DeliveryAddress_Longitude?: number;

  @IsOptional()
  @IsNumber()
  DeliveryAddress_Latitude?: number;

  @IsOptional()
  @IsBoolean()
  UseInvoicingAddressAsDeliveryAddress?: boolean;

  @IsOptional()
  @IsBoolean()
  UseInvoicingContactAsDeliveryContact?: boolean;

  @IsOptional()
  @IsNumber()
  ValidationState?: number;

  @IsOptional()
  @IsNumber()
  DocumentState?: number;

  @IsOptional()
  @IsDate()
  ValidityDate?: Date;

  @IsOptional()
  @IsDate()
  DeliveryDate?: Date;

  @IsOptional()
  @IsNumber()
  DeliveryState?: number;

  @IsOptional()
  @IsNumber()
  ReturnState?: number;

  @IsOptional()
  @IsNumber()
  CommitmentsBalanceDue?: number;

  @IsOptional()
  @IsNumber()
  CostPrice?: number;

  @IsOptional()
  @IsNumber()
  DiscountRate?: number;

  @IsOptional()
  @IsNumber()
  DiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  AmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  AmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsBoolean()
  ShippingNotSubjectToFinancialDiscount?: boolean;

  @IsOptional()
  @IsNumber()
  ShippingAmountVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  ShippingVatId?: string;

  @IsOptional()
  @IsNumber()
  AmountVatExcludedWithDiscountAndShipping?: number;

  @IsOptional()
  @IsNumber()
  AmountVatExcludedWithDiscountAndShippingWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  VatAmountWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  VatAmount?: number;

  @IsOptional()
  @IsNumber()
  AmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  PreviousDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DepositCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  PreviousDepositCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  TotalDueAmount?: number;

  @IsOptional()
  @IsBoolean()
  IsEcotaxAmountIncludedToDueAmount?: boolean;

  @IsOptional()
  @IsNumber()
  EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount0_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount1_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount2_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount3_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount4_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount5_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  AccountingExchangeGroupId?: string;

  @IsOptional()
  @IsBoolean()
  PriceWithTaxBased?: boolean;

  @IsOptional()
  @IsNumber()
  VatMode?: number;

  @IsOptional()
  @IsNumber()
  NumberOfPackage?: number;

  @IsOptional()
  @IsBoolean()
  IsCustomNumberOfPackage?: boolean;

  @IsOptional()
  @IsNumber()
  OtherTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxAmountNotSubjectToVat?: number;

  @IsOptional()
  @IsNumber()
  CurrencyOtherTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyOtherTaxAmountNotSubjectToVat?: number;

  @IsOptional()
  @IsNumber()
  FinancialDiscountType?: number;

  @IsOptional()
  @IsNumber()
  FinancialDiscountRate?: number;

  @IsOptional()
  @IsNumber()
  FinancialDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  AmountWithFinancialDiscount?: number;

  @IsOptional()
  @IsUUID()
  ReportId?: string;

  @IsOptional()
  @IsNumber()
  NumberOfCopies?: number;

  @IsOptional()
  @IsUUID()
  ThirdBankAccountId?: string;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount0_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount1_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount2_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount3_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount4_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_CurrencyBaseAmount?: number;

  @IsNumber()
  id: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount5_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsString()
  sysCreatedUser?: string;

  @IsOptional()
  @IsString()
  IntrastatIncoterm?: string;

  @IsOptional()
  @IsString()
  sysModifiedUser?: string;

  @IsOptional()
  @IsString()
  NotesClear?: string;

  @IsOptional()
  @IsString()
  Notes?: string;

  @IsOptional()
  @IsString()
  ColleagueId?: string;

  @IsOptional()
  @IsString()
  DocumentNumber?: string;

  @IsOptional()
  @IsString()
  NumberPrefix?: string;

  @IsOptional()
  @IsString()
  PriceListCategory?: string;

  @IsOptional()
  @IsString()
  OrderThirdId?: string;

  @IsOptional()
  @IsString()
  OriginDocumentNumber?: string;

  @IsOptional()
  @IsString()
  ShippingId?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount1_TaxCaption?: string;

  @IsOptional()
  @IsString()
  CompanyBankId?: string;

  @IsOptional()
  @IsString()
  CurrencyId?: string;

  @IsOptional()
  @IsString()
  DocumentLanguage?: string;

  @IsOptional()
  @IsString()
  Reference?: string;

  @IsOptional()
  @IsString()
  CorrectionCause?: string;

  @IsOptional()
  @IsString()
  CorrectionReasonId?: string;

  @IsOptional()
  @IsString()
  DealId?: string;

  @IsOptional()
  @IsString()
  SerialId?: string;

  @IsOptional()
  @IsString()
  MaintenanceContractId?: string;

  @IsOptional()
  @IsString()
  IncidentId?: string;

  @IsOptional()
  @IsString()
  ConstructionSiteId?: string;

  @IsOptional()
  @IsString()
  SepaCommunication?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount2_TaxCaption?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_CodeINSEE?: string;

  @IsOptional()
  @IsString()
  ReverseChargeMention?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_CityINSEE?: string;

  @IsOptional()
  @IsString()
  PaymentTypeId?: string;

  @IsOptional()
  @IsString()
  Revision?: string;

  @IsOptional()
  @IsString()
  ThirdIdToDeliver?: string;

  @IsOptional()
  @IsString()
  BankId?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Profession?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount3_TaxCaption?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address1?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address2?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address3?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address4?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_ZipCode?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_City?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_State?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_CountryIsoCode?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Description?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Civility?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_ThirdName?: string;

  @IsOptional()
  @IsString()
  CustomerId?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_WebSite?: string;

  @IsOptional()
  @IsString()
  CustomerName?: string;

  @IsOptional()
  @IsString()
  CustomerCivility?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Civility?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Name?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_FirstName?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Phone?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_CellPhone?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Fax?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Email?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Function?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Department?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address1?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address2?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address3?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address4?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_ZipCode?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_City?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_State?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_CountryIsoCode?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Description?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Civility?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_ThirdName?: string;

  @IsOptional()
  @IsString()
  CustomerIntracommunityVatNumber?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_WebSite?: string;

  @IsOptional()
  @IsString()
  PaymentThirdId?: string;

  @IsOptional()
  @IsString()
  InvoicingThirdId?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Civility?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Name?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_FirstName?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Phone?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_CellPhone?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Fax?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Email?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Function?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Department?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount4_TaxCaption?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Profession?: string;

  @IsOptional()
  @IsString()
  SettlementModeId?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_CodeINSEE?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_CityINSEE?: string;

  @IsOptional()
  @IsString()
  IntervenerId?: string;

  @IsOptional()
  @IsString()
  IntrastatTransportMode?: string;

  @IsOptional()
  @IsString()
  IntrastatTransactionNature?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount0_TaxCaption?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount5_TaxCaption?: string;
}

export class ConstructionSiteReferenceDocumentExDto {
  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsDate()
  sysCreatedDate?: Date;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyConversionRate?: number;

  @IsOptional()
  @IsNumber()
  CurrencyTotalDueAmount?: number;

  @IsOptional()
  @IsNumber()
  CommitmentsCurrencyBalanceDue?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyApplicationType?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcludedWithDiscountAndShipping?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountWithFinancialDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyShippingAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyAmountVatExcludedWithDiscountAndShippingWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyFinancialDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyVatAmountWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyVatAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  ShippingAmountInclusionType?: number;

  @IsOptional()
  @IsBoolean()
  Printed?: boolean;

  @IsOptional()
  @IsUUID()
  AppliedPriceListLineId?: string;

  @IsOptional()
  @IsBoolean()
  SubjectToRE?: boolean;

  @IsOptional()
  @IsNumber()
  REAmount?: number;

  @IsOptional()
  @IsNumber()
  TotalNetWeight?: number;

  @IsOptional()
  @IsNumber()
  CorrectionType?: number;

  @IsOptional()
  @IsNumber()
  IRPFAmount?: number;

  @IsOptional()
  @IsNumber()
  IRPFRate?: number;

  @IsOptional()
  @IsNumber()
  IdentificationType?: number;

  @IsOptional()
  @IsBoolean()
  AutomaticSettlementGeneration?: boolean;

  @IsOptional()
  @IsNumber()
  RemainingDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  RemainingDepositCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  DeliveryOrderPreparationState?: number;

  @IsOptional()
  @IsNumber()
  ReturnOrderPreparationState?: number;

  @IsOptional()
  @IsNumber()
  RemainingAmountToDeliver?: number;

  @IsOptional()
  @IsNumber()
  RemainingAmountToDeliverVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  TaxIds0?: string;

  @IsOptional()
  @IsUUID()
  TaxIds1?: string;

  @IsOptional()
  @IsUUID()
  TaxIds2?: string;

  @IsOptional()
  @IsBoolean()
  SendedByMail?: boolean;

  @IsOptional()
  @IsBoolean()
  KeepDepositVatAmount?: boolean;

  @IsOptional()
  @IsBoolean()
  IsStructuredSepaCommunication?: boolean;

  @IsOptional()
  @IsBoolean()
  InvoicingChargesNotSubjectToFinancialDiscount?: boolean;

  @IsOptional()
  @IsNumber()
  InvoicingChargesAmountVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  InvoicingChargesVatId?: string;

  @IsOptional()
  @IsNumber()
  CurrencyInvoicingChargesAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  LoadFabricationComponentsMode?: number;

  @IsOptional()
  @IsBoolean()
  FixedShippingAmount?: boolean;

  @IsOptional()
  @IsBoolean()
  DoNotCreateMovement?: boolean;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionMode?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeBase?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeTotalAmount?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributedAmount?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionRates_GoodDistributeRate?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionRates_ServiceDistributeRate?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeDistributionRates_EquipmentDistributeRate?: number;

  @IsOptional()
  @IsDate()
  LastRefreshPurchaseStateDate?: Date;

  @IsOptional()
  @IsNumber()
  DocumentType?: number;

  @IsOptional()
  @IsNumber()
  OriginDocumentType?: number;

  @IsOptional()
  @IsNumber()
  InterestAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  InterestRate?: number;

  @IsOptional()
  @IsNumber()
  Priority?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceTotalAmount?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceAmountSettledByOther?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceAmountSettledByCESU?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceAmountSettledByCESUP?: number;

  @IsOptional()
  @IsNumber()
  HumanServiceDeductibleAmount?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestBase?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestRate?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  BrandRate?: number;

  @IsOptional()
  @IsNumber()
  NetBrandRate?: number;

  @IsOptional()
  @IsNumber()
  DeliveryAddressType?: number;

  @IsOptional()
  @IsBoolean()
  CountermarForcedkOnLines?: boolean;

  @IsOptional()
  @IsUUID()
  DocumentOptionsId?: string;

  @IsOptional()
  @IsNumber()
  sysEditCounter?: number;

  @IsOptional()
  @IsNumber()
  sysRecordVersion?: number;

  @IsOptional()
  @IsUUID()
  sysRecordVersionId?: string;

  @IsOptional()
  @IsUUID()
  sysModuleId?: string;

  @IsOptional()
  @IsUUID()
  sysDatabaseId?: string;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount0_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount1_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount2_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount3_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount4_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount5_VatId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_VatAmount?: number;

  @IsOptional()
  @IsUUID()
  CustomerHeadOfficeAddressId?: string;

  @IsOptional()
  @IsDate()
  sysModifiedDate?: Date;

  @IsOptional()
  @IsUUID()
  Id?: string;

  @IsOptional()
  @IsNumber()
  NumberSuffix?: number;

  @IsOptional()
  @IsDate()
  DocumentDate?: Date;

  @IsOptional()
  @IsNumber()
  GlobalDocumentOrder?: number;

  @IsOptional()
  @IsUUID()
  StorehouseId?: string;

  @IsOptional()
  @IsBoolean()
  DispatchedByStorehouse?: boolean;

  @IsOptional()
  @IsUUID()
  TransferedDocumentId?: string;

  @IsOptional()
  @IsNumber()
  TotalVolume?: number;

  @IsOptional()
  @IsNumber()
  TotalWeight?: number;

  @IsOptional()
  @IsNumber()
  RecoveredFrom?: number;

  @IsOptional()
  @IsBoolean()
  ModifiedSinceRecovery?: boolean;

  @IsOptional()
  @IsUUID()
  Hash_ChainedId?: string;

  @IsOptional()
  Hash_Hash?: Buffer; // Pas de validation ici

  @IsOptional()
  @IsUUID()
  AssociatedInvoiceId?: string;

  @IsOptional()
  @IsUUID()
  AssociatedDeliveryOrderId?: string;

  @IsOptional()
  @IsUUID()
  AssociatedOrderId?: string;

  @IsOptional()
  @IsUUID()
  TerritorialityId?: string;

  @IsOptional()
  @IsUUID()
  VatId?: string;

  @IsOptional()
  @IsUUID()
  InvoicingAddressId?: string;

  @IsOptional()
  @IsUUID()
  InvoicingContactId?: string;

  @IsOptional()
  @IsUUID()
  DeliveryAddressId?: string;

  @IsOptional()
  @IsUUID()
  DeliveryContactId?: string;

  @IsOptional()
  @IsBoolean()
  InvoicingAddress_Npai?: boolean;

  @IsOptional()
  @IsNumber()
  InvoicingAddress_Longitude?: number;

  @IsOptional()
  @IsNumber()
  InvoicingAddress_Latitude?: number;

  @IsOptional()
  @IsBoolean()
  DeliveryAddress_Npai?: boolean;

  @IsOptional()
  @IsNumber()
  DeliveryAddress_Longitude?: number;

  @IsOptional()
  @IsNumber()
  DeliveryAddress_Latitude?: number;

  @IsOptional()
  @IsBoolean()
  UseInvoicingAddressAsDeliveryAddress?: boolean;

  @IsOptional()
  @IsBoolean()
  UseInvoicingContactAsDeliveryContact?: boolean;

  @IsOptional()
  @IsNumber()
  ValidationState?: number;

  @IsOptional()
  @IsNumber()
  DocumentState?: number;

  @IsOptional()
  @IsDate()
  ValidityDate?: Date;

  @IsOptional()
  @IsDate()
  DeliveryDate?: Date;

  @IsOptional()
  @IsNumber()
  DeliveryState?: number;

  @IsOptional()
  @IsNumber()
  ReturnState?: number;

  @IsOptional()
  @IsNumber()
  CommitmentsBalanceDue?: number;

  @IsOptional()
  @IsNumber()
  CostPrice?: number;

  @IsOptional()
  @IsNumber()
  DiscountRate?: number;

  @IsOptional()
  @IsNumber()
  DiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  AmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  AmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsBoolean()
  ShippingNotSubjectToFinancialDiscount?: boolean;

  @IsOptional()
  @IsNumber()
  ShippingAmountVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  ShippingVatId?: string;

  @IsOptional()
  @IsNumber()
  AmountVatExcludedWithDiscountAndShipping?: number;

  @IsOptional()
  @IsNumber()
  AmountVatExcludedWithDiscountAndShippingWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  VatAmountWithoutEcotax?: number;

  @IsOptional()
  @IsNumber()
  VatAmount?: number;

  @IsOptional()
  @IsNumber()
  AmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  PreviousDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DepositCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  PreviousDepositCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  TotalDueAmount?: number;

  @IsOptional()
  @IsBoolean()
  IsEcotaxAmountIncludedToDueAmount?: boolean;

  @IsOptional()
  @IsNumber()
  EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount0_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount0_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount1_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount1_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount2_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount2_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount3_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount3_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount4_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount4_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailVatAmount5_DetailVatId?: string;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailVatRate?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_EcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_VatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_TaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_REAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_DetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailDepositVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailVatAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyEcotaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnDebit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnCollection?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnCollectionWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyVatAmountOnDebitWithoutDeposit?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyTaxVatAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailDepositREAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailVatAmount5_CurrencyDetailREAmountWithoutDepositAmount?: number;

  @IsOptional()
  @IsUUID()
  AccountingExchangeGroupId?: string;

  @IsOptional()
  @IsBoolean()
  PriceWithTaxBased?: boolean;

  @IsOptional()
  @IsNumber()
  VatMode?: number;

  @IsOptional()
  @IsNumber()
  NumberOfPackage?: number;

  @IsOptional()
  @IsBoolean()
  IsCustomNumberOfPackage?: boolean;

  @IsOptional()
  @IsNumber()
  OtherTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxAmountNotSubjectToVat?: number;

  @IsOptional()
  @IsNumber()
  CurrencyOtherTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyOtherTaxAmountNotSubjectToVat?: number;

  @IsOptional()
  @IsNumber()
  FinancialDiscountType?: number;

  @IsOptional()
  @IsNumber()
  FinancialDiscountRate?: number;

  @IsOptional()
  @IsNumber()
  FinancialDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  AmountWithFinancialDiscount?: number;

  @IsOptional()
  @IsUUID()
  ReportId?: string;

  @IsOptional()
  @IsNumber()
  NumberOfCopies?: number;

  @IsOptional()
  @IsUUID()
  ThirdBankAccountId?: string;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount0_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount0_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount1_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount1_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount2_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount2_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount3_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount3_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount4_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount4_CurrencyBaseAmount?: number;

  @IsNumber()
  id: number;

  @IsOptional()
  @IsUUID()
  DetailTaxAmount5_TaxId?: string;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_TaxCalculationBase?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  DetailTaxAmount5_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsString()
  sysCreatedUser?: string;

  @IsOptional()
  @IsString()
  IntrastatIncoterm?: string;

  @IsOptional()
  @IsString()
  sysModifiedUser?: string;

  @IsOptional()
  @IsString()
  NotesClear?: string;

  @IsOptional()
  @IsString()
  Notes?: string;

  @IsOptional()
  @IsString()
  ColleagueId?: string;

  @IsOptional()
  @IsString()
  DocumentNumber?: string;

  @IsOptional()
  @IsString()
  NumberPrefix?: string;

  @IsOptional()
  @IsString()
  PriceListCategory?: string;

  @IsOptional()
  @IsString()
  OrderThirdId?: string;

  @IsOptional()
  @IsString()
  OriginDocumentNumber?: string;

  @IsOptional()
  @IsString()
  ShippingId?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount1_TaxCaption?: string;

  @IsOptional()
  @IsString()
  CompanyBankId?: string;

  @IsOptional()
  @IsString()
  CurrencyId?: string;

  @IsOptional()
  @IsString()
  DocumentLanguage?: string;

  @IsOptional()
  @IsString()
  Reference?: string;

  @IsOptional()
  @IsString()
  CorrectionCause?: string;

  @IsOptional()
  @IsString()
  CorrectionReasonId?: string;

  @IsOptional()
  @IsString()
  DealId?: string;

  @IsOptional()
  @IsString()
  SerialId?: string;

  @IsOptional()
  @IsString()
  MaintenanceContractId?: string;

  @IsOptional()
  @IsString()
  IncidentId?: string;

  @IsOptional()
  @IsString()
  ConstructionSiteId?: string;

  @IsOptional()
  @IsString()
  SepaCommunication?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount2_TaxCaption?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_CodeINSEE?: string;

  @IsOptional()
  @IsString()
  ReverseChargeMention?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_CityINSEE?: string;

  @IsOptional()
  @IsString()
  PaymentTypeId?: string;

  @IsOptional()
  @IsString()
  Revision?: string;

  @IsOptional()
  @IsString()
  ThirdIdToDeliver?: string;

  @IsOptional()
  @IsString()
  BankId?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Profession?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount3_TaxCaption?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address1?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address2?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address3?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Address4?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_ZipCode?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_City?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_State?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_CountryIsoCode?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Description?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_Civility?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_ThirdName?: string;

  @IsOptional()
  @IsString()
  CustomerId?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_WebSite?: string;

  @IsOptional()
  @IsString()
  CustomerName?: string;

  @IsOptional()
  @IsString()
  CustomerCivility?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Civility?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Name?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_FirstName?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Phone?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_CellPhone?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Fax?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Email?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Function?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Department?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address1?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address2?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address3?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Address4?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_ZipCode?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_City?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_State?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_CountryIsoCode?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Description?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_Civility?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_ThirdName?: string;

  @IsOptional()
  @IsString()
  CustomerIntracommunityVatNumber?: string;

  @IsOptional()
  @IsString()
  DeliveryAddress_WebSite?: string;

  @IsOptional()
  @IsString()
  PaymentThirdId?: string;

  @IsOptional()
  @IsString()
  InvoicingThirdId?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Civility?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Name?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_FirstName?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Phone?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_CellPhone?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Fax?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Email?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Function?: string;

  @IsOptional()
  @IsString()
  DeliveryContact_Department?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount4_TaxCaption?: string;

  @IsOptional()
  @IsString()
  InvoicingContact_Profession?: string;

  @IsOptional()
  @IsString()
  SettlementModeId?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_CodeINSEE?: string;

  @IsOptional()
  @IsString()
  InvoicingAddress_CityINSEE?: string;

  @IsOptional()
  @IsString()
  IntervenerId?: string;

  @IsOptional()
  @IsString()
  IntrastatTransportMode?: string;

  @IsOptional()
  @IsString()
  IntrastatTransactionNature?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount0_TaxCaption?: string;

  @IsOptional()
  @IsString()
  DetailTaxAmount5_TaxCaption?: string;
}

export class ConstructionSiteReferenceDocumentLineDTO {
  @IsOptional()
  @IsNumber()
  GrossInterestRate?: number;

  @IsOptional()
  @IsDate()
  sysCreatedDate?: Date;

  @IsOptional()
  @IsNumber()
  CoordinatedActivity?: number;

  @IsOptional()
  @IsBoolean()
  IsCritical?: boolean;

  @IsOptional()
  @IsBoolean()
  IsMilestone?: boolean;

  @IsOptional()
  @IsNumber()
  PickedStockQuantity?: number;

  @IsOptional()
  @IsNumber()
  ConsumptionQuantity?: number;

  @IsOptional()
  @IsNumber()
  TotalConsumptionQuantity?: number;

  @IsOptional()
  @IsNumber()
  SurplusQuantity?: number;

  @IsOptional()
  @IsNumber()
  TotalSurplusQuantity?: number;

  @IsOptional()
  @IsNumber()
  OriginNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  OriginQuantity?: number;

  @IsOptional()
  @IsNumber()
  SchedulingType?: number;

  @IsOptional()
  @IsNumber()
  ReplenishmentType?: number;

  @IsOptional()
  @IsNumber()
  ReplenishmentSupplierDocumentType?: number;

  @IsOptional()
  @IsNumber()
  ReplenishmentSubContractorDocumentType?: number;

  @IsOptional()
  @IsUUID()
  ConstructionSiteLineId?: string;

  @IsOptional()
  @IsNumber()
  LineFeature?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeAmount?: number;

  @IsOptional()
  @IsNumber()
  ExtraFeeState?: number;

  @IsOptional()
  @IsBoolean()
  ExtraFeeIsManualDistribution?: boolean;

  @IsOptional()
  @IsBoolean()
  PosScaleDeletedLine?: boolean;

  @IsOptional()
  @IsNumber()
  PurchaseState_Indicator?: number;

  @IsOptional()
  @IsNumber()
  SubContractorState_Indicator?: number;

  @IsOptional()
  @IsBoolean()
  IsExtraFree?: boolean;

  @IsOptional()
  @IsUUID()
  CancelledAmendmentLineId?: string;

  @IsOptional()
  @IsUUID()
  AddedAmendmentLineId?: string;

  @IsOptional()
  @IsNumber()
  TotalConsumedAmount?: number;

  @IsOptional()
  @IsNumber()
  GlobalQuantities?: number;

  @IsOptional()
  @IsNumber()
  GlobalCost?: number;

  @IsOptional()
  @IsNumber()
  TotalGrossInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  TotalGrossInterestRate?: number;

  @IsOptional()
  @IsNumber()
  TotalBrandRate?: number;

  @IsOptional()
  @IsNumber()
  TotalSurplusAmount?: number;

  @IsOptional()
  @IsNumber()
  sysEditCounter?: number;

  @IsOptional()
  @IsString()
  PurchaseState_IndicatorImage?: string;

  @IsOptional()
  @IsString()
  SubContractorState_IndicatorImage?: string;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_VatRate?: number;

  @IsOptional()
  @IsUUID()
  OtherTaxes0_VatId?: string;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_VatRate?: number;

  @IsOptional()
  @IsUUID()
  OtherTaxes1_VatId?: string;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_VatRate?: number;

  @IsOptional()
  @IsUUID()
  OtherTaxes2_VatId?: string;

  @IsOptional()
  @IsNumber()
  VatType?: number;

  @IsOptional()
  @IsNumber()
  VatOnMarginRate?: number;

  @IsOptional()
  @IsNumber()
  VatOnMarginBaseAmount?: number;

  @IsOptional()
  @IsBoolean()
  ExcludeFixedQuantityForPrice?: boolean;

  @IsOptional()
  @IsBoolean()
  ExcludedFromFootDiscount?: boolean;

  @IsOptional()
  @IsBoolean()
  ExcludedFromFinancialDiscount?: boolean;

  @IsOptional()
  @IsDate()
  sysModifiedDate?: Date;

  @IsNumber()
  id: number;

  @IsOptional()
  @IsUUID()
  ParentLineId?: string;

  @IsOptional()
  @IsUUID()
  TopParentLineId?: string;

  @IsOptional()
  @IsUUID()
  DocumentId?: string;

  @IsOptional()
  @IsNumber()
  LineType?: number;

  @IsOptional()
  @IsNumber()
  LineOrder?: number;

  @IsOptional()
  @IsBoolean()
  IsReferencedItem?: boolean;

  @IsOptional()
  @IsNumber()
  Quantity?: number;

  @IsOptional()
  @IsNumber()
  RealQuantity?: number;

  @IsOptional()
  @IsUUID()
  StorehouseId?: string;

  @IsOptional()
  @IsNumber()
  StockMovementId?: number;

  @IsOptional()
  @IsBoolean()
  ManageStock?: boolean;

  @IsOptional()
  @IsNumber()
  NomenclatureLevel?: number;

  @IsOptional()
  @IsNumber()
  IsPrintable?: number;

  @IsOptional()
  @IsNumber()
  QuantityDecimalNumber?: number;

  @IsOptional()
  @IsBoolean()
  HasTrackingDispatch?: boolean;

  @IsOptional()
  @IsDate()
  LimitDate?: Date;

  @IsOptional()
  @IsNumber()
  PricesDecimalNumber?: number;

  @IsOptional()
  @IsBoolean()
  IsManagedByCountermark?: boolean;

  @IsOptional()
  @IsBoolean()
  IsCountermarkInitiated?: boolean;

  @IsOptional()
  @IsNumber()
  Volume?: number;

  @IsOptional()
  @IsNumber()
  TotalVolume?: number;

  @IsOptional()
  @IsNumber()
  Weight?: number;

  @IsOptional()
  @IsNumber()
  TotalWeight?: number;

  @IsOptional()
  @IsNumber()
  PhaseLevel?: number;

  @IsOptional()
  @IsNumber()
  Location_MultiLocationMode?: number;

  @IsOptional()
  @IsBoolean()
  BillOfQuantitiesProgram_IsActive?: boolean;

  @IsOptional()
  @IsBoolean()
  BillOfQuantitiesProgram_KeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  IsNumberSetManually?: boolean;

  @IsOptional()
  @IsNumber()
  PurchasePrice?: number;

  @IsOptional()
  @IsNumber()
  ChargeRate?: number;

  @IsOptional()
  @IsNumber()
  ChargeAmount?: number;

  @IsOptional()
  @IsNumber()
  CostPrice?: number;

  @IsOptional()
  @IsNumber()
  UnitDiscountRate?: number;

  @IsOptional()
  @IsNumber()
  UnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  UnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyTotalUnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyTotalUnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  PurchasePricePercentage?: number;

  @IsOptional()
  @IsNumber()
  TotalDiscountRate?: number;

  @IsOptional()
  @IsBoolean()
  IsNetPriceWithFullDecimals?: boolean;

  @IsOptional()
  @IsNumber()
  NetPriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  NetPriceVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  NetPriceVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  NetPriceVatIncludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  NetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  NetAmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  NetAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  NetAmountVatIncludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  UnitEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  UnitEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  EcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  EcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsUUID()
  VatId?: string;

  @IsOptional()
  @IsNumber()
  VatAmount?: number;

  @IsOptional()
  @IsDate()
  DeliveryDate?: Date;

  @IsOptional()
  @IsNumber()
  DeliveryState?: number;

  @IsOptional()
  @IsNumber()
  ReturnState?: number;

  @IsOptional()
  @IsNumber()
  OrderedQuantity?: number;

  @IsOptional()
  @IsNumber()
  DeliveredQuantity?: number;

  @IsOptional()
  @IsNumber()
  RemainingQuantityToDeliver?: number;

  @IsOptional()
  @IsNumber()
  RemainingQuantityToInvoice?: number;

  @IsOptional()
  @IsNumber()
  ReturnedQuantity?: number;

  @IsOptional()
  @IsNumber()
  InvoicedQuantity?: number;

  @IsOptional()
  @IsNumber()
  ReturnedQuantityByPreviousCreditMemo?: number;

  @IsOptional()
  @IsNumber()
  VatMode?: number;

  @IsOptional()
  @IsNumber()
  NumberOfItemByPackage?: number;

  @IsOptional()
  @IsNumber()
  NetWeight?: number;

  @IsOptional()
  @IsNumber()
  TotalNetWeight?: number;

  @IsOptional()
  @IsBoolean()
  UseComponentVat?: boolean;

  @IsOptional()
  @IsNumber()
  NomenclatureCalculationType?: number;

  @IsOptional()
  @IsNumber()
  FreePercentage?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatIncludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatExcludedWithDiscountAndFinancialDiscount?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatIncludedWithDiscountAndFinancialDiscount?: number;

  @IsOptional()
  @IsNumber()
  Discounts0_UnitDiscountRate?: number;

  @IsOptional()
  @IsNumber()
  Discounts0_UnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts0_UnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts0_DiscountType?: number;

  @IsOptional()
  @IsNumber()
  Discounts0_CurrencyUnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts0_CurrencyUnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts1_UnitDiscountRate?: number;

  @IsOptional()
  @IsNumber()
  Discounts1_UnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts1_UnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts1_DiscountType?: number;

  @IsOptional()
  @IsNumber()
  Discounts1_CurrencyUnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts1_CurrencyUnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts2_UnitDiscountRate?: number;

  @IsOptional()
  @IsNumber()
  Discounts2_UnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts2_UnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts2_DiscountType?: number;

  @IsOptional()
  @IsNumber()
  Discounts2_CurrencyUnitDiscountAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  Discounts2_CurrencyUnitDiscountAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatExcludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  RealNetAmountVatIncludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  NetPriceVatExcludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  NetPriceVatIncludedWithParentDiscount?: number;

  @IsOptional()
  @IsBoolean()
  NotIncluded?: boolean;

  @IsOptional()
  @IsUUID()
  OtherTaxes0_Id?: string;

  @IsOptional()
  @IsUUID()
  OtherTaxes0_SubTaxId?: string;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_CalculationBase?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_TaxValue?: number;

  @IsOptional()
  @IsBoolean()
  OtherTaxes0_SubjectToVat?: boolean;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes0_CurrencyTaxValue?: number;

  @IsOptional()
  @IsUUID()
  OtherTaxes1_Id?: string;

  @IsOptional()
  @IsUUID()
  OtherTaxes1_SubTaxId?: string;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_CalculationBase?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_TaxValue?: number;

  @IsOptional()
  @IsBoolean()
  OtherTaxes1_SubjectToVat?: boolean;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes1_CurrencyTaxValue?: number;

  @IsOptional()
  @IsUUID()
  OtherTaxes2_Id?: string;

  @IsOptional()
  @IsUUID()
  OtherTaxes2_SubTaxId?: string;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_CalculationBase?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_TaxValue?: number;

  @IsOptional()
  @IsBoolean()
  OtherTaxes2_SubjectToVat?: boolean;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_TaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_BaseAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_CurrencyBaseAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_CurrencyTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  OtherTaxes2_CurrencyTaxValue?: number;

  @IsOptional()
  @IsBoolean()
  IsPriceListApplied?: boolean;

  @IsOptional()
  @IsBoolean()
  CanApplyPriceListOnComponent?: boolean;

  @IsOptional()
  @IsNumber()
  DispatchedAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  DispatchedAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  REAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetPriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetPriceVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetPriceVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetPriceVatIncludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetAmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetAmountVatIncludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatExcludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatIncludedWithDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatExcludedWithDiscountAndFinancialDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatIncludedWithDiscountAndFinancialDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatExcludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyRealNetAmountVatIncludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetPriceVatExcludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyNetPriceVatIncludedWithParentDiscount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyVatAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrencyUnitEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyUnitEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxAmountVatIncluded?: number;

  @IsOptional()
  @IsBoolean()
  MustPartiallyDeliverCommercialNomenclature?: boolean;

  @IsOptional()
  @IsBoolean()
  UnitPriceProgram_IsActive?: boolean;

  @IsOptional()
  @IsBoolean()
  UnitPriceProgram_KeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsNumber()
  NumberOfPackage?: number;

  @IsOptional()
  @IsBoolean()
  IsCustomNumberOfPackage?: boolean;

  @IsOptional()
  @IsNumber()
  NomenclatureAccountingTransferType?: number;

  @IsOptional()
  @IsNumber()
  UnitEcotaxFurnitureAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  UnitEcotaxFurnitureAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  EcotaxFurnitureAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  EcotaxFurnitureAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyUnitEcotaxFurnitureAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyUnitEcotaxFurnitureAmountVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxFurnitureAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyEcotaxFurnitureAmountVatIncluded?: number;

  @IsOptional()
  @IsBoolean()
  IncludeEcotaxFurnitureInDueAmount?: boolean;

  @IsOptional()
  @IsNumber()
  AnalyticPlanItemId?: number;

  @IsOptional()
  @IsBoolean()
  HasAnalyticAffectations?: boolean;

  @IsOptional()
  @IsNumber()
  LinkType?: number;

  @IsOptional()
  @IsBoolean()
  QuantityDecreaseByFreeQuantity?: boolean;

  @IsOptional()
  @IsBoolean()
  IgnoreManualPriceSetForMultiLinePriceList?: boolean;

  @IsOptional()
  @IsBoolean()
  IntrastatExcluded?: boolean;

  @IsOptional()
  @IsNumber()
  DoNotCreateMovement?: number;

  @IsOptional()
  @IsUUID()
  RoundId?: string;

  @IsOptional()
  @IsNumber()
  ProgressStateType?: number;

  @IsOptional()
  @IsNumber()
  QuantityProgressPercentage?: number;

  @IsOptional()
  @IsNumber()
  TotalQuantityProgressPercentage?: number;

  @IsOptional()
  @IsNumber()
  PreviousTotalQuantityProgressPercentage?: number;

  @IsOptional()
  @IsNumber()
  ProgressPercentage?: number;

  @IsOptional()
  @IsNumber()
  TotalProgressPercentage?: number;

  @IsOptional()
  @IsNumber()
  PreviousTotalProgressPercentage?: number;

  @IsOptional()
  @IsNumber()
  TotalProgressQuantity?: number;

  @IsOptional()
  @IsNumber()
  ProgressRealQuantity?: number;

  @IsOptional()
  @IsNumber()
  PreviousTotalProgressQuantity?: number;

  @IsOptional()
  @IsNumber()
  TotalProgressRealNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyTotalProgressRealNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  PreviousTotalProgressRealNetAmountVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  CurrencyPreviousTotalProgressRealNetAmountVatExcluded?: number;

  @IsOptional()
  @IsUUID()
  LastAcceptedProgressStateLineId?: string;

  @IsOptional()
  @IsUUID()
  LastProgressStateLineId?: string;

  @IsOptional()
  @IsUUID()
  ReferenceDocumentLineId?: string;

  @IsOptional()
  @IsBoolean()
  FixedQuantity?: boolean;

  @IsOptional()
  @IsNumber()
  ComponentFixedQuantityNumber?: number;

  @IsOptional()
  @IsNumber()
  FixedQuantityPriceConversionRate?: number;

  @IsOptional()
  @IsNumber()
  DeliveryOrderInvoiceState?: number;

  @IsOptional()
  @IsBoolean()
  MustPartiallyInvoiceCommercialNomenclature?: boolean;

  @IsOptional()
  @IsNumber()
  SalePriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  SalePriceVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  InterestRate?: number;

  @IsOptional()
  @IsNumber()
  InterestAmount?: number;

  @IsOptional()
  @IsNumber()
  NetInterestRate?: number;

  @IsOptional()
  @IsNumber()
  NetInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  BrandRate?: number;

  @IsOptional()
  @IsNumber()
  TotalInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  NetInterestBase?: number;

  @IsOptional()
  @IsNumber()
  NetInterestCalculationType?: number;

  @IsOptional()
  @IsNumber()
  IsFixedPrice?: number;

  @IsOptional()
  @IsBoolean()
  UsePumpForReturn?: boolean;

  @IsOptional()
  @IsNumber()
  ReturnUnitCostPrice?: number;

  @IsOptional()
  @IsNumber()
  ReturnCostPrice?: number;

  @IsOptional()
  @IsBoolean()
  IsHumanService?: boolean;

  @IsOptional()
  @IsBoolean()
  InterventionDurationEqualQuantity?: boolean;

  @IsOptional()
  @IsNumber()
  GrossInterestRateCalculationType?: number;

  @IsOptional()
  @IsNumber()
  GrossInterestAmount?: number;
}

export class ConstructionSiteReferenceDocumentLineTrackingDispatchDTO {
  @IsOptional()
  @IsNumber()
  RemainingQuantityToDeliverGap?: number;

  @IsOptional()
  @IsDate()
  sysCreatedDate?: Date;

  @IsOptional()
  @IsNumber()
  ReturnedQuantity?: number;

  @IsOptional()
  @IsNumber()
  RemainingQuantity?: number;

  @IsOptional()
  @IsNumber()
  InvoicedQuantity?: number;

  @IsOptional()
  @IsNumber()
  DeliveredQuantity?: number;

  @IsOptional()
  @IsNumber()
  ReturnedQuantityByPreviousCreditMemo?: number;

  @IsNumber()
  id: number;

  @IsOptional()
  @IsDate()
  sysModifiedDate?: Date;

  @IsOptional()
  @IsUUID()
  Id?: string;

  @IsOptional()
  @IsUUID()
  DocumentLineId?: string;

  @IsOptional()
  @IsUUID()
  StorehouseId?: string;

  @IsOptional()
  @IsNumber()
  Quantity?: number;

  @IsOptional()
  @IsNumber()
  StockMovementId?: number;

  @IsOptional()
  @IsNumber()
  DispatchIndex?: number;

  @IsOptional()
  @IsDate()
  LimitDate?: Date;

  @IsOptional()
  @IsUUID()
  OriginId?: string;

  @IsOptional()
  @IsNumber()
  OriginQuantity?: number;

  @IsOptional()
  @IsString()
  sysCreatedUser?: string;

  @IsOptional()
  @IsString()
  ReturnOriginLocationId?: string;

  @IsOptional()
  @IsString()
  sysModifiedUser?: string;

  @IsOptional()
  @IsString()
  TrackingNumber?: string;

  @IsOptional()
  @IsString()
  LocationId?: string;

  @IsOptional()
  @IsString()
  ItemId?: string;
}

export class ConstructionStaffDTO {
  @IsNumber()
  constructionsiteid: number;

  @IsNumber()
  staffid: number;
}

export class StaffDTO {
  @IsNumber()
  id: number;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  position?: string; // Optionnel
}

export class ConstructionMaterialDTO {
  @IsNumber()
  constructionsiteid: number;

  @IsNumber()
  materialid: number;

  @IsNumber()
  quantity: number;
}
