import React from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from 'lodash';
import schema from '../../../schema';
const PilotsListRow = ({ pilot = {}, onPilotClicked = _.noop, selected }) => {
    const {
        id = null,
        name = "",
        rank = "",
        age = "",
        gunnery = "",
        piloting = "",
        mechType = "",
    } = pilot;
    return (
        <Table.Row
            onClick={() => onPilotClicked(id)}
            active={selected}
        >
            <Table.Cell>
                {name}
            </Table.Cell>
            <Table.Cell>
                {rank}
            </Table.Cell>
            <Table.Cell>
                {age}
            </Table.Cell>
            <Table.Cell>
                {gunnery}/{piloting}
            </Table.Cell>
            <Table.Cell>
                {mechType}
            </Table.Cell>
        </Table.Row>
    );
}

const mapStateToProps = (state, ownProps) => {
    const session = schema.from(state.entities);
    const { Pilot } = session;
    let pilot;
    if (Pilot.hasId(ownProps.pilotID)) {
        const pilotModel = Pilot.withId(ownProps.pilotID);

        pilot = {
            ...pilotModel.ref
        };
        const { mech } = pilotModel;

        if (mech && mech.type) {
            pilot.mechType = mech.type.id;
        }
    }
    return { pilot };
}
export default connect(mapStateToProps)(PilotsListRow); 