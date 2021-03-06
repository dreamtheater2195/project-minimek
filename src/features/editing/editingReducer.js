import { createReducer } from "../../common/utils/reducerUtils";
import orm from '../../schema';
import {
    createEntity,
    updateEntity,
    deleteEntity
} from "../../features/entities/entityReducer";

import { EDIT_ITEM_EXISTING, EDIT_ITEM_STOP, EDIT_ITEM_UPDATE, EDIT_ITEM_APPLY, EDIT_ITEM_RESET } from '../editing/editingConstants';

import { selectEntities } from "../../features/entities/entitySelectors";
import { getModelByType } from '../../common/utils/modelUtils';
import { selectEditingEntities } from "./editingSelectors";

import {
    readEntityData,
    updateEditingEntitiesState,
    updateEntitiesState
} from "./editingUtils";

export function copyEntity(sourceEntities, destinationEntities, payload) {
    const { itemID, itemType } = payload;
    //read plain json data from entities
    const newItemAttributes = readEntityData(sourceEntities, itemType, itemID);
    const creationPayload = { itemType, itemID, newItemAttributes }
    //create new entity to editing entities
    const updatedEntities = createEntity(destinationEntities, creationPayload);
    return updatedEntities;
}

export function updateEditedEntity(sourceEntities, destinationEntities, payload) {
    const readSession = orm.session(sourceEntities);
    const { itemType, itemID } = payload;
    const model = getModelByType(readSession, itemType, itemID);

    let writeSession = orm.session(destinationEntities);
    const ModelClass = writeSession[itemType];
    if (ModelClass.hasId(itemID)) {
        const existingItem = ModelClass.withId(itemID);
        if (existingItem.updateFrom) {
            existingItem.updateFrom(model);
        }
    }
    return writeSession.state;
}

export function editItemExisting(state, payload) {
    const entities = selectEntities(state);
    const editingEntities = selectEditingEntities(state);
    //copy item to editing entities to start editing
    const updatedEditingEntities = copyEntity(entities, editingEntities, payload);
    return updateEditingEntitiesState(state, updatedEditingEntities);
}

export function editItemUpdate(state, payload) {
    const editingEntities = selectEditingEntities(state);
    //update new attributes to editing entities
    const updatedEditingEntities = updateEntity(editingEntities, payload);
    return updateEditingEntitiesState(state, updatedEditingEntities);
}

export function editItemStop(state, payload) {
    const editingEntities = selectEditingEntities(state);
    //delete editing entity when edit stop
    const updatedEditingEntities = deleteEntity(editingEntities, payload);
    return updateEditingEntitiesState(state, updatedEditingEntities);
}

export function editItemApply(state, payload) {
    const editingEntities = selectEditingEntities(state);
    const entities = selectEntities(state);
    const updatedEntites = updateEditedEntity(editingEntities, entities, payload);
    return updateEntitiesState(state, updatedEntites);
}

export function editItemReset(state, payload) {
    const stateWithoutItem = editItemStop(state, payload);
    const stateWithCurrentItem = editItemExisting(stateWithoutItem, payload);
    return stateWithCurrentItem;
}

const editingFeatureReducer = createReducer({}, {
    [EDIT_ITEM_EXISTING]: editItemExisting,
    [EDIT_ITEM_UPDATE]: editItemUpdate,
    [EDIT_ITEM_STOP]: editItemStop,
    [EDIT_ITEM_APPLY]: editItemApply,
    [EDIT_ITEM_RESET]: editItemReset
});
export default editingFeatureReducer; 