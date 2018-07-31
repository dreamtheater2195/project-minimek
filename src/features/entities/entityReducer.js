import { ENTITY_UPDATE, ENTITY_CREATE, ENTITY_DELETE } from './entityConstants';
import { createConditionalSliceReducer } from '../../common/utils/reducerUtils';
import schema from '../../schema';

export function updateEntity(state, payload) {
    const { itemType, itemID, newItemAttributes } = payload;

    const session = schema.from(state);
    const ModelClass = session[itemType];

    let newState = state;

    if (ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);
        modelInstance.update(newItemAttributes);
        newState = session.reduce();
    }

    return newState;
}

export function deleteEntity(state, payload) {
    const { itemType, itemID } = payload;

    const session = schema.from(state);
    const ModelClass = session[itemType];

    let newState = state;
    if (ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);
        modelInstance.delete();
        newState = session.reduce();
    }

    return newState;
}

export function createEntity(state, payload) {
    const { itemType, newItemAttributes } = payload;

    const session = schema.from(state);
    const ModelClass = session[itemType];

    ModelClass.parse(newItemAttributes);
    const newState = session.reduce();
    return newState;
}
const entityCrudFeatureReducer = createConditionalSliceReducer("entities", {
    [ENTITY_UPDATE]: updateEntity,
    [ENTITY_CREATE]: createEntity,
    [ENTITY_DELETE]: deleteEntity
});

export default entityCrudFeatureReducer;