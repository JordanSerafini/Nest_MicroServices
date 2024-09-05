import { RootState } from "..";
import { Item } from "../../types/item";

export const recipesByFamilySelector = (
  state: RootState,
  familyId: number | string
): Item[] => {
  const numericFamilyId = typeof familyId === 'string' ? parseInt(familyId, 10) : familyId;

  return state.items.items.filter((item) => {
    const itemFamilyIdNumeric = item.FamilyId ? parseInt(item.FamilyId, 10) : null;
    
    return itemFamilyIdNumeric === numericFamilyId;
  });
};
