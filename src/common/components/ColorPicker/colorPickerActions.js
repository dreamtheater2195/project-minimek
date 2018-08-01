import { openModal } from '../../../features/modals/modalActions';
import _ from 'lodash';
export function showColorPicker(initialColor, colorPickerAction) {

    const colorPickerProps = {
        color: initialColor,
        onColorPicked: colorPickerAction
    };

    return openModal("ColorPickerDialog", colorPickerProps);
}

export function colorSelected(color, actionToDispatch) {
    return (dispatch) => {
        if (actionToDispatch) {
            const newAction = _.cloneDeep(actionToDispatch);
            console.log(newAction);
            newAction.payload.color = color;
            dispatch(newAction);
        }
    }
}