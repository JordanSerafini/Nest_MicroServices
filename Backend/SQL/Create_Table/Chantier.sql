CREATE TABLE "Chantier" (
    Id SERIAL PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Adresse VARCHAR(255),
    CodePostal VARCHAR(20),
    Ville VARCHAR(100),
    DateDebut DATE,
    DateFin DATE,
    Etat VARCHAR(50),
    Description TEXT,
     CONSTRAINT fk_customer
      FOREIGN KEY (CustomerId)
      REFERENCES "Customer"(Id)
      ON DELETE CASCADE,
    CONSTRAINT fk_devis
      FOREIGN KEY (DevisId)
      REFERENCES "Devis"(Id)
      ON DELETE SET NULL 
); 
CREATE TABLE "Personnel" (
    Id SERIAL PRIMARY KEY,
    Prenom VARCHAR(100) NOT NULL,
    Nom VARCHAR(100) NOT NULL,
    Poste VARCHAR(100)
);

CREATE TABLE "Materiel" (
    Id SERIAL PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE "ChantierMateriel" (
    ChantierId INT NOT NULL,
    MaterielId INT NOT NULL,
    Quantite INT NOT NULL,
    PRIMARY KEY (ChantierId, MaterielId),
    FOREIGN KEY (ChantierId) REFERENCES "Chantier"(Id) ON DELETE CASCADE,
    FOREIGN KEY (MaterielId) REFERENCES "Materiel"(Id) ON DELETE CASCADE
);

CREATE TABLE "ChantierPersonnel" (
    ChantierId INT NOT NULL,
    PersonnelId INT NOT NULL,
    PRIMARY KEY (ChantierId, PersonnelId),
    FOREIGN KEY (ChantierId) REFERENCES "Chantier"(Id) ON DELETE CASCADE,
    FOREIGN KEY (PersonnelId) REFERENCES "Personnel"(Id) ON DELETE CASCADE
);
