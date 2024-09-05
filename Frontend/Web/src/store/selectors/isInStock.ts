// isInStock.ts
import { RootState } from "..";

export const isInStockSelector = (
  state: RootState,
  itemId: number
): boolean => {
  // Recherche l'article par son ID dans la liste des items.
  const item = state.items.items.find(item => item.Id === itemId.toString());

  // Vérifie si le realStock de l'article est supérieur à 0.
  return !!item && item.RealStock > 0;
};
