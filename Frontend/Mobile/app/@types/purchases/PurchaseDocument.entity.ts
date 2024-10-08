export class PurchaseDocument {
  RemainingAmountToDeliverVatExcluded!: number;
  KeepDepositVatAmount!: boolean;
  DocumentLanguage!: string;
  CurrencyInvoicingChargesAmountVatExcluded!: number;
  LoadFabricationComponentsMode!: number;
  TotalApproachChargeToDistributeAmount!: number;
  CurrencyTotalApproachChargeToDistributeAmount!: number;
  TotalApproachChargeAlreadyDistributedAmount!: number;
  CurrencyTotalApproachChargeAlreadyDistributedAmount!: number;
  IsStructuredSepaCommunication!: boolean;
  OtherTaxAmountNotSubjectToVat!: number;
  CurrencyOtherTaxAmountNotSubjectToVat!: number;
  FixedShippingAmount!: boolean;
  DoNotCreateMovement!: boolean;
  IsVatExcludedEcotaxCalculation!: boolean;
  SerialId!: string;
  InvoicingChargesNotSubjectToFinancialDiscount!: boolean;
  InvoicingChargesAmountVatExcluded!: number;
  DeliveryAddress_City!: string;
  DetailVatAmount5_CurrencyVatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount5_CurrencyVatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount5_CurrencyTaxAmount!: number;
  DetailVatAmount5_CurrencyTaxVatAmount!: number;
  DetailVatAmount5_CurrencyREAmount!: number;
  CurrencyOtherTaxAmount!: number;
  DetailTaxAmount0_CurrencyBaseAmount!: number;
  DetailTaxAmount0_CurrencyTaxAmount!: number;
  DetailTaxAmount1_CurrencyBaseAmount!: number;
  DetailTaxAmount1_CurrencyTaxAmount!: number;
  DetailTaxAmount2_CurrencyBaseAmount!: number;
  DetailTaxAmount2_CurrencyTaxAmount!: number;
  DetailTaxAmount3_CurrencyBaseAmount!: number;
  DetailTaxAmount3_CurrencyTaxAmount!: number;
  DetailTaxAmount4_CurrencyBaseAmount!: number;
  DetailTaxAmount4_CurrencyTaxAmount!: number;
  DetailTaxAmount5_CurrencyBaseAmount!: number;
  DetailTaxAmount5_CurrencyTaxAmount!: number;
  AutomaticSettlementGeneration!: boolean;
  RemainingDepositAmount!: number;
  RemainingDepositCurrencyAmount!: number;
  RemainingAmountToDeliver!: number;
  DeliveryAddressType!: number;
  DetailVatAmount1_CurrencyVatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount1_CurrencyVatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount1_CurrencyTaxAmount!: number;
  DetailVatAmount1_CurrencyTaxVatAmount!: number;
  DetailVatAmount1_CurrencyREAmount!: number;
  DetailVatAmount2_CurrencyVatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount2_CurrencyVatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount2_CurrencyTaxAmount!: number;
  DetailVatAmount2_CurrencyTaxVatAmount!: number;
  DetailVatAmount2_CurrencyREAmount!: number;
  DetailVatAmount3_CurrencyVatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount3_CurrencyVatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount3_CurrencyTaxAmount!: number;
  DetailVatAmount3_CurrencyTaxVatAmount!: number;
  DetailVatAmount3_CurrencyREAmount!: number;
  DetailVatAmount4_CurrencyVatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount4_CurrencyVatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount4_CurrencyTaxAmount!: number;
  DetailVatAmount4_CurrencyTaxVatAmount!: number;
  DetailVatAmount4_CurrencyREAmount!: number;
  DetailVatAmount0_CurrencyVatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount0_CurrencyVatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount0_CurrencyTaxAmount!: number;
  DetailVatAmount0_CurrencyTaxVatAmount!: number;
  DetailVatAmount0_CurrencyREAmount!: number;
  ShippingNotSubjectToFinancialDiscount!: boolean;
  SendedByMail!: boolean;
  InvoicingAddress_City!: string;
  InvoicingAddress_Npai!: boolean;
  InvoicingAddress_CountryIsoCode!: string;
  DeliveryAddress_CountryIsoCode!: string;
  DeliveryAddress_Npai!: boolean;
  UseInvoicingAddressAsDeliveryAddress!: boolean;
  UseInvoicingContactAsDeliveryContact!: boolean;
  ShippingAmountVatExcluded!: number;
  AmountVatExcludedWithDiscountAndShipping!: number;
  AmountVatExcludedWithDiscountAndShippingWithoutEcotax!: number;
  VatAmountWithoutEcotax!: number;
  VatAmount!: number;
  AmountVatIncluded!: number;
  PreviousDepositAmount!: number;
  DepositAmount!: number;
  DepositCurrencyAmount!: number;
  PreviousDepositCurrencyAmount!: number;
  TotalDueAmount!: number;
  IsEcotaxAmountIncludedToDueAmount!: boolean;
  EcotaxAmountVatExcluded!: number;
  EcotaxVatAmount!: number;
  EcotaxAmountVatIncluded!: number;
  DetailVatAmount0_VatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount0_VatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount0_TaxAmount!: number;
  DetailVatAmount0_TaxVatAmount!: number;
  DetailVatAmount0_REAmount!: number;
  DetailVatAmount1_VatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount1_VatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount1_TaxAmount!: number;
  DetailVatAmount1_TaxVatAmount!: number;
  DetailVatAmount1_REAmount!: number;
  CommitmentsBalanceDue!: number;
  AmountVatExcluded!: number;
  CostPrice!: number;
  DiscountRate!: number;
  DiscountAmount!: number;
  AmountVatExcludedWithDiscount!: number;
  DetailVatAmount2_VatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount2_VatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount2_TaxAmount!: number;
  DetailVatAmount2_TaxVatAmount!: number;
  DetailVatAmount2_REAmount!: number;
  CloseOrderToReplenishment!: boolean;
  CloseOrderToCountermark!: boolean;
  SubjectToRE!: boolean;
  REAmount!: number;
  TotalNetWeight!: number;
  CorrectionType!: number;
  IRPFAmount!: number;
  IRPFRate!: number;
  PriceWithTaxBased!: boolean;
  DocumentType!: number;
  SupplierId!: string;
  SupplierName!: string;
  CurrencyConversionRate!: number;
  CurrencyTotalDueAmount!: number;
  CommitmentsCurrencyBalanceDue!: number;
  CurrencyAmountVatIncluded!: number;
  CurrencyApplicationType!: number;
  CurrencyAmountVatExcluded!: number;
  CurrencyAmountVatExcludedWithDiscountAndShipping!: number;
  CurrencyAmountWithFinancialDiscount!: number;
  CurrencyShippingAmountVatExcluded!: number;
  CurrencyAmountVatExcludedWithDiscount!: number;
  CurrencyAmountVatExcludedWithDiscountAndShippingWithoutEcotax!: number;
  CurrencyEcotaxAmountVatIncluded!: number;
  CurrencyFinancialDiscountAmount!: number;
  CurrencyVatAmountWithoutEcotax!: number;
  CurrencyEcotaxVatAmount!: number;
  CurrencyEcotaxAmountVatExcluded!: number;
  CurrencyVatAmount!: number;
  CurrencyDiscountAmount!: number;
  DetailTaxAmount3_BaseAmount!: number;
  DetailTaxAmount3_TaxAmount!: number;
  DetailTaxAmount4_BaseAmount!: number;
  DetailTaxAmount4_TaxAmount!: number;
  DetailTaxAmount5_BaseAmount!: number;
  DetailTaxAmount5_TaxAmount!: number;
  ShippingAmountInclusionType!: number;
  Printed!: boolean;
  DetailVatAmount3_VatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount3_VatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount3_TaxAmount!: number;
  DetailVatAmount3_TaxVatAmount!: number;
  DetailVatAmount3_REAmount!: number;
  DetailVatAmount4_VatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount4_VatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount4_TaxAmount!: number;
  DetailVatAmount4_TaxVatAmount!: number;
  DetailVatAmount4_REAmount!: number;
  DetailVatAmount5_VatAmountOnCollectionWithoutDeposit!: number;
  DetailVatAmount5_VatAmountOnDebitWithoutDeposit!: number;
  DetailVatAmount5_TaxAmount!: number;
  DetailVatAmount5_TaxVatAmount!: number;
  DetailVatAmount5_REAmount!: number;
  VatMode!: number;
  NumberOfPackage!: number;
  IsCustomNumberOfPackage!: boolean;
  OtherTaxAmount!: number;
  FinancialDiscountType!: number;
  FinancialDiscountRate!: number;
  FinancialDiscountAmount!: number;
  AmountWithFinancialDiscount!: number;
  ReportId!: string;
  NumberOfCopies!: number;
  DetailTaxAmount0_BaseAmount!: number;
  DetailTaxAmount0_TaxAmount!: number;
  DetailTaxAmount1_BaseAmount!: number;
  DetailTaxAmount1_TaxAmount!: number;
  DetailTaxAmount2_BaseAmount!: number;
  DetailTaxAmount2_TaxAmount!: number;
  TotalVolume!: number;
  TotalWeight!: number;
  TerritorialityId!: string;
  VatId!: string;
  Id!: string;
  DocumentNumber!: string;
  NumberPrefix!: string;
  NumberSuffix!: number;
  DocumentDate!: string;
  GlobalDocumentOrder!: number;
  DispatchedByStorehouse!: boolean;
  InvoicingAddress_ZipCode!: string;
  DeliveryAddress_ZipCode!: string;
  ColleagueId!: string;
  OrderThirdId!: string;
  PaymentThirdId!: string;
  InvoicingThirdId!: string;
  TaxIds0!: string;
  TaxIds1!: string;
  TaxIds2!: string;
  DetailVatAmount0_CurrencyDetailDepositREAmount!: number;
  DetailVatAmount0_CurrencyDetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount1_CurrencyDetailAmountVatExcluded!: number;
  DetailVatAmount1_CurrencyDetailVatAmount!: number;
  DetailVatAmount1_CurrencyDetailAmountVatIncluded!: number;
  DetailVatAmount1_CurrencyDetailDepositVatAmount!: number;
  DetailVatAmount1_CurrencyDetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount1_CurrencyEcotaxAmountVatExcluded!: number;
  DetailVatAmount1_CurrencyEcotaxAmountVatIncluded!: number;
  DetailVatAmount1_CurrencyEcotaxVatAmount!: number;
  DetailVatAmount1_CurrencyVatAmountOnDebit!: number;
  DetailVatAmount1_CurrencyVatAmountOnCollection!: number;
  DetailVatAmount4_CurrencyDetailDepositREAmount!: number;
  DetailVatAmount4_CurrencyDetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount5_CurrencyDetailAmountVatExcluded!: number;
  DetailVatAmount5_CurrencyDetailVatAmount!: number;
  DetailVatAmount5_CurrencyDetailAmountVatIncluded!: number;
  DetailVatAmount5_CurrencyDetailDepositVatAmount!: number;
  DetailVatAmount5_CurrencyDetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount5_CurrencyEcotaxAmountVatExcluded!: number;
  DetailVatAmount5_CurrencyEcotaxAmountVatIncluded!: number;
  DetailVatAmount5_CurrencyEcotaxVatAmount!: number;
  DetailVatAmount5_CurrencyVatAmountOnDebit!: number;
  DetailVatAmount5_CurrencyVatAmountOnCollection!: number;
  DetailVatAmount3_CurrencyDetailDepositREAmount!: number;
  DetailVatAmount3_CurrencyDetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount4_CurrencyDetailAmountVatExcluded!: number;
  DetailVatAmount4_CurrencyDetailVatAmount!: number;
  DetailVatAmount4_CurrencyDetailAmountVatIncluded!: number;
  DetailVatAmount4_CurrencyDetailDepositVatAmount!: number;
  DetailVatAmount4_CurrencyDetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount4_CurrencyEcotaxAmountVatExcluded!: number;
  DetailVatAmount4_CurrencyEcotaxAmountVatIncluded!: number;
  DetailVatAmount4_CurrencyEcotaxVatAmount!: number;
  DetailVatAmount4_CurrencyVatAmountOnDebit!: number;
  DetailVatAmount4_CurrencyVatAmountOnCollection!: number;
  DetailVatAmount2_CurrencyDetailDepositREAmount!: number;
  DetailVatAmount2_CurrencyDetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount3_CurrencyDetailAmountVatExcluded!: number;
  DetailVatAmount3_CurrencyDetailVatAmount!: number;
  DetailVatAmount3_CurrencyDetailAmountVatIncluded!: number;
  DetailVatAmount3_CurrencyDetailDepositVatAmount!: number;
  DetailVatAmount3_CurrencyDetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount3_CurrencyEcotaxAmountVatExcluded!: number;
  DetailVatAmount3_CurrencyEcotaxAmountVatIncluded!: number;
  DetailVatAmount3_CurrencyEcotaxVatAmount!: number;
  DetailVatAmount3_CurrencyVatAmountOnDebit!: number;
  DetailVatAmount3_CurrencyVatAmountOnCollection!: number;
  DetailVatAmount1_CurrencyDetailDepositREAmount!: number;
  DetailVatAmount1_CurrencyDetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount2_CurrencyDetailAmountVatExcluded!: number;
  DetailVatAmount2_CurrencyDetailVatAmount!: number;
  DetailVatAmount2_CurrencyDetailAmountVatIncluded!: number;
  DetailVatAmount2_CurrencyDetailDepositVatAmount!: number;
  DetailVatAmount2_CurrencyDetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount2_CurrencyEcotaxAmountVatExcluded!: number;
  DetailVatAmount2_CurrencyEcotaxAmountVatIncluded!: number;
  DetailVatAmount2_CurrencyEcotaxVatAmount!: number;
  DetailVatAmount2_CurrencyVatAmountOnDebit!: number;
  DetailVatAmount2_CurrencyVatAmountOnCollection!: number;
  DeliveryCustomerId!: string;
  DeliveryStorehouseId!: string;
  DeliveryOrderPreparationState!: number;
  ReturnOrderPreparationState!: number;
  DetailVatAmount5_CurrencyDetailDepositREAmount!: number;
  DetailVatAmount5_CurrencyDetailREAmountWithoutDepositAmount!: number;
  DetailTaxAmount2_TaxCaption!: string;
  DetailTaxAmount3_TaxId!: string;
  DetailTaxAmount3_TaxCalculationBase!: number;
  DetailTaxAmount1_TaxCaption!: string;
  DetailTaxAmount2_TaxId!: string;
  DetailTaxAmount2_TaxCalculationBase!: number;
  DetailTaxAmount0_TaxCaption!: string;
  DetailTaxAmount1_TaxId!: string;
  DetailTaxAmount1_TaxCalculationBase!: number;
  DetailVatAmount3_DetailDepositVatAmount!: number;
  DetailVatAmount3_DetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount3_EcotaxAmountVatExcluded!: number;
  DetailVatAmount3_EcotaxAmountVatIncluded!: number;
  DetailVatAmount3_EcotaxVatAmount!: number;
  DetailVatAmount3_VatAmountOnDebit!: number;
  DetailVatAmount3_VatAmountOnCollection!: number;
  ThirdBankAccountId!: string;
  DetailTaxAmount0_TaxId!: string;
  DetailTaxAmount0_TaxCalculationBase!: number;
  DetailVatAmount5_DetailDepositREAmount!: number;
  DetailVatAmount5_DetailREAmountWithoutDepositAmount!: number;
  PaymentTypeId!: string;
  AccountingExchangeGroupId!: string;
  DetailVatAmount4_DetailDepositREAmount!: number;
  DetailVatAmount4_DetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount5_DetailVatId!: string;
  DetailVatAmount5_DetailVatRate!: number;
  DetailVatAmount5_DetailAmountVatExcluded!: number;
  DetailVatAmount5_DetailVatAmount!: number;
  DetailVatAmount5_DetailAmountVatIncluded!: number;
  DetailVatAmount5_DetailDepositVatAmount!: number;
  DetailVatAmount5_DetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount5_EcotaxAmountVatExcluded!: number;
  DetailVatAmount5_EcotaxAmountVatIncluded!: number;
  DetailVatAmount5_EcotaxVatAmount!: number;
  DetailVatAmount5_VatAmountOnDebit!: number;
  DetailVatAmount5_VatAmountOnCollection!: number;
  DetailVatAmount3_DetailDepositREAmount!: number;
  DetailVatAmount3_DetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount4_DetailVatId!: string;
  DetailVatAmount4_DetailVatRate!: number;
  DetailVatAmount4_DetailAmountVatExcluded!: number;
  DetailVatAmount4_DetailVatAmount!: number;
  DetailVatAmount4_DetailAmountVatIncluded!: number;
  DetailVatAmount4_DetailDepositVatAmount!: number;
  DetailVatAmount4_DetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount4_EcotaxAmountVatExcluded!: number;
  DetailVatAmount4_EcotaxAmountVatIncluded!: number;
  DetailVatAmount4_EcotaxVatAmount!: number;
  DetailVatAmount4_VatAmountOnDebit!: number;
  DetailVatAmount4_VatAmountOnCollection!: number;
  IntrastatTransportMode!: string;
  IntrastatTransactionNature!: string;
  AppliedPriceListLineId!: string;
  PriceListCategory!: string;
  ShippingVatId!: string;
  InvoicingChargesVatId!: string;
  DetailTaxAmount5_TaxCaption!: string;
  CompanyBankId!: string;
  CurrencyId!: string;
  DetailTaxAmount4_TaxCaption!: string;
  DetailTaxAmount5_TaxId!: string;
  DetailTaxAmount5_TaxCalculationBase!: number;
  DetailTaxAmount3_TaxCaption!: string;
  DetailTaxAmount4_TaxId!: string;
  DetailTaxAmount4_TaxCalculationBase!: number;
  DealId!: string;
  SupplierCivility!: string;
  SupplierIntracommunityVatNumber!: string;
  OriginDocumentType!: number;
  BankId!: string;
  IdentificationType!: number;
  CorrectionCause!: string;
  CorrectionReasonId!: string;
  sysEditCounter!: number;
  sysModuleId!: string;
  sysDatabaseId!: string;
  sysRecordVersion!: number;
  sysRecordVersionId!: string;
  DeliveryAddress_State!: string;
  DetailVatAmount2_DetailDepositREAmount!: number;
  DetailVatAmount2_DetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount3_DetailVatId!: string;
  DetailVatAmount3_DetailVatRate!: number;
  DetailVatAmount3_DetailAmountVatExcluded!: number;
  DetailVatAmount3_DetailVatAmount!: number;
  DetailVatAmount3_DetailAmountVatIncluded!: number;
  ShippingId!: string;
  DetailVatAmount1_DetailDepositREAmount!: number;
  DetailVatAmount1_DetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount2_DetailVatId!: string;
  DetailVatAmount2_DetailVatRate!: number;
  DetailVatAmount2_DetailAmountVatExcluded!: number;
  DetailVatAmount2_DetailVatAmount!: number;
  DetailVatAmount2_DetailAmountVatIncluded!: number;
  DetailVatAmount2_DetailDepositVatAmount!: number;
  DetailVatAmount2_DetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount2_EcotaxAmountVatExcluded!: number;
  DetailVatAmount2_EcotaxAmountVatIncluded!: number;
  DetailVatAmount2_EcotaxVatAmount!: number;
  DetailVatAmount2_VatAmountOnDebit!: number;
  DetailVatAmount2_VatAmountOnCollection!: number;
  DetailVatAmount0_DetailDepositREAmount!: number;
  DetailVatAmount0_DetailREAmountWithoutDepositAmount!: number;
  DetailVatAmount1_DetailVatId!: string;
  DetailVatAmount1_DetailVatRate!: number;
  DetailVatAmount1_DetailAmountVatExcluded!: number;
  DetailVatAmount1_DetailVatAmount!: number;
  DetailVatAmount1_DetailAmountVatIncluded!: number;
  DetailVatAmount1_DetailDepositVatAmount!: number;
  DetailVatAmount1_DetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount1_EcotaxAmountVatExcluded!: number;
  DetailVatAmount1_EcotaxAmountVatIncluded!: number;
  DetailVatAmount1_EcotaxVatAmount!: number;
  DetailVatAmount1_VatAmountOnDebit!: number;
  DetailVatAmount1_VatAmountOnCollection!: number;
  DetailVatAmount0_DetailVatId!: string;
  DetailVatAmount0_DetailVatRate!: number;
  DetailVatAmount0_DetailAmountVatExcluded!: number;
  DetailVatAmount0_DetailVatAmount!: number;
  DetailVatAmount0_DetailAmountVatIncluded!: number;
  DetailVatAmount0_DetailDepositVatAmount!: number;
  DetailVatAmount0_DetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount0_EcotaxAmountVatExcluded!: number;
  DetailVatAmount0_EcotaxAmountVatIncluded!: number;
  DetailVatAmount0_EcotaxVatAmount!: number;
  DetailVatAmount0_VatAmountOnDebit!: number;
  DetailVatAmount0_VatAmountOnCollection!: number;
  SettlementModeId!: string;
  ValidationState!: number;
  DocumentState!: number;
  ValidityDate!: Date;
  DeliveryDate!: Date;
  DeliveryState!: number;
  DeliveryAddress_WebSite!: string;
  DeliveryAddress_Longitude!: number;
  DeliveryAddress_Latitude!: number;
  DeliveryContact_Civility!: string;
  DeliveryContact_Name!: string;
  DeliveryContact_FirstName!: string;
  DeliveryContact_Phone!: string;
  DeliveryContact_CellPhone!: string;
  DeliveryContact_Fax!: string;
  DeliveryContact_Email!: string;
  DeliveryContact_Function!: string;
  DeliveryContact_Department!: string;
  DeliveryAddress_Description!: string;
  DeliveryAddress_Civility!: string;
  DeliveryAddress_ThirdName!: string;
  InvoicingAddress_Description!: string;
  InvoicingAddress_Civility!: string;
  InvoicingAddress_ThirdName!: string;
  DeliveryAddress_Address1!: string;
  DeliveryAddress_Address2!: string;
  DeliveryAddress_Address3!: string;
  DeliveryAddress_Address4!: string;
  InvoicingAddress_WebSite!: string;
  InvoicingAddress_Longitude!: number;
  InvoicingAddress_Latitude!: number;
  InvoicingContact_Civility!: string;
  InvoicingContact_Name!: string;
  InvoicingContact_FirstName!: string;
  InvoicingContact_Phone!: string;
  InvoicingContact_CellPhone!: string;
  InvoicingContact_Fax!: string;
  InvoicingContact_Email!: string;
  InvoicingContact_Function!: string;
  InvoicingContact_Department!: string;
  InvoicingAddress_State!: string;
  TransferedDocumentId!: string;
  StorehouseId!: string;
  InvoicingAddressId!: string;
  InvoicingContactId!: string;
  DeliveryAddressId!: string;
  DeliveryContactId!: string;
  InvoicingAddress_Address1!: string;
  InvoicingAddress_Address2!: string;
  InvoicingAddress_Address3!: string;
  InvoicingAddress_Address4!: string;
  Reference!: string;
  RecoveredFrom!: number;
  ModifiedSinceRecovery!: boolean;
  AssociatedInvoiceId!: string;
  AssociatedDeliveryOrderId!: string;
  AssociatedOrderId!: string;
  sysCreatedDate!: Date;
  sysCreatedUser!: string;
  sysModifiedDate!: Date;
  sysModifiedUser!: string;
  NotesClear!: string;
  Notes!: string;
  DetailVatAmount0_CurrencyDetailAmountVatExcluded!: number;
  DetailVatAmount0_CurrencyDetailVatAmount!: number;
  DetailVatAmount0_CurrencyDetailAmountVatIncluded!: number;
  DetailVatAmount0_CurrencyDetailDepositVatAmount!: number;
  DetailVatAmount0_CurrencyDetailVatAmountWithoutDepositAmount!: number;
  DetailVatAmount0_CurrencyEcotaxAmountVatExcluded!: number;
  DetailVatAmount0_CurrencyEcotaxAmountVatIncluded!: number;
  DetailVatAmount0_CurrencyEcotaxVatAmount!: number;
  DetailVatAmount0_CurrencyVatAmountOnDebit!: number;
  DetailVatAmount0_CurrencyVatAmountOnCollection!: number;
  ReturnState!: number;
  IntrastatIncoterm!: string;
  ReverseChargeMention!: string;
  MaintenanceContractId!: string;
  IncidentId!: string;
  SepaCommunication!: string;
  ConstructionSiteId!: string;
  Hash_ChainedId!: string;
  Hash_Hash!: Buffer;
  ExtraFeeDistributionMode!: number;
  ExtraFeeBase!: number;
  ExtraFeeTotalAmount!: number;
  ExtraFeeDistributedAmount!: number;
  ExtraFeeDistributionRates_GoodDistributeRate!: number;
  ExtraFeeDistributionRates_ServiceDistributeRate!: number;
  ExtraFeeDistributionRates_EquipmentDistributeRate!: number;
  LastRefreshPurchaseStateDate!: Date;
  ExecutionQuoteId!: string;
  SupplierType!: number;
  InvoicingAddress_CodeINSEE!: string;
  InvoicingAddress_CityINSEE!: string;
  DeliveryAddress_CodeINSEE!: string;
  DeliveryAddress_CityINSEE!: string;
  DetailTaxAmount0_VatId!: string;
  DetailTaxAmount0_VatAmount!: number;
  DetailTaxAmount1_VatId!: string;
  DetailTaxAmount1_VatAmount!: number;
  DetailTaxAmount2_VatId!: string;
  DetailTaxAmount2_VatAmount!: number;
  DetailTaxAmount3_VatId!: string;
  DetailTaxAmount3_VatAmount!: number;
  DetailTaxAmount4_VatId!: string;
  DetailTaxAmount4_VatAmount!: number;
  DetailTaxAmount5_VatId!: string;
  DetailTaxAmount5_VatAmount!: number;
  xx_Validation_Direction!: boolean;
  xx_Commande_Effectuee!: boolean;
  xx_Saisie_Cde_Terminee!: boolean;
  InvoicingContact_Profession!: string;
  DeliveryContact_Profession!: string;
    purchaseDocument: any;
    purchaseDocumentLine: any;
}
