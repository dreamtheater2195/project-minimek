import { ENTITY_UPDATE } from './entityConstants';
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

export default entityCrudFeatureReducer = createConditionalSliceReducer("entities", {
    [ENTITY_UPDATE]: updateEntity
});