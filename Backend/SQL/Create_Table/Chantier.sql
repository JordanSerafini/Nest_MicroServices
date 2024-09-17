CREATE TABLE "Chantier" (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    PostalCode VARCHAR(20),
    City VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Status VARCHAR(50),
    Description TEXT,
    CustomerId INT,
    QuoteId INT,
    CONSTRAINT fk_customer FOREIGN KEY (CustomerId) REFERENCES "Customer" (Id) ON DELETE CASCADE,
    -- CONSTRAINT fk_quote
    --   FOREIGN KEY (QuoteId)
    --   REFERENCES "Quote"(Id)
    --   ON DELETE SET NULL
);

CREATE TABLE "Personnel" (
    Id SERIAL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Position VARCHAR(100)
);

CREATE TABLE "Materiel" (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE "ChantierMateriel" (
    ConstructionSiteId INT NOT NULL,
    MaterialId INT NOT NULL,
    Quantity INT NOT NULL,
    PRIMARY KEY (
        ConstructionSiteId,
        MaterialId
    ),
    FOREIGN KEY (ConstructionSiteId) REFERENCES "Chantier" (Id) ON DELETE CASCADE,
    FOREIGN KEY (MaterialId) REFERENCES "Materiel" (Id) ON DELETE CASCADE
);

CREATE TABLE "ChantierPersonnel" (
    ConstructionSiteId INT NOT NULL,
    PersonnelId INT NOT NULL,
    PRIMARY KEY (ConstructionSiteId, PersonnelId),
    FOREIGN KEY (ConstructionSiteId) REFERENCES "Chantier"(Id) ON DELETE CASCADE,
    FOREIGN KEY (PersonnelId) REFERENCES "Personnel"(Id) ON DELETE CASCADE


);