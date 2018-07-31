import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from 'lodash';
import schema from '../../../schema';
import { deleteEntity } from '../../entities/entityActions';

const PilotsListRow = ({ pilot = {}, onPilotClicked = _.noop, selected, deleteEntity }) => {
    const {
        id = null,
        name = "",
        rank = "",
        age = "",
        gunnery = "",
        piloting = "",
        mechType = "",
    } = pilot;
    const onDeleteClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        deleteEntity("Pilot", id);
    }
    const onRowClicked = () => onPilotClicked(id);
    return (
        <Table.Row
            onClick={onRowClicked}
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
            <Table.Cell>
                <Button
                    compact
                    basic
                    circular
                    size="tiny"
                    color="red"
                    icon={<Icon name="delete" />}
                    onClick={onDeleteClicked}
                >
                </Button>
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

const mapDispatchToProps = {
    deleteEntity
}
export default connect(mapStateToProps, mapDispatchToProps)(PilotsListRow); 