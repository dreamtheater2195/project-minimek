import { SELECT_PILOT } from './pilotsConstants';

export function selectPilot(pilotID) {
    return {
        type: SELECT_PILOT,
        payload: { currentPilot: pilotID }
    }
}