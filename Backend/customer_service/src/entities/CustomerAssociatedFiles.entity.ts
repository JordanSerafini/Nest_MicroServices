export class CustomerAssociatedFiles {
  Id: string;
  ParentId: string;
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
}
