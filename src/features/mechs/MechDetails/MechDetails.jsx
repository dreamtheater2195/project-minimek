import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { getWeightClass, selectCurrentMech } from "../mechSelectors";
import schema from '../../../schema';
const MechDetails = ({ mech = {} }) => {
    const {
        id = '',
        type = '',
        mechType = {}
    } = mech;

    const {
        name = '',
        weight = ''
    } = mechType;

    const weightClass = getWeightClass(weight);

    return (
        <Form size="large">
            <Form.Field name="id" width={6} >
                <label>ID</label>
                <input
                    placeholder="ID"
                    value={id}
                    disabled={true}
                />
            </Form.Field>
            <Form.Field name="name" width={16} >
                <label>Name</label>
                <input
                    placeholder="Name"
                    value={name}
                    disabled={true}
                />
            </Form.Field>
            <Form.Field name="model" width={6} >
                <label>Model</label>
                <input
                    placeholder="Model"
                    value={type}
                    disabled={true}
                />
            </Form.Field>
            <Form.Field name="weight" width={6} >
                <label>Weight</label>
                <input
                    value={weight}
                    disabled={true}
                />
            </Form.Field>
            <Form.Field name="class" width={6} >
                <label>Class</label>
                <input
                    value={weightClass}
                    disabled={true}
                />
            </Form.Field>
        </Form>

    )
}

const mapStateToProps = (state) => {
    let mech;
    const currentMechID = selectCurrentMech(state);
    const session = schema.from(state.entities);
    const { Mech } = session;
    if (Mech.hasId(currentMechID)) {
        const mechModel = Mech.withId(currentMechID);
        mech = {
            ...mechModel.ref,
            mechType: {}
        };

        if (mechModel.type) {
            mech.mechType = { ...mechModel.type.ref };
        }
    }
    return { mech };
}

export default connect(mapStateToProps)(MechDetails);