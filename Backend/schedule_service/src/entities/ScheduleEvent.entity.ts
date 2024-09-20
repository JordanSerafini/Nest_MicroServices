export class ScheduleEvent {
  xx_Projet: boolean;
  Id: string; // Correspond à uniqueidentifier
  StartDateTime: Date;
  EndDateTime: Date;
  Caption: string;
  WorkedHours: number;
  PlannedHours: number;
  EventState: number; // Correspond à tinyint
  SalePriceVatExcluded: number;
  DocumentType: number; // Correspond à tinyint
  Maintenance_NextEventDate: Date;
  NextReminder: Date;
  Address_Address1: string;
  Address_Address2: string;
  Address_Address3: string;
  Address_Address4: string;
  Address_ZipCode: string;
  Address_City: string;
  Address_State: string;
  Address_CountryIsoCode: string;
  Address_Description: string;
  Address_Civility: string;
  Address_ThirdName: string;
  NotesClear: string;
  //* --------------------------------------------------- Table ID
  CustomerId: string;
  SupplierId: string;
  AddressId: string;
  ContactId: string;
  SaleDocumentId: string;
  PurchaseDocumentId: string;
  StockDocumentId: string;
  Maintenance_CustomerProductId: string;
  Maintenance_NextMaintenanceEventId: string;
  ScheduleEventNumber: string;
  Maintenance_ContractId: string;
  Maintenance_IncidentId: string;
  Maintenance_TravelExpenseId: string;
  Maintenance_TravelExpenseInvoiceId: string;
  PayrollExchangeGroupId: string;
  ItemId: string;
  InvoiceColleagueId: string;
  InvoiceCustomerId: string;
  DealId: string;
  InvoiceId: string;
  InvoiceLineId: string;
  SaleDocumentLineid: string;
  ConstructionSiteId: string;
  //* --------------------------------------------------- Durée estimée de la main-d'oeuvre
  LabourUpdatedExpectedDuration_DurationInHours: number;
  LabourUpdatedExpectedDuration_Duration: number;
  LabourUpdatedExpectedDuration_UnitId: string;
  LabourUpdatedExpectedDuration_EditedDuration: string;
  LabourScheduledDuration_DurationInHours: number;
  LabourScheduledDuration_Duration: number;
  LabourScheduledDuration_UnitId: string;
  LabourScheduledDuration_EditedDuration: string;
  LabourPercentComplete: number; // Correspond à tinyint
  LabourRemainingDuration_DurationInHours: number;
  LabourRemainingDuration_Duration: number;
  LabourRemainingDuration_UnitId: string;
  LabourRemainingDuration_EditedDuration: string;
  LabourOverDuration_DurationInHours: number;
  LabourOverDuration_Duration: number;
  LabourOverDuration_UnitId: string;
  LabourOverDuration_EditedDuration: string;

  //* --------------------------------------------------- Adresse conctact de l'événement
  Address_Longitude: number;
  Address_Latitude: number;
  Contact_Civility: string;
  Contact_Name: string;
  Contact_FirstName: string;
  Contact_Phone: string;
  Contact_CellPhone: string;
  Contact_Fax: string;
  Contact_Email: string;
  Contact_Function: string;
  Contact_Department: string;
  Address_CodeINSEE: string;
  Address_CityINSEE: string;
  Contact_Profession: string;
  ScheduleShowTimeLine: boolean;
  LineType: number; // Correspond à tinyint
  LineOrder: number;
  ExpectedDuration_DurationInHours: number;
  AchievedDuration_DurationInHours: number;
  NetAmountVatExcluded: number;
  HourlyCostPrice: number;
  CostAmount: number;
  IncludeInRealizedCost: number; // Correspond à tinyint
  ToInvoice: boolean;
  Address_Npai: boolean;
  Contact_NaturalPerson: boolean;
  Contact_OptIn: boolean;
  ReminderEnabled: boolean;
  //* --------------------------------------------------- Maintenance du produit
  Maintenance_InvoiceTravelExpenseOnLastIntervention: number; // Correspond à tinyint
  Maintenance_SendConfirmationMail: boolean;
  Maintenance_NextEventToForesee: boolean;
  Maintenance_DecreaseContractCounterForNextEvent: boolean;
  Maintenance_IncludeInIncidentPredictedCost: number; // Correspond à tinyint
  Maintenance_IncludeInContractPredictedCost: number; // Correspond à tinyint
  InvoiceInterveners: boolean;
  InvoiceEquipments: boolean;
  PredictedCostAmount: number;
  Maintenance_ContractHoursNumberDecremented: number;
  Maintenance_InterventionDescription: string;
  Maintenance_InterventionDescriptionClear: string;
  Maintenance_InterventionReport: string;
  Maintenance_InterventionReportClear: string;
  Maintenance_Reference: string;
  Maintenance_ScheduleEventTemplateId: string;
  Maintenance_TravelDuration: number;
  sysEditCounter: number;
  Contact_ExternalId_GoogleId: string;
  Contact_ExternalId_OutlookId: string;
  CreatorColleagueId: string;
  ReminderType: number; // Correspond à tinyint
  Reminder: number; // Correspond à smallint
  Address_WebSite: string;
  Quantity: number;
  EventType: string; // Correspond à uniqueidentifier
  ColleagueId: string;
  EquipmentId: string;
  ParentEventId: string;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  Notes: string;
  xx_Gestion_Projet_Posit: string;
  xx_Total_Temps_Realise: number;
  xx_Total_Temps_Realise_Client: number;
  xx_Total_Temps_Realise_Interne: number;
  xx_Type_Tache: string;
  xx_Theme: string;
  xx_Services: string;
  xx_Theme_Commercial: string;
  xx_Duree_Pevue: number;
  xx_Total_Temps_Realise_Relationnel: number;
  xx_Duree_Trajet: number;
  xx_Activite: string;
  xx_Total_Temps_Realise_Trajet: number;
  xx_Total_Temps_Realise_Formation: number;
  xx_Total_Temps_Realise_Maquettage: number;
  xx_Logiciel: string;
  xx_Fournisseur: string;
  xx_URGENT: boolean;
  SubContractorId: string;
  ExpectedDuration_Duration: number;
  ExpectedDuration_UnitId: string;
  ExpectedDuration_EditedDuration: string;
  AchievedDuration_Duration: number;
  AchievedDuration_UnitId: string;
  AchievedDuration_EditedDuration: string;
  Contact_AllowUsePersonnalDatas: boolean;
  DisplayType: number; // Correspond à tinyint
  CompetenceId: string;
  EquipmentTypeId: string;
  ExceptionWorked: boolean;
  ExceptionCompetenceIds: string;
  ExceptionColleagueIds: string;
  ExceptionColleagueSelectionType: number; // Correspond à tinyint
  ExceptionDaySchedule0_StartTime: Date;
  ExceptionDaySchedule0_EndTime: Date;
  ExceptionDaySchedule0_Duration: number;
  ExceptionDaySchedule0_Active: boolean;
  ExceptionDaySchedule0_LunchStartTime: Date;
  ExceptionDaySchedule0_LunchEndTime: Date;
  ExceptionDaySchedule0_Customize: boolean;
  ExceptionDaySchedule1_StartTime: Date;
  ExceptionDaySchedule1_EndTime: Date;
  ExceptionDaySchedule1_Duration: number;
  ExceptionDaySchedule1_Active: boolean;
  ExceptionDaySchedule1_LunchStartTime: Date;
  ExceptionDaySchedule1_LunchEndTime: Date;
  ExceptionDaySchedule1_Customize: boolean;
  ExceptionDaySchedule2_StartTime: Date;
  ExceptionDaySchedule2_EndTime: Date;
  ExceptionDaySchedule2_Duration: number;
  ExceptionDaySchedule2_Active: boolean;
  ExceptionDaySchedule2_LunchStartTime: Date;
  ExceptionDaySchedule2_LunchEndTime: Date;
  ExceptionDaySchedule2_Customize: boolean;
  ExceptionDaySchedule3_StartTime: Date;
  ExceptionDaySchedule3_EndTime: Date;
  ExceptionDaySchedule3_Duration: number;
  ExceptionDaySchedule3_Active: boolean;
  ExceptionDaySchedule3_LunchStartTime: Date;
  ExceptionDaySchedule3_LunchEndTime: Date;
  ExceptionDaySchedule3_Customize: boolean;
  ExceptionDaySchedule4_StartTime: Date;
  ExceptionDaySchedule4_EndTime: Date;
  ExceptionDaySchedule4_Duration: number;
  ExceptionDaySchedule4_Active: boolean;
  ExceptionDaySchedule4_LunchStartTime: Date;
  ExceptionDaySchedule4_LunchEndTime: Date;
  ExceptionDaySchedule4_Customize: boolean;
  ExceptionDaySchedule5_StartTime: Date;
  ExceptionDaySchedule5_EndTime: Date;
  ExceptionDaySchedule5_Duration: number;
  ExceptionDaySchedule5_Active: boolean;
  ExceptionDaySchedule5_LunchStartTime: Date;
  ExceptionDaySchedule5_LunchEndTime: Date;
  ExceptionDaySchedule5_Customize: boolean;
  ExceptionDaySchedule6_StartTime: Date;
  ExceptionDaySchedule6_EndTime: Date;
  ExceptionDaySchedule6_Duration: number;
  ExceptionDaySchedule6_Active: boolean;
  ExceptionDaySchedule6_LunchStartTime: Date;
  ExceptionDaySchedule6_LunchEndTime: Date;
  ExceptionDaySchedule6_Customize: boolean;
  IsScheduleException: boolean;
  MustBeCalculated: boolean;
  CreatedByExecutionQuote: boolean;
  WorkingDuration_DurationInHours: number;
  WorkingDuration_Duration: number;
  WorkingDuration_UnitId: string;
  WorkingDuration_EditedDuration: string;
  UpdatedWorkingDuration_DurationInHours: number;
  UpdatedWorkingDuration_Duration: number;
  UpdatedWorkingDuration_UnitId: string;
  UpdatedWorkingDuration_EditedDuration: string;
  GlobalPercentComplete: number; // Correspond à tinyint
  ProgressUpdateLastDate: Date;
  OccupancyRate: number; // Correspond à tinyint
  AbsenceRange: number; // Correspond à tinyint
  DateChangeRemindEnabled: boolean;
  ConflictTypes: number;
  ConflictIndicator: number; // Correspond à tinyint
  AccountingYearId: string;
  ConflictImageIndicator: Buffer;
  ConflictTypesImage: Buffer;
  PayrollVariableDuration0: number;
  PayrollVariableDuration1: number;
  PayrollVariableDuration2: number;
  PayrollVariableDuration3: number;
  PayrollVariableDuration4: number;
  PayrollVariableDuration5: number;
  PayrollVariableDuration6: number;
  PayrollVariableDuration7: number;
  PayrollVariableDuration8: number;
  PayrollVariableDuration9: number;
  PayrollVariableDuration10: number;
  PayrollVariableDuration11: number;
  PayrollVariableDuration12: number;
  PayrollVariableDuration13: number;
  PayrollVariableDuration14: number;
  PayrollVariableDuration15: number;
  PayrollVariableDuration16: number;
  PayrollVariableDuration17: number;
  PayrollVariableDuration18: number;
  PayrollVariableDuration19: number;
  PayrollVariableDuration20: number;
  PayrollVariableDuration21: number;
  PayrollVariableDuration22: number;
  PayrollVariableDuration23: number;
  PayrollVariableDuration24: number;
  PayrollVariableDuration25: number;
  PayrollVariableDuration26: number;
  PayrollVariableDuration27: number;
  PayrollVariableDuration28: number;
  PayrollVariableDuration29: number;
  PayrollVariableDuration30: number;
  PayrollVariableDuration31: number;
  PayrollVariableDuration32: number;
  PayrollVariableDuration33: number;
  PayrollVariableDuration34: number;
  PayrollVariableDuration35: number;
  PayrollVariableDuration36: number;
  PayrollVariableDuration37: number;
  PayrollVariableDuration38: number;
  PayrollVariableDuration39: number;
  PayrollVariableDuration40: number;
  PayrollVariableDuration41: number;
  PayrollVariableDuration42: number;
  PayrollVariableDuration43: number;
  PayrollVariableDuration44: number;
  PayrollVariableDuration45: number;
  PayrollVariableDuration46: number;
  PayrollVariableDuration47: number;
  PayrollVariableDuration48: number;
  PayrollVariableDuration49: number;
}

//   it → boolean
// tinyint → number
// decimal → number
// nvarchar → string
// datetime → Date
// uniqueidentifier → string
// varbinary → Buffer
