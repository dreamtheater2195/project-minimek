import React from "react";
import { Table } from "semantic-ui-react";
import { connect } from 'react-redux';
import { getWeightClass } from "../mechSelectors";
import schema from '../../../schema';
const MechsListRow = ({ mech, onMechClicked, selected }) => {
    const {
        id = null,
        type = '',
        mechType = {}
    } = mech;

    const {
        name = '',
        weight = ''
    } = mechType;

    const weightClass = getWeightClass(weight);

    return (
        <Table.Row
            active={selected}
            onClick={() => onMechClicked(id)}
        >
            <Table.Cell>
                {id}
            </Table.Cell>
            <Table.Cell>
                {name}
            </Table.Cell>
            <Table.Cell>
                {type}
            </Table.Cell>
            <Table.Cell>
                {weight}
            </Table.Cell>
            <Table.Cell>
                {weightClass}
            </Table.Cell>
        </Table.Row>
    );
}

const mapStateToProps = (state, ownProps) => {
    const session = schema.from(state.entities);
    const { Mech } = session;

    let mech;
    if (Mech.hasId(ownProps.mechID)) {
        const mechModel = Mech.withId(ownProps.mechID);
        mech = {
            ...mechModel.ref,
            mechType: {}
        };
        if (mechModel.type) {
            mech.mechType = {
                ...mechModel.type.ref
            };
        }
    }
    return { mech };
}

export default connect(mapStateToProps)(MechsListRow);