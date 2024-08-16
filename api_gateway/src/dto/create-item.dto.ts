import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateItemDto {
  Reference: number;
  id: number;

  @IsOptional()
  @IsDate()
  Date?: Date;

  @IsOptional()
  @IsNumber()
  BarcodePrice?: number;

  @IsOptional()
  @IsNumber()
  BarcodeWeight?: number;

  @IsOptional()
  @IsBoolean()
  PosAddItem?: boolean;

  @IsOptional()
  @IsNumber()
  LoyaltyPoints?: number;

  @IsOptional()
  @IsNumber()
  CalculateLoyaltyFrom?: number;

  @IsOptional()
  @IsBoolean()
  GiftVoucher?: boolean;

  @IsOptional()
  @IsBoolean()
  IntrastatExcluded?: boolean;

  @IsOptional()
  @IsBoolean()
  CreateCustomerProductInCustomerPark?: boolean;

  @IsOptional()
  @IsBoolean()
  IsMaintenanceContract?: boolean;

  @IsOptional()
  @IsBoolean()
  IsGuaranteeExtension?: boolean;

  @IsOptional()
  @IsNumber()
  CustomerParkCreation?: number;

  @IsOptional()
  @IsBoolean()
  StockBookingAllowed?: boolean | number;

  @IsOptional()
  @IsBoolean()
  AutomaticStockBooking?: boolean;

  @IsOptional()
  @IsBoolean()
  IncludeToRecursiveReplenishment?: boolean;

  @IsOptional()
  @IsBoolean()
  IncludeToFabricationReplenishment?: boolean;

  @IsOptional()
  @IsBoolean()
  IncludeToSupplierReplenishment?: boolean;

  @IsOptional()
  @IsNumber()
  CadenceQuantity?: number;

  @IsOptional()
  @IsNumber()
  CadenceNumberOfDays?: number;

  @IsOptional()
  @IsBoolean()
  DoNotAssortAssemblyRequestsWithDifferentDates?: boolean;

  @IsOptional()
  @IsNumber()
  MaximumGapDayToAssort?: number;

  @IsOptional()
  @IsNumber()
  NomenclatureAccountingTransferTypeForSale?: number;

  @IsOptional()
  @IsNumber()
  NomenclatureAccountingTransferTypeForPurchase?: number;

  @IsOptional()
  @IsBoolean()
  VirtualPump?: boolean;

  @IsOptional()
  @IsNumber()
  VirtualStockValue?: number;

  @IsOptional()
  @IsNumber()
  BookedQuantity?: number;

  @IsOptional()
  @IsBoolean()
  PurchaseBillOfQuantitiesProgramKeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  NotOnMarket?: boolean;

  @IsOptional()
  @IsBoolean()
  PurchaseUnitPriceProgramKeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  CanBePartiallyDelivered?: boolean;

  @IsOptional()
  @IsString()
  Caption?: string;

  @IsOptional()
  @IsNumber()
  OxatisOxatisHandlingSurcharge1St?: number;

  @IsOptional()
  @IsNumber()
  OxatisOxatisHandlingSurchargeOthers?: number;

  @IsOptional()
  @IsBoolean()
  InterventionDurationEqualsQuantity?: boolean;

  @IsOptional()
  @IsNumber()
  Height?: number;

  @IsOptional()
  @IsNumber()
  Width?: number;

  @IsOptional()
  @IsNumber()
  Length?: number;

  @IsOptional()
  @IsString()
  FamilyId?: string;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisUseSubFamilyAsBrand?: boolean;

  @IsOptional()
  @IsBoolean()
  IsManagedByCounterMark?: boolean;

  @IsOptional()
  @IsBoolean()
  IsCounterMarkForced?: boolean;

  @IsOptional()
  @IsNumber()
  SalePurchaseConversionRate?: number;

  @IsOptional()
  @IsNumber()
  LimitDateMode?: number;

  @IsOptional()
  @IsNumber()
  LimitDateSafetyDelay?: number;

  @IsOptional()
  @IsUUID()
  UniqueId?: string;

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
  InterestRate?: number;

  @IsOptional()
  @IsNumber()
  InterestAmount?: number;

  @IsOptional()
  @IsNumber()
  SalePriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  BrandRate?: number;

  @IsOptional()
  @IsNumber()
  VatAmount?: number;

  @IsOptional()
  @IsNumber()
  SalePriceVatIncluded?: number;

  @IsOptional()
  @IsBoolean()
  ManageStock?: boolean;

  @IsOptional()
  @IsNumber()
  RealStock?: number;

  @IsOptional()
  @IsNumber()
  Pump?: number;

  @IsOptional()
  @IsNumber()
  StockValue?: number;

  @IsOptional()
  @IsNumber()
  OrderedQuantity?: number;

  @IsOptional()
  @IsNumber()
  SuppliersOrderedQuantity?: number;

  @IsOptional()
  @IsNumber()
  VirtualStock?: number;

  @IsOptional()
  @IsNumber()
  DefaultQuantity?: number;

  @IsOptional()
  @IsNumber()
  Volume?: number;

  @IsOptional()
  @IsNumber()
  Weight?: number;

  @IsOptional()
  @IsNumber()
  NetWeight?: number;

  @IsOptional()
  @IsNumber()
  ComponentsPurchasePrice?: number;

  @IsOptional()
  @IsNumber()
  ComponentsCostPrice?: number;

  @IsOptional()
  @IsNumber()
  ComponentsSalePriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  ComponentsSalePriceVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  PrintComponentDetail?: number;

  @IsOptional()
  @IsNumber()
  AssemblingVirtualQuantity?: number;

  @IsOptional()
  @IsNumber()
  DisassemblingQuantity?: number;

  @IsOptional()
  @IsNumber()
  QuantityUsedToAssemblate?: number;

  @IsOptional()
  @IsNumber()
  QuantityFromDisassembling?: number;

  @IsOptional()
  @IsBoolean()
  AllowNegativeStock?: boolean;

  @IsOptional()
  @IsBoolean()
  UseComponentVat?: boolean;

  @IsOptional()
  @IsBoolean()
  ApplyPriceListOnComponents?: boolean;

  @IsOptional()
  @IsNumber()
  ActiveState?: number;

  @IsOptional()
  @IsNumber()
  AdvisedSalePriceVatExcluded?: number;

  @IsOptional()
  @IsBoolean()
  SetItemSalePriceWithAdvisedSalePrice?: boolean;

  @IsOptional()
  @IsNumber()
  TrackingMode?: number;

  @IsOptional()
  @IsBoolean()
  AllowComponentsModification?: boolean;

  @IsOptional()
  @IsBoolean()
  AllowPublishOnWeb?: boolean;

  @IsOptional()
  @IsNumber()
  ImageVersion?: number;

  @IsOptional()
  @IsNumber()
  PriceDecimalNumber?: number;

  @IsOptional()
  @IsBoolean()
  IsHumanServicesIncludedInAttestation?: boolean;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisShowInStockNote?: boolean;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisShowStockLevel?: boolean;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisShowIfOutOfStock?: boolean;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisSaleIfOutOfStock?: boolean;

  @IsOptional()
  @IsNumber()
  OxatisOxatisSaleIfOutOfStockScenario?: number;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisShowDaysToShip?: boolean;

  @IsOptional()
  @IsNumber()
  OxatisOxatisShipPrice?: number;

  @IsOptional()
  @IsNumber()
  OxatisOxatisDaysToShip?: number;

  @IsOptional()
  @IsBoolean()
  OxatisOxatisUserMainSupplierDaysToShip?: boolean;

  @IsOptional()
  @IsUUID()
  Id?: string;

  @IsOptional()
  @IsNumber()
  ItemType?: number;

  @IsOptional()
  @IsBoolean()
  BillOfQuantitiesProgramKeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  SaleUnitPriceProgramKeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  UpdateComponentsStockInFabrication?: boolean;

  @IsOptional()
  @IsNumber()
  CustomersDeliveryOrderPreparingQuantity?: number;

  @IsOptional()
  @IsNumber()
  CustomersReturnOrderPreparingQuantity?: number;

  @IsOptional()
  @IsNumber()
  SuppliersDeliveryOrderPreparingQuantity?: number;

  @IsOptional()
  @IsNumber()
  SuppliersReturnOrderPreparingQuantity?: number;

  @IsOptional()
  @IsBoolean()
  StockBillOfQuantitiesProgramKeepActiveFromQuoteToOrder?: boolean;

  @IsOptional()
  @IsNumber()
  PurchaseChargesRate?: number;

  @IsOptional()
  @IsBoolean()
  PosIsScale?: boolean;

  @IsOptional()
  @IsString()
  PosTare?: string | null;

  @IsOptional()
  @IsNumber()
  ReplenishmentDeliveryAddressType?: number;

  @IsOptional()
  @IsString()
  ItemImage?: string | null;

  @IsOptional()
  @IsString()
  DesCom?: string;

  @IsOptional()
  @IsString()
  DesComClear?: string;

  @IsOptional()
  @IsString()
  OxatisOxatisMetaTitle?: string | null;

  @IsOptional()
  @IsString()
  OxatisOxatisMetaDescription?: string | null;

  @IsOptional()
  @IsString()
  OxatisOxatisMetaKeywords?: string | null;

  @IsOptional()
  @IsString()
  OxatisOxatisBrand?: string | null;

  @IsOptional()
  @IsString()
  MainIntervener?: string | null;

  @IsOptional()
  @IsString()
  IntrastatNc8NomenclatureId?: string | null;

  @IsOptional()
  @IsString()
  Group1?: string | null;

  @IsOptional()
  @IsString()
  Group2?: string | null;

  @IsOptional()
  @IsBoolean()
  NotPrintable?: boolean | null;

  @IsOptional()
  @IsBoolean()
  NotIncluded?: boolean | null;

  @IsOptional()
  @IsBoolean()
  IsFixedPrice?: boolean | null;

  @IsOptional()
  @IsNumber()
  NonInvoiceableType?: number | null;

  @IsOptional()
  @IsNumber()
  ComponentCalculationType?: number | null;

  @IsOptional()
  @IsString()
  ReplacementItem?: string | null;

  @IsOptional()
  @IsString()
  WeightUnitId?: string | null;

  @IsOptional()
  @IsNumber()
  NumberOfItemByPackage?: number;

  @IsOptional()
  @IsString()
  VolumeUnitId?: string | null;

  @IsOptional()
  @IsString()
  SupplierId?: string;

  @IsOptional()
  @IsString()
  EcotaxId?: string | null;

  @IsOptional()
  @IsNumber()
  StockDestination?: number;

  @IsOptional()
  @IsString()
  StockVarianceAccount?: string;

  @IsOptional()
  @IsString()
  CurrentStockAccount?: string;

  @IsOptional()
  @IsString()
  VatId?: string;

  @IsOptional()
  @IsString()
  SysModuleId?: string | null;

  @IsOptional()
  @IsString()
  SysDatabaseId?: string | null;

  @IsOptional()
  @IsNumber()
  SysRecordVersion?: number;

  @IsOptional()
  @IsString()
  SysRecordVersionId?: string;

  @IsOptional()
  @IsNumber()
  SysEditCounter?: number;

  @IsOptional()
  @IsNumber()
  LimitDateSafetyDelayMode?: number | null;

  @IsOptional()
  @IsNumber()
  DefaultLifetime?: number | null;

  @IsOptional()
  @IsNumber()
  PurchasePriceUpdateType?: number | null;

  @IsOptional()
  @IsString()
  AnalyticAccountingGridId?: string | null;

  @IsOptional()
  @IsString()
  PurchaseUnitId?: string | null;

  @IsOptional()
  @IsString()
  DimensionUnitId?: string | null;

  @IsOptional()
  @IsString()
  OxatisOxatisLongDescription?: string | null;

  @IsOptional()
  @IsString()
  OxatisOxatisLongDescriptionClear?: string | null;

  @IsOptional()
  @IsString()
  OxatisOxatisSmallImage?: string | null;

  @IsOptional()
  @IsString()
  PurchaseBillOfQuantitiesProgramProgram?: string | null;

  @IsOptional()
  @IsString()
  CatalogId?: string | null;

  @IsOptional()
  @IsString()
  CatalogItemId?: string | null;

  @IsOptional()
  @IsString()
  EcotaxFurnitureId?: string | null;

  @IsOptional()
  @IsString()
  PurchaseUnitPriceProgramProgram?: string | null;

  @IsOptional()
  @IsString()
  LocalizableCaption2?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesCom2?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesComClear2?: string | null;

  @IsOptional()
  @IsString()
  LocalizableCaption3?: string | null;

  @IsOptional()
  @IsString()
  LocalizableCaption4?: string | null;

  @IsOptional()
  @IsString()
  LocalizableCaption5?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesCom3?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesComClear3?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesCom4?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesComClear4?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesCom5?: string | null;

  @IsOptional()
  @IsString()
  LocalizableDesComClear5?: string | null;

  @IsOptional()
  @IsString()
  IntrastatOriginCountryId?: string | null;

  @IsOptional()
  @IsString()
  ParentRangeItemId?: string | null;

  @IsOptional()
  @IsString()
  RangeTypeElementId0?: string | null;

  @IsOptional()
  @IsString()
  RangeTypeElementId1?: string | null;

  @IsOptional()
  @IsString()
  RangeTypeElementId2?: string | null;

  @IsOptional()
  @IsString()
  RangeTypeElementId3?: string | null;

  @IsOptional()
  @IsString()
  RangeTypeElementId4?: string | null;

  @IsOptional()
  @IsString()
  DefaultAllowedStorehouseId?: string | null;

  @IsOptional()
  @IsString()
  MaintenanceContractTemplateId?: string | null;

  @IsOptional()
  @IsString()
  GuaranteeTypeId?: string | null;

  @IsOptional()
  @IsString()
  StockBillOfQuantitiesProgramProgram?: string | null;

  @IsOptional()
  @IsString()
  PosThumbnail?: string | null;

  @IsOptional()
  @IsNumber()
  GiftVoucherCashValue?: number | null;

  @IsOptional()
  @IsNumber()
  GiftVoucherValidityDuration?: number | null;

  @IsOptional()
  @IsBoolean()
  IsExtraFee?: boolean;

  @IsOptional()
  @IsString()
  TimeUnitId?: string | null;

  @IsOptional()
  @IsString()
  TechnicalDesCom?: string | null;

  @IsOptional()
  @IsString()
  TechnicalDesComClear?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesCom2?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesComClear2?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesCom3?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesComClear3?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesCom4?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesComClear4?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesCom5?: string | null;

  @IsOptional()
  @IsString()
  LocalizableTechnicalDesComClear5?: string | null;

  @IsOptional()
  @IsString()
  CompetenceId?: string | null;

  @IsOptional()
  @IsString()
  EquipmentTypeId?: string | null;

  @IsOptional()
  @IsString()
  ScheduleEventTemplateId?: string | null;

  @IsOptional()
  @IsNumber()
  CompetenceNumberToPlan?: number | null;

  @IsOptional()
  @IsNumber()
  EquipmentTypeNumberToPlan?: number | null;

  @IsOptional()
  @IsNumber()
  CadenceDuration?: number;

  @IsOptional()
  @IsNumber()
  CadenceDurationType?: number;

  @IsOptional()
  @IsNumber()
  CadenceDurationQuantity?: number;

  @IsOptional()
  @IsNumber()
  InstallationTime?: number;

  @IsOptional()
  @IsString()
  LabourCode?: string | null;

  @IsOptional()
  @IsBoolean()
  AutoUpdateLabourPrice?: boolean;

  @IsOptional()
  @IsBoolean()
  IsEquipment?: boolean;

  @IsOptional()
  @IsNumber()
  InstallationCalculationType?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesPurchasePrice?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesChargeRate?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesChargeAmount?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesCostPrice?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesInterestRate?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesSalePriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesBrandRate?: number;

  @IsOptional()
  @IsString()
  MaterialPricesVatId?: string;

  @IsOptional()
  @IsNumber()
  MaterialPricesVatAmount?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesSalePriceVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  MaterialPricesAdvisedSalePriceVatExcluded?: number;

  @IsOptional()
  @IsBoolean()
  MaterialPricesSetItemSalePriceWithAdvisedSalePrice?: boolean;

  @IsOptional()
  @IsBoolean()
  MaterialPricesIsFixedPrice?: boolean | null;

  @IsOptional()
  @IsString()
  MaterialPricesEcotaxFurnitureId?: string | null;

  @IsOptional()
  @IsNumber()
  LabourPricesPurchasePrice?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesChargeRate?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesChargeAmount?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesCostPrice?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesInterestRate?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesInterestAmount?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesSalePriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesBrandRate?: number;

  @IsOptional()
  @IsString()
  LabourPricesVatId?: string;

  @IsOptional()
  @IsNumber()
  LabourPricesVatAmount?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesSalePriceVatIncluded?: number;

  @IsOptional()
  @IsNumber()
  LabourPricesAdvisedSalePriceVatExcluded?: number;

  @IsOptional()
  @IsBoolean()
  LabourPricesSetItemSalePriceWithAdvisedSalePrice?: boolean;

  @IsOptional()
  @IsBoolean()
  LabourPricesIsFixedPrice?: boolean | null;

  @IsOptional()
  @IsString()
  LabourPricesEcotaxFurnitureId?: string | null;

  @IsOptional()
  @IsBoolean()
  CanBePartiallyInvoiced?: boolean;

  @IsOptional()
  @IsBoolean()
  PickMovementDisallowedOnTotallyBookedItem?: boolean;

  @IsOptional()
  @IsString()
  SalePriceModifiedDate?: string | null;

  @IsOptional()
  @IsString()
  SalePriceModifiedUserId?: string | null;

  @IsOptional()
  @IsString()
  TarifeoCode?: string | null;

  @IsOptional()
  @IsString()
  TarifeoFullCode?: string | null;

  @IsOptional()
  @IsString()
  TarifeoProducerId?: string | null;

  @IsOptional()
  @IsString()
  ProducerName?: string | null;

  @IsOptional()
  @IsString()
  TarifeoPriceDate?: string | null;

  @IsOptional()
  @IsString()
  TarifeoPriceVersion?: string | null;

  @IsOptional()
  @IsString()
  TarifeoUpdateDatetime?: string | null;

  @IsOptional()
  @IsBoolean()
  IsSubscription?: boolean;

  @IsOptional()
  @IsNumber()
  SubscriptionPassings?: number;

  @IsOptional()
  @IsNumber()
  SubscriptionTotalCostPrice?: number;

  @IsOptional()
  @IsNumber()
  SubscriptionTotalPurchasePrice?: number;

  @IsOptional()
  @IsNumber()
  SubscriptionTotalSalePriceVatExcluded?: number;

  @IsOptional()
  @IsNumber()
  SubscriptionValidityDuration?: number;
}
