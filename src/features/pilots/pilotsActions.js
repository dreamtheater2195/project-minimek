import { SELECT_PILOT, PILOT_EDIT_START, PILOT_EDIT_STOP } from './pilotsConstants';
import { editExistingItem, stopEditingItem, applyItemEdits } from '../editing/editingActions';
import { selectCurrentPilot, selectIsEditingPilot } from './pilotsSelectors';
export function selectPilot(pilotID) {
    return (dispatch, getState) => {
        const isEditing = selectIsEditingPilot(getState());
        if (isEditing) {
            dispatch(stopEditingPilot());
        }
        dispatch({
            type: SELECT_PILOT,
            payload: { currentPilot: pilotID }
        });
    }
}

export function startEditingPilot() {
    return (dispatch, getState) => {
        const currentPilotId = selectCurrentPilot(getState());
        dispatch(editExistingItem("Pilot", currentPilotId));
        dispatch({ type: PILOT_EDIT_START });
    }
}

export function stopEditingPilot() {
    return (dispatch, getState) => {
        const currentPilotId = selectCurrentPilot(getState());
        dispatch({ type: PILOT_EDIT_STOP });
        dispatch(applyItemEdits("Pilot", currentPilotId));
        dispatch(stopEditingItem("Pilot", currentPilotId));
    }
}

export function cancelEditingPilot() {
    return (dispatch, getState) => {
        const currentPilotId = selectCurrentPilot(getState());
        dispatch({ type: PILOT_EDIT_STOP });
        dispatch(stopEditingItem("Pilot", currentPilotId));
    }
}