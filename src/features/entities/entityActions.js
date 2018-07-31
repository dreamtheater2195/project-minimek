import * as types from "./entityConstants";
export function updateEntity(itemType, itemID, newItemAttributes) {
    return {
        type: types.ENTITY_UPDATE,
        payload: {
            itemType,
            itemID,
            newItemAttributes,
        },
    };
}

export function deleteEntity(itemType, itemID) {
    return {
        type: types.ENTITY_DELETE,
        payload: {
            itemType,
            itemID
        }
    }
}

export function createEntity(itemType, newItemAttributes) {
    return {
        type: types.ENTITY_CREATE,
        payload: {
            itemType,
            newItemAttributes
        }
    }
}