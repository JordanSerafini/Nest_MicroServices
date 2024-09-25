CREATE VIEW stock_details_id AS
SELECT 
  sd."Id" AS "StockDocumentId",
  sd."DocumentDate",
  sd."DocumentNumber",
  sd."NotesClear",
  sdl."Id" AS "StockDocumentLineId",
  sdl."ItemId",
  sdl."Quantity",
  sdl."DescriptionClear",
  i."Caption" AS "ItemCaption",
  i."SalePriceVatExcluded",
  i."SalePriceVatIncluded",
  i."PurchasePrice",
  sh."Id" AS "StorehouseId",
  sh."Caption" AS "StorehouseCaption"
FROM 
  "StockDocument" sd
LEFT JOIN 
  "StockDocumentLine" sdl ON sd."Id" = sdl."DocumentId"
LEFT JOIN 
  "Storehouse" sh ON sd."StorehouseId" = sh."Id"
LEFT JOIN 
  "Item" i ON sdl."ItemId" = i."Id";
