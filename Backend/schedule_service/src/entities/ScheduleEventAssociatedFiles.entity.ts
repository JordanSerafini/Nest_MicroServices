export class ScheduleEventAssociatedFiles {
  DocumentType: number; // Correspond à tinyint
  Id: string; // Correspond à uniqueidentifier
  ParentId: string; // Correspond à uniqueidentifier
  Name: string; // Correspond à nvarchar
  Content: Buffer; // Correspond à varbinary
  sysCreatedDate: Date; // Correspond à datetime
  sysCreatedUser: string; // Correspond à nvarchar
  sysModifiedDate: Date; // Correspond à datetime
  sysModifiedUser: string; // Correspond à nvarchar
  sysEditCounter: number; // Correspond à int
  OneDriveShareUrl: string; // Correspond à nvarchar
  OneDriveItemId: string; // Correspond à nvarchar
  OneDriveCode: string; // Correspond à nvarchar
  TypeMime: string; // Correspond à nvarchar
  StorageType: number; // Correspond à tinyint
}
