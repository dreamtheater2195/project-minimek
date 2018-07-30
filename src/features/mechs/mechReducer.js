import { createReducer } from '../../common/utils/reducerUtils';
import { SELECT_MECH } from './mechConstants';

const initialState = {
    currentMech: null
}

export function selectMech(state, payload) {
    const prevSelectMech = state.currentMech;
    const nextSelectMech = payload.currentMech;

    const isSameMech = prevSelectMech === nextSelectMech;

    return {
        currentMech: isSameMech ? null : nextSelectMech
    };
}

export default createReducer(initialState, {
    [SELECT_MECH]: selectMech
})