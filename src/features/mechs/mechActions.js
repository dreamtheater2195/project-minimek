import { SELECT_MECH } from './mechConstants';

export function selectMech(mechID) {
    return {
        type: SELECT_MECH,
        payload: { currentMech: mechID }
    }
}