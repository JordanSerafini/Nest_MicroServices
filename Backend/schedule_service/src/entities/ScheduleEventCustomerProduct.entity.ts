export class ScheduleEventCustomerProduct {
  PartsCoverType: number; // Correspond à tinyint
  LabourCoverType: number; // Correspond à tinyint
  TravelCoverType: number; // Correspond à tinyint
  StandardExchange: boolean; // Correspond à bit
  Caption: string; // Correspond à nvarchar
  DoNotCreateMovementForExchangedItem: boolean; // Correspond à bit
  DecrementMaintenanceContractCounter: boolean; // Correspond à bit
  Id: string; // Correspond à uniqueidentifier
  ScheduleEventId: string; // Correspond à uniqueidentifier
  ContractHoursNumberDecremented: number; // Correspond à decimal
  ExchangeCustomerProductId: string; // Correspond à nvarchar
  TrackingNumber: string; // Correspond à nvarchar
  sysCreatedDate: Date; // Correspond à datetime
  sysCreatedUser: string; // Correspond à nvarchar
  sysModifiedDate: Date; // Correspond à datetime
  sysModifiedUser: string; // Correspond à nvarchar
  CustomerProductId: string; // Correspond à nvarchar
  ItemId: string; // Correspond à nvarchar
  ExchangeItemId: string; // Correspond à nvarchar
  ExchangeDate: Date; // Correspond à datetime
  ExchangeTrackingNumber: string; // Correspond à nvarchar
  StorehouseId: string; // Correspond à uniqueidentifier
  MaintenanceContractId: string; // Correspond à nvarchar
  ExchangeStockDocumentId: string; // Correspond à uniqueidentifier
  ExchangeStockDocumentLineId: string; // Correspond à nvarchar
}
