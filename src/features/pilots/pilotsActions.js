import { SELECT_PILOT, PILOT_EDIT_START, PILOT_EDIT_STOP } from './pilotsConstants';
import { editExistingItem, stopEditingItem } from '../editing/editingActions';
export function selectPilot(pilotID) {
    return {
        type: SELECT_PILOT,
        payload: { currentPilot: pilotID }
    }
}

export function startEditingPilot(pilotID) {
    return (dispatch, state) => {
        dispatch(editExistingItem("Pilot", pilotID));
        dispatch({ type: PILOT_EDIT_START });
    }
}

export function stopEditingPilot(pilotID) {
    return (dispatch, state) => {
        dispatch(stopEditingItem("Pilot", pilotID));
        dispatch({ type: PILOT_EDIT_STOP });
    }
} 	