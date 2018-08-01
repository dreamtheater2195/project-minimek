import { ENTITY_UPDATE, ENTITY_CREATE, ENTITY_DELETE } from './entityConstants';
import { createConditionalSliceReducer } from '../../common/utils/reducerUtils';
import orm from '../../schema';

export function updateEntity(state, payload) {
    const { itemType, itemID, newItemAttributes } = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    if (ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);
        modelInstance.update(newItemAttributes);
    }

    return session.state;
}

export function deleteEntity(state, payload) {
    const { itemType, itemID } = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    if (ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);
        modelInstance.delete();
    }

    return session.state;
}

export function createEntity(state, payload) {
    const { itemType, newItemAttributes } = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    ModelClass.parse(newItemAttributes);
    return session.state;
}
const entityCrudFeatureReducer = createConditionalSliceReducer("entities", {
    [ENTITY_UPDATE]: updateEntity,
    [ENTITY_CREATE]: createEntity,
    [ENTITY_DELETE]: deleteEntity
});

export default entityCrudFeatureReducer;