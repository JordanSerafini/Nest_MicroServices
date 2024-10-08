import { Item } from "./item";

interface Devis {
    Xx_Soldee: string;
    Xx_Fin_Loc: string;
    Deliveryaddress_Npai: string;
    Useinvoicingaddressasdeliveryaddress: string;
    Useinvoicingcontactasdeliverycontact: string;
    Shippingamountvatexcluded: string;
    Shippingvatid: string;
    Amountvatexcludedwithdiscountandshipping: string;
    Amountvatexcludedwithdiscountandshippingwithoutecotax: string;
    Vatamountwithoutecotax: string;
    Vatamount: string;
    Amountvatincluded: string;
    Previousdepositamount: string;
    Depositamount: string;
    Depositcurrencyamount: string;
    Previousdepositcurrencyamount: string;
    Totaldueamount: string;
    Isecotaxamountincludedtodueamount: string;
    Ecotaxamountvatexcluded: string;
    Ecotaxvatamount: string;
    Ecotaxamountvatincluded: string;
    Detailvatamount0_Vatamountoncollectionwithoutdeposit: string;
    Detailvatamount0_Vatamountondebitwithoutdeposit: string;
    Detailvatamount0_Taxamount: string;
    Detailvatamount0_Taxvatamount: string;
    Detailvatamount0_Reamount: string;
    Detailvatamount1_Vatamountoncollectionwithoutdeposit: string;
    Detailvatamount1_Vatamountondebitwithoutdeposit: string;
    Detailvatamount1_Taxamount: string;
    Detailvatamount1_Taxvatamount: string;
    Detailvatamount1_Reamount: string;
    Detailvatamount2_Vatamountoncollectionwithoutdeposit: string;
    Detailvatamount2_Vatamountondebitwithoutdeposit: string;
    Detailvatamount2_Taxamount: string;
    Detailvatamount2_Taxvatamount: string;
    Detailvatamount2_Reamount: string;
    Xx_Cloture: string;
    Countermarforcedkonlines: string;
    Detailvatamount3_Vatamountoncollectionwithoutdeposit: string;
    Detailvatamount3_Vatamountondebitwithoutdeposit: string;
    Detailvatamount3_Taxamount: string;
    Detailvatamount3_Taxvatamount: string;
    Detailvatamount3_Reamount: string;
    Detailvatamount4_Vatamountoncollectionwithoutdeposit: string;
    Detailvatamount4_Vatamountondebitwithoutdeposit: string;
    Detailvatamount4_Taxamount: string;
    Detailvatamount4_Taxvatamount: string;
    Detailvatamount4_Reamount: string;
    Detailvatamount5_Vatamountoncollectionwithoutdeposit: string;
    Detailvatamount5_Vatamountondebitwithoutdeposit: string;
    Detailvatamount5_Taxamount: string;
    Detailvatamount5_Taxvatamount: string;
    Detailvatamount5_Reamount: string;
    Vatmode: number;
    Numberofpackage: number;
    Iscustomnumberofpackage: string;
    Othertaxamount: string;
    Financialdiscounttype: number;
    Financialdiscountrate: string;
    Financialdiscountamount: string;
    Amountwithfinancialdiscount: string;
    Reportid: string;
    Numberofcopies: number;
    Commitmentsbalancedue: string;
    Amountvatexcluded: string;
    Costprice: string;
    Discountrate: string;
    Discountamount: string;
    Amountvatexcludedwithdiscount: string;
    Detailtaxamount0_Baseamount: string;
    Detailtaxamount0_Taxamount: string;
    Detailtaxamount1_Baseamount: string;
    Detailtaxamount1_Taxamount: string;
    Detailtaxamount2_Baseamount: string;
    Detailtaxamount2_Taxamount: string;
    Currencyconversionrate: string;
    Currencytotaldueamount: string;
    Commitmentscurrencybalancedue: string;
    Currencyamountvatincluded: string;
    Currencyapplicationtype: number;
    Currencyamountvatexcluded: string;
    Currencyamountvatexcludedwithdiscountandshipping: string;
    Currencyamountwithfinancialdiscount: string;
    Currencyshippingamountvatexcluded: string;
    Currencyamountvatexcludedwithdiscount: string;
    Currencyamountvatexcludedwithdiscountandshippingwithoutecotax: string;
    Currencyecotaxamountvatincluded: string;
    Currencyfinancialdiscountamount: string;
    Currencyvatamountwithoutecotax: string;
    Currencyecotaxvatamount: string;
    Currencyecotaxamountvatexcluded: string;
    Currencyvatamount: string;
    Currencydiscountamount: string;
    Documenttype: number;
    Interestamountvatexcluded: string;
    Interestrate: string;
    Humanservicetotalamount: string;
    HumanServiceAmountSettledByOther: string;
    HumanServiceAmountSettledByCesu: string;
    HumanServiceAmountSettledByCesup: string;
    HumanServiceDeductibleAmount: string;
    GrossInterestBase: string;
    GrossInterestRate: string;
    GrossInterestAmount: string;
    DetailTaxAmount3_BaseAmount: string;
    DetailTaxAmount3_TaxAmount: string;
    DetailTaxAmount4_BaseAmount: string;
    DetailTaxAmount4_TaxAmount: string;
    DetailTaxAmount5_BaseAmount: string;
    DetailTaxAmount5_TaxAmount: string;
    ShippingAmountInclusionType: number;
    Printed: string;
    SubjectToRe: string;
    ReAmount: string;
    TotalNetWeight: string;
    CorrectionType: number;
    IrpfAmount: string;
    IrpfRate: string;
    PriceWithTaxBased: string;
    CustomerId: string;
    CustomerName: string;
    Revision: string;
    XxLocation: string;
    XxNouveauClient: string;
    XxSepar1: string;
    XxSepar2: string;
    DetailVatAmount5_CurrencyVatAmountOnCollectionWithoutDeposit: string;
    DetailVatAmount5_CurrencyVatAmountOnDebitWithoutDeposit: string;
    DetailVatAmount5_CurrencyTaxAmount: string;
    DetailVatAmount5_CurrencyTaxVatAmount: string;
    DetailVatAmount5_CurrencyReAmount: string;
    RemainingAmountToDeliver: string;
    BrandRate: string;
    NetBrandRate: string;
    DoNotCreateMovement: string;
    CurrencyOtherTaxAmount: string;
    DetailTaxAmount0_CurrencyBaseAmount: string;
    DetailTaxAmount0_CurrencyTaxAmount: string;
    DetailTaxAmount1_CurrencyBaseAmount: string;
    DetailTaxAmount1_CurrencyTaxAmount: string;
    DetailTaxAmount2_CurrencyBaseAmount: string;
    DetailTaxAmount2_CurrencyTaxAmount: string;
    DetailTaxAmount3_CurrencyBaseAmount: string;
    DetailTaxAmount3_CurrencyTaxAmount: string;
    DetailTaxAmount4_CurrencyBaseAmount: string;
    DetailTaxAmount4_CurrencyTaxAmount: string;
    DetailTaxAmount5_CurrencyBaseAmount: string;
    DetailTaxAmount5_CurrencyTaxAmount: string;
    AutomaticSettlementGeneration: string;
    RemainingDepositAmount: string;
    RemainingDepositCurrencyAmount: string;
    DetailVatAmount3_CurrencyVatAmountOnCollectionWithoutDeposit: string;
    DetailVatAmount3_CurrencyVatAmountOnDebitWithoutDeposit: string;
    DetailVatAmount3_CurrencyTaxAmount: string;
    DetailVatAmount3_CurrencyTaxVatAmount: string;
    DetailVatAmount3_CurrencyReAmount: string;
    DetailVatAmount4_CurrencyVatAmountOnCollectionWithoutDeposit: string;
    DetailVatAmount4_CurrencyVatAmountOnDebitWithoutDeposit: string;
    DetailVatAmount4_CurrencyTaxAmount: string;
    DetailVatAmount4_CurrencyTaxVatAmount: string;
    DetailVatAmount4_CurrencyReAmount: string;
    DetailVatAmount0_CurrencyVatAmountOnCollectionWithoutDeposit: string;
    DetailVatAmount0_CurrencyVatAmountOnDebitWithoutDeposit: string;
    DetailVatAmount0_CurrencyTaxAmount: string;
    DetailVatAmount0_CurrencyTaxVatAmount: string;
    DetailVatAmount0_CurrencyReAmount: string;
    DetailVatAmount1_CurrencyVatAmountOnCollectionWithoutDeposit: string;
    DetailVatAmount1_CurrencyVatAmountOnDebitWithoutDeposit: string;
    DetailVatAmount1_CurrencyTaxAmount: string;
    DetailVatAmount1_CurrencyTaxVatAmount: string;
    DetailVatAmount1_CurrencyReAmount: string;
    DetailVatAmount2_CurrencyVatAmountOnCollectionWithoutDeposit: string;
    DetailVatAmount2_CurrencyVatAmountOnDebitWithoutDeposit: string;
    DetailVatAmount2_CurrencyTaxAmount: string;
    DetailVatAmount2_CurrencyTaxVatAmount: string;
    DetailVatAmount2_CurrencyReAmount: string;
    DispatchedByStorehouse: string;
    Id: string;
    DocumentNumber: string;
    NumberPrefix: string;
    NumberSuffix: string;
    DocumentDate: string;
    GlobalDocumentOrder: number;
    TotalVolume: string;
    TotalWeight: string;
    TerritorialityId: string;
    VatId: string;
    InvoicingAddress_Npai: string;
    ShippingNotSubjectToFinancialDiscount: string;
    SendedByMail: string;
    SerialId: string;
    IsStructuredSepaCommunication: string;
    OtherTaxAmountNotSubjectToVat: string;
    CurrencyOtherTaxAmountNotSubjectToVat: string;
    FixedShippingAmount: string;
    RemainingAmountToDeliverVatExcluded: string;
    KeepDepositVatAmount: string;
    DocumentLanguage: string;
    InvoicingChargesNotSubjectToFinancialDiscount: string;
    InvoicingChargesAmountVatExcluded: string;
    InvoicingChargesVatId: string;
    CurrencyInvoicingChargesAmountVatExcluded: string;
    LoadFabricationComponentsMode: number;
    XxDateReportAttente: string;
    MaintenanceContractId: string | null;
    IncidentId: string | null;
    SepaCommunication: string | null;
    ReverseChargeMention: string | null;
    DetailTaxAmount5_TaxCaption: string | null;
    CompanyBankId: string | null;
    CurrencyId: string | null;
    DetailTaxAmount4_TaxCaption: string | null;
    DetailTaxAmount5_TaxId: string | null;
    DetailTaxAmount5_TaxCalculationBase: string | null;
    DetailTaxAmount3_TaxCaption: string | null;
    DetailTaxAmount4_TaxId: string | null;
    DetailTaxAmount4_TaxCalculationBase: string | null;
    OriginDocumentNumber: string | null;
    SysEditCounter: number;
    SysModuleId: string | null;
    SysDatabaseId: string | null;
    SysRecordVersion: number;
    SysRecordVersionId: string;
    ColleagueId: string;
    Priority: number;
    IntervenerId: string | null;
    OriginDocumentType: number;
    DealId: string | null;
    DetailTaxAmount2_TaxCaption: string | null;
    DetailTaxAmount3_TaxId: string | null;
    DetailTaxAmount3_TaxCalculationBase: string | null;
    DetailTaxAmount1_TaxCaption: string | null;
    DetailTaxAmount2_TaxId: string | null;
    DetailTaxAmount2_TaxCalculationBase: string | null;
    DetailTaxAmount0_TaxCaption: string | null;
    DetailTaxAmount1_TaxId: string | null;
    DetailTaxAmount1_TaxCalculationBase: string | null;
    ShippingId: string | null;
    ThirdBankAccountId: string | null;
    DetailTaxAmount0_TaxId: string | null;
    DetailTaxAmount0_TaxCalculationBase: string | null;
    DetailVatAmount5_DetailDepositReAmount: string;
    DetailVatAmount5_DetailReAmountWithoutDepositAmount: string;
    PaymentTypeId: string | null;
    AccountingExchangeGroupId: string | null;
    DetailVatAmount4_DetailDepositReAmount: string;
    DetailVatAmount4_DetailReAmountWithoutDepositAmount: string;
    DetailVatAmount5_DetailVatId: string | null;
    DetailVatAmount5_DetailVatRate: string | null;
    DetailVatAmount5_DetailAmountVatExcluded: string;
    DetailVatAmount5_DetailVatAmount: string;
    DetailVatAmount5_DetailAmountVatIncluded: string;
    DetailVatAmount5_DetailDepositVatAmount: string;
    DetailVatAmount5_DetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount5_EcotaxAmountVatExcluded: string;
    DetailVatAmount5_EcotaxAmountVatIncluded: string;
    DetailVatAmount5_EcotaxVatAmount: string;
    DetailVatAmount5_VatAmountOnDebit: string;
    DetailVatAmount5_VatAmountOnCollection: string;
    DetailVatAmount3_DetailDepositReAmount: string;
    DetailVatAmount3_DetailReAmountWithoutDepositAmount: string;
    DetailVatAmount4_DetailVatId: string | null;
    DetailVatAmount4_DetailVatRate: string | null;
    DetailVatAmount4_DetailAmountVatExcluded: string;
    DetailVatAmount4_DetailVatAmount: string;
    DetailVatAmount4_DetailAmountVatIncluded: string;
    DetailVatAmount4_DetailDepositVatAmount: string;
    DetailVatAmount4_DetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount4_EcotaxAmountVatExcluded: string;
    DetailVatAmount4_EcotaxAmountVatIncluded: string;
    DetailVatAmount4_EcotaxVatAmount: string;
    DetailVatAmount4_VatAmountOnDebit: string;
    DetailVatAmount4_VatAmountOnCollection: string;
    DetailVatAmount2_DetailDepositReAmount: string;
    DetailVatAmount2_DetailReAmountWithoutDepositAmount: string;
    DetailVatAmount3_DetailVatId: string | null;
    DetailVatAmount3_DetailVatRate: string | null;
    DetailVatAmount3_DetailAmountVatExcluded: string;
    DetailVatAmount3_DetailVatAmount: string;
    DetailVatAmount3_DetailAmountVatIncluded: string;
    DetailVatAmount3_DetailDepositVatAmount: string;
    DetailVatAmount3_DetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount3_EcotaxAmountVatExcluded: string;
    DetailVatAmount3_EcotaxAmountVatIncluded: string;
    DetailVatAmount3_EcotaxVatAmount: string;
    DetailVatAmount3_VatAmountOnDebit: string;
    DetailVatAmount3_VatAmountOnCollection: string;
    DetailVatAmount1_DetailDepositReAmount: string;
    DetailVatAmount1_DetailReAmountWithoutDepositAmount: string;
    DetailVatAmount2_DetailVatId: string | null;
    DetailVatAmount2_DetailVatRate: string | null;
    DetailVatAmount2_DetailAmountVatExcluded: string;
    DetailVatAmount2_DetailVatAmount: string;
    DetailVatAmount2_DetailAmountVatIncluded: string;
    DetailVatAmount2_DetailDepositVatAmount: string;
    DetailVatAmount2_DetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount2_EcotaxAmountVatExcluded: string;
    DetailVatAmount2_EcotaxAmountVatIncluded: string;
    DetailVatAmount2_EcotaxVatAmount: string;
    DetailVatAmount2_VatAmountOnDebit: string;
    DetailVatAmount2_VatAmountOnCollection: string;
    DetailVatAmount0_DetailDepositReAmount: string;
    DetailVatAmount0_DetailReAmountWithoutDepositAmount: string;
    DetailVatAmount1_DetailVatId: string | null;
    DetailVatAmount1_DetailVatRate: string | null;
    DetailVatAmount1_DetailAmountVatExcluded: string;
    DetailVatAmount1_DetailVatAmount: string;
    DetailVatAmount1_DetailAmountVatIncluded: string;
    DetailVatAmount1_DetailDepositVatAmount: string;
    DetailVatAmount1_DetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount1_EcotaxAmountVatExcluded: string;
    DetailVatAmount1_EcotaxAmountVatIncluded: string;
    DetailVatAmount1_EcotaxVatAmount: string;
    DetailVatAmount1_VatAmountOnDebit: string;
    DetailVatAmount1_VatAmountOnCollection: string;
    DetailVatAmount0_DetailVatId: string;
    DetailVatAmount0_DetailVatRate: string;
    DetailVatAmount0_DetailAmountVatExcluded: string;
    DetailVatAmount0_DetailVatAmount: string;
    DetailVatAmount0_DetailAmountVatIncluded: string;
    DetailVatAmount0_DetailDepositVatAmount: string;
    DetailVatAmount0_DetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount0_EcotaxAmountVatExcluded: string;
    DetailVatAmount0_EcotaxAmountVatIncluded: string;
    DetailVatAmount0_EcotaxVatAmount: string;
    DetailVatAmount0_VatAmountOnDebit: string;
    DetailVatAmount0_VatAmountOnCollection: string;
    SettlementModeId: string;
    ValidationState: string | null;
    DocumentState: string | null;
    ValidityDate: string | null;
    DeliveryDate: string | null;
    DeliveryState: string | null;
    DeliveryAddress_Description: string;
    DeliveryAddress_Civility: string;
    DeliveryAddress_ThirdName: string;
    DeliveryAddress_Website: string | null;
    DeliveryAddress_Longitude: string | null;
    DeliveryAddress_Latitude: string | null;
    DeliveryContact_Civility: string;
    DeliveryContact_Name: string;
    DeliveryContact_FirstName: string;
    DeliveryContact_Phone: string;
    DeliveryContact_CellPhone: string;
    DeliveryContact_Fax: string;
    DeliveryContact_Email: string;
    DeliveryContact_Function: string | null;
    DeliveryContact_Department: string | null;
    DeliveryAddress_State: string | null;
    InvoicingAddress_State: string | null;
    InvoicingAddress_Description: string;
    InvoicingAddress_Civility: string;
    InvoicingAddress_ThirdName: string;
    DeliveryAddress_Address1: string;
    DeliveryAddress_Address2: string | null;
    DeliveryAddress_Address3: string | null;
    DeliveryAddress_Address4: string | null;
    InvoicingAddress_Website: string | null;
    OrderThirdId: string;
    ThirdIdToDeliver: string | null;
    PaymentThirdId: string | null;
    InvoicingThirdId: string | null;
    TaxIds0: string | null;
    TaxIds1: string | null;
    TaxIds2: string | null;
    InvoicingAddress_Longitude: string | null;
    InvoicingAddress_Latitude: string | null;
    InvoicingContact_Civility: string;
    InvoicingContact_Name: string;
    InvoicingContact_FirstName: string;
    InvoicingContact_Phone: string;
    InvoicingContact_CellPhone: string;
    InvoicingContact_Fax: string;
    InvoicingContact_Email: string;
    InvoicingContact_Function: string | null;
    InvoicingContact_Department: string | null;
    InvoicingAddressId: string;
    InvoicingContactId: string;
    DeliveryAddressId: string;
    DeliveryContactId: string;
    InvoicingAddress_Address1: string;
    InvoicingAddress_Address2: string | null;
    InvoicingAddress_Address3: string | null;
    InvoicingAddress_Address4: string | null;
    Reference: string | null;
    RecoveredFrom: string | null;
    ModifiedSinceRecovery: string;
    AssociatedInvoiceId: string | null;
    AssociatedDeliveryOrderId: string | null;
    AssociatedOrderId: string | null;
    StorehouseId: string;
    TransferedDocumentId: string;
    SysCreatedDate: string;
    SysCreatedUser: string;
    SysModifiedDate: string;
    SysModifiedUser: string;
    NotesClear: string | null;
    Notes: string | null;
    Xx_NaturePiece: string;
    Xx_TypeDEnvoi: string | null;
    Xx_Facturation: string | null;
    DetailVatAmount0_CurrencyDetailAmountVatExcluded: string;
    DetailVatAmount0_CurrencyDetailVatAmount: string;
    DetailVatAmount0_CurrencyDetailAmountVatIncluded: string;
    DetailVatAmount0_CurrencyDetailDepositVatAmount: string;
    DetailVatAmount0_CurrencyDetailVatAmountWithoutDepositAmount: string;
    DetailVatAmount0_CurrencyEcotaxAmountVatExcluded: string;
    DetailVatAmount0_CurrencyEcotaxAmountVatIncluded: string;
    DetailVatAmount0_CurrencyEcotaxVatAmount: string;
    DetailVatAmount0_CurrencyVatAmountOnDebit: string;
    DetailVatAmount0_CurrencyVatAmountOnCollection: string;
    CustomerCivility: string;
    CustomerIntracommunityVatNumber: string | null;
    DetailVatAmount2_CurrencyDetailDepositReAmount: string;
    DetailVatAmount2_CurrencyDetailReAmountWithoutDepositAmount: string;
    DetailVatAmount3_CurrencyDetailAmountVatExcluded: string;
    DeliveryOrderPreparationState: number;
    ReturnOrderPreparationState: string | null;
    Xx_RegulMarge: string | null;
    Xx_SatisfDteEnvoi: string | null;
    Xx_SatisfDteRetour: string | null;
    DetailVatAmount5_CurrencyDetailDepositReAmount: string;
    DetailVatAmount5_CurrencyDetailReAmountWithoutDepositAmount: string;
    ReturnState: number;
    IntrastatIncoterm: string | null;
    InvoicingAddress_Zipcode: string;
    DeliveryAddress_Zipcode: string;
    BankId: string | null;
    IdentificationType: string | null;
    CorrectionCause: string | null;
    CorrectionReasonId: string | null;
    IntrastatTransportMode: string;
    IntrastatTransactionNature: string;
    AppliedPricelistLineId: string | null;
    PricelistCategory: string | null;
    DeliveryAddressType: string | null;
    InvoicingAddress_CountryIsoCode: string;
    InvoicingAddress_City: string;
    DeliveryAddress_CountryIsoCode: string;
    DeliveryAddress_City: string;
    ConstructionSiteId: string | null;
    Hash_Hash_ChainedId: string | null;
    Hash_Hash_Hash: string | null;
    ExtrafeeDistributionMode: number;
    ExtrafeeBase: number;
    ExtrafeeTotalAmount: string;
    ExtrafeeDistributedAmount: string;
    ExtrafeeDistributionRates_GoodDistributeRate: string | null;
    ExtrafeeDistributionRates_ServiceDistributeRate: string | null;
    ExtrafeeDistributionRates_EquipmentDistributeRate: string | null;
    LastRefreshPurchaseStateDate: string | null;
    DocumentOptionsId: string | null;
    devisLines: DevisLine[];
}

interface DevisLine {
    item: Item;
    quantity: number;
    
}
