import { isObject } from 'lodash';

export function getValueFromEvent(event) {
    const { target } = event;
    let newValues;
    if (target) {
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        newValues = {
            [target.name]: value
        };
    }
    else if (isObject(event)) {
        newValues = event;
    }
    return newValues;
}