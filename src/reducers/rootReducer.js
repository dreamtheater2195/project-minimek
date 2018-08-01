import { combineReducers } from 'redux';
import { reduceReducers } from '../common/utils/reducerUtils';
import tabReducer from '../features/tabs/tabReducer';
import unitInfoReducer from '../features/unitInfo/unitInfoReducer';
import pilotsReducer from '../features/pilots/pilotsReducer';
import mechsReducer from '../features/mechs/mechReducer';
import entitiesReducer from "./entitiesReducer";
import entityCrudReducer from '../features/entities/entityReducer';
import editingEntitiesReducer from './editingEntitiesReducer';
import editingFeatureReducer from '../features/editing/editingReducer';
import modalsReducer from '../features/modals/modalReducer';
const combinedReducer = combineReducers({
    tabs: tabReducer,
    modals: modalsReducer,
    unitInfo: unitInfoReducer,
    pilots: pilotsReducer,
    mechs: mechsReducer,
    entities: entitiesReducer,
    editingEntities: editingEntitiesReducer
});

const rootReducer = reduceReducers(
    combinedReducer,
    entityCrudReducer,
    editingFeatureReducer
);

export default rootReducer;