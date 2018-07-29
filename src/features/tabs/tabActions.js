import { SELECT_TAB } from './tabConstants';

export function selectTab(tabName) {
    return {
        type: SELECT_TAB,
        payload: { tabName }
    }
}