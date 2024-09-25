-- Insertion des chantiers
INSERT INTO ConstructionSite (
    id, ProfitsOnDuration, sysCreatedDate, PredictedSales, PredictedGrossMargin, 
    PredictedDuration, AccomplishedCosts, AccomplishedSales, AccomplishedGrossMargin, 
    AccomplishedDuration, ProfitsOnCosts, ProfitsOnSales, ProfitsOnGrossMargin, 
    ActualTreasury, CustomerCommitmentBalanceDues, SupplierCommitmentBalanceDues, 
    SubContractorCommitmentBalanceDues, OtherCosts, TreasuryBalanceDue, 
    ReferenceDocumentId, ConstructionSiteReferenceDocumentId, StartDate, 
    EndDate, Status, DeliveryAddressType, ManagementStockType, StorehouseId, 
    UseConstructionSiteAddressAsDeliveryAddressForSales, ConstructionSiteAddressId, 
    ConstructionSiteAddress_Npai, ConstructionSiteAddress_Longitude, 
    ConstructionSiteAddress_Latitude, InvoicingAddressId, InvoicingAddress_Npai, 
    InvoicingAddress_Longitude, InvoicingAddress_Latitude, Description, 
    GlobalCost, CustomerId, sysCreatedUser, sysModifiedUser, Notes
) VALUES
    (1, 10000, NOW(), 150000, 5000, 
    12, 20000, 140000, 10000, 
    10, 3000, 12000, 5000, 
    1500, 2000, 1500, 800, 100, 3000, 
    'ref_doc_1', 'site_ref_doc_1', '2024-01-01', 
    '2025-01-01', 1, 1, 1, NULL, 
    TRUE, NULL, FALSE, 2.3522, 48.8566, 
    NULL, FALSE, 2.3522, 48.8566, 'Immeuble Résidentiel', 
    500000, 'cust_001', 'admin', 'admin', NULL),
    
    (2, 5000, NOW(), 70000, 2000, 
    6, 15000, 60000, 3000, 
    5, 1500, 4000, 2000, 
    1000, 1000, 500, 300, 50, 1500, 
    'ref_doc_2', 'site_ref_doc_2', '2024-02-01', 
    '2024-06-01', 1, 1, 1, NULL, 
    FALSE, NULL, FALSE, 2.3522, 48.8566, 
    NULL, FALSE, 2.3522, 48.8566, 'Bureau Rénové', 
    200000, 'cust_002', 'admin', 'admin', NULL),

    (3, 7000, NOW(), 90000, 3000, 
    8, 25000, 80000, 6000, 
    8, 4000, 7000, 3000, 
    2000, 1500, 800, 500, 70, 2000, 
    'ref_doc_3', 'site_ref_doc_3', '2024-03-01', 
    '2025-03-01', 1, 1, 1, NULL, 
    TRUE, NULL, FALSE, 2.3522, 48.8566, 
    NULL, FALSE, 2.3522, 48.8566, 'École Construite', 
    750000, 'cust_003', 'admin', 'admin', NULL),

    (4, 2000, NOW(), 30000, 500, 
    4, 5000, 25000, 1500, 
    3, 300, 1000, 500, 
    300, 400, 200, 100, 20, 500, 
    'ref_doc_4', 'site_ref_doc_4', '2024-04-01', 
    '2024-12-01', 1, 1, 1, NULL, 
    FALSE, NULL, FALSE, 2.3522, 48.8566, 
    NULL, FALSE, 2.3522, 48.8566, 'Parc Aménagé', 
    150000, 'cust_004', 'admin', 'admin', NULL),

    (5, 15000, NOW(), 250000, 10000, 
    14, 40000, 200000, 15000, 
    12, 6000, 18000, 8000, 
    2500, 3000, 2000, 1000, 200, 5000, 
    'ref_doc_5', 'site_ref_doc_5', '2024-05-01', 
    '2025-05-01', 1, 1, 1, NULL, 
    TRUE, NULL, FALSE, 2.3522, 48.8566, 
    NULL, FALSE, 2.3522, 48.8566, 'Centre Commercial Rénové', 
    900000, 'cust_005', 'admin', 'admin', NULL);

-- Insertion des documents de référence
INSERT INTO ConstructionSiteReferenceDocument (
    id, DetailTaxAmount4_CurrencyTaxAmount, sysCreatedDate, DetailTaxAmount5_CurrencyTaxAmount, 
    CurrencyConversionRate, CurrencyTotalDueAmount, CommitmentsCurrencyBalanceDue, 
    CurrencyAmountVatIncluded, CurrencyApplicationType, CurrencyAmountVatExcluded, 
    CurrencyAmountVatExcludedWithDiscountAndShipping, CurrencyAmountWithFinancialDiscount, 
    CurrencyShippingAmountVatExcluded, CurrencyAmountVatExcludedWithDiscount, 
    CurrencyAmountVatExcludedWithDiscountAndShippingWithoutEcotax, CurrencyEcotaxAmountVatIncluded, 
    CurrencyFinancialDiscountAmount, CurrencyVatAmountWithoutEcotax, CurrencyEcotaxVatAmount, 
    CurrencyEcotaxAmountVatExcluded, CurrencyVatAmount, CurrencyDiscountAmount, 
    ShippingAmountInclusionType, Printed, AppliedPriceListLineId, SubjectToRE, 
    REAmount, TotalNetWeight, CorrectionType, IRPFAmount, IRPFRate, 
    IdentificationType, AutomaticSettlementGeneration, RemainingDepositAmount, 
    RemainingDepositCurrencyAmount, DeliveryOrderPreparationState, ReturnOrderPreparationState, 
    RemainingAmountToDeliver, RemainingAmountToDeliverVatExcluded, TaxIds0, 
    TaxIds1, TaxIds2, SendedByMail, KeepDepositVatAmount, 
    IsStructuredSepaCommunication, InvoicingChargesNotSubjectToFinancialDiscount, 
    InvoicingChargesAmountVatExcluded, InvoicingChargesVatId, 
    CurrencyInvoicingChargesAmountVatExcluded, LoadFabricationComponentsMode, 
    FixedShippingAmount, DoNotCreateMovement, ExtraFeeDistributionMode, 
    ExtraFeeBase, ExtraFeeTotalAmount, ExtraFeeDistributedAmount, 
    ExtraFeeDistributionRates_GoodDistributeRate, ExtraFeeDistributionRates_ServiceDistributeRate, 
    ExtraFeeDistributionRates_EquipmentDistributeRate, LastRefreshPurchaseStateDate, 
    DocumentType, OriginDocumentType, InterestAmountVatExcluded, 
    InterestRate, Priority, HumanServiceTotalAmount, 
    HumanServiceAmountSettledByOther, HumanServiceAmountSettledByCESU, 
    HumanServiceAmountSettledByCESUP, HumanServiceDeductibleAmount, 
    GrossInterestBase, GrossInterestRate, GrossInterestAmount, 
    BrandRate, NetBrandRate, DeliveryAddressType, CountermarForcedkOnLines, 
    DocumentOptionsId, sysEditCounter, sysRecordVersion, sysRecordVersionId, 
    sysModuleId, sysDatabaseId, DetailTaxAmount0_VatId, 
    DetailTaxAmount0_VatAmount, DetailTaxAmount1_VatId, DetailTaxAmount1_VatAmount, 
    DetailTaxAmount2_VatId, DetailTaxAmount2_VatAmount, DetailTaxAmount3_VatId, 
    DetailTaxAmount3_VatAmount, DetailTaxAmount4_VatId, DetailTaxAmount4_VatAmount, 
    DetailTaxAmount5_VatId, DetailTaxAmount5_VatAmount, CustomerHeadOfficeAddressId, 
    sysModifiedDate
) VALUES
    (1, 100, NOW(), 150, 
    1.0, 200, 100, 
    80, 1, 120, 
    90, 50, 
    20, 70, 
    30, 10, 
    5, 2, 1, 
    0, 50, 10, 
    1, TRUE, NULL, FALSE, 
    0, 0, 0, 0, 0, 
    0, FALSE, 0, 0, 
    0, 0, 0, 0, 
    NULL, NULL, NULL, NULL, 
    NULL, NULL, NULL, NULL, 
    NULL, NULL, 0, 0, 
    0, 0, 0, 0, 
    0, 0, 0, 0, 
    0, 0, 0, 
    0, 0, 0, 0, 
    NULL, NOW(), 
    0, 0, 0, 0, 
    0, 0, 0, 
    0, 0, 0, 0, 
    0, 0, NULL, 
    0, 0, 0, 
    0, 0, NULL, 
    NULL, 0, 0, 
    NULL, NULL);

-- Insertion du personnel
INSERT INTO Staff (id, firstname, lastname, position)
VALUES
    (1, 'Alice', 'Dupont', 'Chef de projet'),
    (2, 'Bob', 'Martin', 'Ingénieur'),
    (3, 'Claire', 'Durand', 'Architecte'),
    (4, 'David', 'Leroy', 'Ouvrier'),
    (5, 'Eve', 'Lemoine', 'Économiste'),
    (6, 'François', 'Moreau', 'Technicien'),
    (7, 'Géraldine', 'Gauthier', 'Conducteur de travaux'),
    (8, 'Hugo', 'Barbier', 'Maçon'),
    (9, 'Isabelle', 'Richard', 'Plombier'),
    (10, 'Jean', 'Simon', 'Électricien');

-- Insertion des matériaux associés aux chantiers
INSERT INTO ConstructionMaterial (constructionsiteid, materialid, quantity)
VALUES
    (1, 1, 100),
    (1, 2, 200),
    (2, 3, 50),
    (3, 4, 300),
    (4, 5, 150),
    (5, 1, 80),
    (5, 6, 120),
    (1, 7, 60),
    (2, 8, 30),
    (3, 9, 40),
    (4, 10, 70);

-- Insertion des associations entre le personnel et les chantiers
INSERT INTO ConstructionStaff (constructionsiteid, staffid)
VALUES
    (1, 1),  -- Alice Dupont
    (1, 2),  -- Bob Martin
    (2, 3),  -- Claire Durand
    (2, 4),  -- David Leroy
    (3, 5),  -- Eve Lemoine
    (3, 6),  -- François Moreau
    (4, 7),  -- Géraldine Gauthier
    (4, 8),  -- Hugo Barbier
    (5, 9),  -- Isabelle Richard
    (5, 10); -- Jean Simon
