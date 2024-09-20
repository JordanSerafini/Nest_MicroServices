export class SaleDocumentAssociatedFiles {
  Name: string;
  DocumentType: number;
  sysEditCounter: number;
  Content: Buffer;
  sysCreatedDate: Date;
  sysCreatedUser: string;
  sysModifiedDate: Date;
  sysModifiedUser: string;
  OneDriveShareUrl: string;
  OneDriveItemId: string;
  OneDriveCode: string;
  TypeMime: string;
  StorageType: number;

  //* Champs avec "Id"
  Id: string;
  ParentId: string;
}
