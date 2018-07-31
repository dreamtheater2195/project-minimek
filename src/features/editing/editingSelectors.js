import { createSelector } from "reselect";
import schema from "../../schema";
export const selectEditingEntities = state => state.editingEntities;
export const getEditingEntitiesSession = createSelector(
    selectEditingEntities,
    editingEntities => schema.from(editingEntities)
); 