import { createReducer } from '../../common/utils/reducerUtils';
import { SELECT_TAB } from './tabConstants';

const initialState = {
    currentTab: "unitInfo"
}

export function selectTab(state, payload) {
    return {
        currentTab: payload.tabName
    };
}

export default createReducer(initialState, {
    [SELECT_TAB]: selectTab
})