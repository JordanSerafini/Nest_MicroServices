-- Insérer des données dans la table Chantier
INSERT INTO "Chantier" (Nom, Adresse, CodePostal, Ville, DateDebut, DateFin, Etat, Description, "customerId")
VALUES
('Chantier Maison 1', '12 Rue de la Construction', '75001', 'Paris', '2024-09-01', '2024-12-31', 'En cours', 'Construction d''une maison individuelle', 1),
('Chantier Maison 2', '45 Avenue des Bâtisseurs', '69001', 'Lyon', '2024-10-01', '2025-01-15', 'En cours', 'Construction d''une villa avec piscine', 2),
('Chantier Appartement', '123 Boulevard de la Réforme', '13001', 'Marseille', '2024-07-15', '2024-11-30', 'En cours', 'Rénovation d''un appartement', 3),
('Chantier Bureaux', '78 Rue du Travail', '34000', 'Montpellier', '2024-08-01', '2024-12-31', 'En cours', 'Construction de bureaux', 4),
('Chantier Immeuble', '90 Rue des Artisans', '31000', 'Toulouse', '2024-06-01', '2025-02-28', 'En cours', 'Construction d''un immeuble de bureaux', 5);

-- Insérer des données dans la table Personnel
INSERT INTO "Personnel" (Prenom, Nom, Poste)
VALUES
('Jean', 'Dupont', 'Carreleur'),
('Marie', 'Martin', 'Électricienne'),
('Pierre', 'Durand', 'Plombier'),
('Sophie', 'Leclerc', 'Menuisière'),
('Lucas', 'Petit', 'Maçon'),
('Clara', 'Bernard', 'Peintre'),
('Antoine', 'Girard', 'Électricien'),
('Emma', 'Roux', 'Plombière'),
('Julien', 'Moreau', 'Charpentier'),
('Thomas', 'Garnier', 'Chef de chantier');

-- Insérer des données dans la table Materiel
INSERT INTO "Materiel" (Nom, Description)
VALUES
('Marteau', 'Outil pour enfoncer des clous'),
('Perceuse', 'Outil électrique pour percer des trous'),
('Scie', 'Outil pour découper des matériaux'),
('Ciment', 'Matériau de construction utilisé pour faire du béton'),
('Pelle', 'Outil utilisé pour creuser le sol'),
('Carrelage', 'Carrelage 50m2 pour les sols'),
('Colle à carrelage', 'Colle spéciale pour fixer le carrelage'),
('Fils électriques', 'Câbles pour installations électriques'),
('Tuyaux de plomberie', 'Tuyaux pour systèmes de plomberie'),
('Peinture blanche', 'Peinture pour les murs intérieurs'),
('Escabeau', 'Échelle pour les travaux en hauteur');

-- Associer des outils et des matériaux à des chantiers dans la table ChantierMateriel
INSERT INTO "ChantierMateriel" (ChantierId, MaterielId, Quantite)
VALUES
-- Chantier Maison 1
(1, 1, 10),  -- Marteau
(1, 2, 5),   -- Perceuse
(1, 6, 50),  -- Carrelage 50m2
(1, 7, 10),  -- Colle à carrelage

-- Chantier Maison 2
(2, 3, 3),   -- Scie
(2, 4, 100), -- Ciment
(2, 8, 200), -- Fils électriques
(2, 9, 150), -- Tuyaux de plomberie
(2, 5, 20),  -- Pelle

-- Chantier Appartement
(3, 10, 30), -- Peinture blanche
(3, 1, 5),   -- Marteau
(3, 7, 5),   -- Colle à carrelage

-- Chantier Bureaux
(4, 1, 15),  -- Marteau
(4, 3, 7),   -- Scie
(4, 10, 60), -- Peinture blanche

-- Chantier Immeuble
(5, 4, 500), -- Ciment
(5, 5, 50),  -- Pelle
(5, 2, 10),  -- Perceuse
(5, 11, 3);  -- Escabeau

-- Associer du personnel à des chantiers dans la table ChantierPersonnel
INSERT INTO "ChantierPersonnel" (ChantierId, PersonnelId)
VALUES
-- Chantier Maison 1
(1, 1), -- Jean Dupont (Carreleur)
(1, 2), -- Marie Martin (Électricienne)
(1, 3), -- Pierre Durand (Plombier)

-- Chantier Maison 2
(2, 4), -- Sophie Leclerc (Menuisière)
(2, 5), -- Lucas Petit (Maçon)
(2, 6), -- Clara Bernard (Peintre)

-- Chantier Appartement
(3, 2), -- Marie Martin (Électricienne)
(3, 7), -- Antoine Girard (Électricien)
(3, 8), -- Emma Roux (Plombière)

-- Chantier Bureaux
(4, 9), -- Julien Moreau (Charpentier)
(4, 10), -- Thomas Garnier (Chef de chantier)

-- Chantier Immeuble
(5, 5), -- Lucas Petit (Maçon)
(5, 3), -- Pierre Durand (Plombier)
(5, 2);
