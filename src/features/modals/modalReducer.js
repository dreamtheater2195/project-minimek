import { MODAL_CLOSE, MODAL_OPEN } from './modalConstants';
import { createReducer } from '../../common/utils/reducerUtils';

const initialState = [];

export function closeModal(state, payload) {
    const newState = state.slice();
    newState.pop();
    return newState;
}

export function openModal(state, payload) {
    const { modalType, modalProps } = payload;
    return state.concat({ modalType, modalProps });
}
const modals = createReducer(initialState, {
    [MODAL_CLOSE]: closeModal,
    [MODAL_OPEN]: openModal
});

export default modals;